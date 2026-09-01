/**
 * Testes automatizados para rate limiting e bot detection
 * Execute com: npm test
 */

import {
  checkRateLimit,
  resetRateLimitForIp,
  resetAllRateLimits,
  RateLimitConfig,
} from "@/lib/rateLimit";
import {
  checkIsBot,
  validateFormDataAgainstBots,
  getHoneypotFieldName,
} from "@/lib/botDetection";

describe("Rate Limiting", () => {
  beforeEach(() => {
    resetAllRateLimits();
  });

  it("deve permitir requisições dentro do limite", () => {
    const ip = "192.168.1.100";
    const config: RateLimitConfig = {
      maxRequests: 3,
      windowMs: 60000,
    };

    // Primeira requisição
    const result1 = checkRateLimit(ip, config);
    expect(result1.allowed).toBe(true);
    expect(result1.remaining).toBe(2);

    // Segunda requisição
    const result2 = checkRateLimit(ip, config);
    expect(result2.allowed).toBe(true);
    expect(result2.remaining).toBe(1);

    // Terceira requisição
    const result3 = checkRateLimit(ip, config);
    expect(result3.allowed).toBe(true);
    expect(result3.remaining).toBe(0);
  });

  it("deve rejeitar requisições que excedem o limite", () => {
    const ip = "192.168.1.101";
    const config: RateLimitConfig = {
      maxRequests: 2,
      windowMs: 60000,
    };

    checkRateLimit(ip, config);
    checkRateLimit(ip, config);

    // Terceira requisição deve ser rejeitada
    const result = checkRateLimit(ip, config);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("deve resetar o limite após expiração da janela", (done) => {
    const ip = "192.168.1.102";
    const config: RateLimitConfig = {
      maxRequests: 1,
      windowMs: 100, // 100ms para teste rápido
    };

    // Primeira requisição
    const result1 = checkRateLimit(ip, config);
    expect(result1.allowed).toBe(true);

    // Segunda requisição imediata deve falhar
    const result2 = checkRateLimit(ip, config);
    expect(result2.allowed).toBe(false);

    // Aguardar 150ms para passar da janela
    setTimeout(() => {
      const result3 = checkRateLimit(ip, config);
      expect(result3.allowed).toBe(true);
      done();
    }, 150);
  });

  it("deve tratar diferentes IPs independentemente", () => {
    const ip1 = "192.168.1.200";
    const ip2 = "192.168.1.201";
    const config: RateLimitConfig = {
      maxRequests: 1,
      windowMs: 60000,
    };

    const result1 = checkRateLimit(ip1, config);
    expect(result1.allowed).toBe(true);

    const result2 = checkRateLimit(ip2, config);
    expect(result2.allowed).toBe(true);

    const result3 = checkRateLimit(ip1, config);
    expect(result3.allowed).toBe(false);

    const result4 = checkRateLimit(ip2, config);
    expect(result4.allowed).toBe(false);
  });
});

describe("Bot Detection", () => {
  it("deve detectar bots por user-agent suspeito", () => {
    const headers = new Headers({
      "user-agent": "python-requests/2.28.0",
    });

    const result = checkIsBot(headers);
    expect(result.isBot).toBe(true);
    expect(result.reasons.some((r) => r.includes("User-Agent contém padrão suspeito"))).toBe(true);
  });

  it("deve detectar bots por headers ausentes", () => {
    const headers = new Headers({
      "user-agent": "Mozilla/5.0",
      // Propositalmente não inclui Accept-Language e Accept
    });

    const result = checkIsBot(headers);
    expect(result.suspicionScore).toBeGreaterThan(0);
  });

  it("deve detectar honeypot preenchido", () => {
    const body = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      honeypot: "someone@example.com", // Bot preencheria isso
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
    expect(result.reasons).toContain("Honeypot field preenchido (padrão de bot)");
  });

  it("deve detectar múltiplas URLs em mensagem", () => {
    const body = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message:
        "Check these out: https://example1.com https://example2.com https://example3.com https://example4.com",
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.includes("Múltiplas URLs"))).toBe(true);
  });

  it("deve detectar palavras-chave de spam", () => {
    const body = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "Você ganhou um prêmio de casino! Clique aqui urgente!",
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.includes("Palavra-chave suspeita"))).toBe(true);
  });

  it("deve permitir requisição legítima", () => {
    const headers = new Headers({
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "accept-language": "pt-BR,pt;q=0.9",
      "accept": "text/html,application/xhtml+xml",
      "referer": "https://tecnoiso.com",
    });

    const body = {
      name: "João Silva",
      email: "joao@example.com",
      phone: "4734383175",
      message: "Gostaria de saber mais sobre os serviços de manutenção.",
      honeypot: "", // Campo vazio, como deve ser
    };

    const result = checkIsBot(headers, body);
    expect(result.isBot).toBe(false);
    expect(result.suspicionScore).toBeLessThan(60);
  });

  it("deve retornar nome correto do honeypot field", () => {
    const fieldName = getHoneypotFieldName();
    expect(fieldName).toBe("website_url");
  });

  it("deve calcular suspicion score corretamente", () => {
    const headers = new Headers({
      "user-agent": "curl/7.64.1",
      // Sem Accept, sem Accept-Language
    });

    const result = checkIsBot(headers);
    expect(result.suspicionScore).toBeGreaterThan(0);
    expect(result.suspicionScore).toBeLessThanOrEqual(100);
  });
});

describe("Form Validation Against Bots", () => {
  it("deve aceitar formulário válido", () => {
    const body = {
      name: "Maria Silva",
      email: "maria@empresa.com.br",
      phone: "(47) 3438-3175",
      service: "Manutenção & Calibração",
      message: "Gostaria de agendar uma manutenção preventiva.",
      honeypot: "",
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(false);
    expect(result.reasons.length).toBe(0);
  });

  it("deve rejeitar email inválido", () => {
    const body = {
      name: "Test User",
      email: "not-an-email",
      phone: "1234567890",
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.includes("Email inválido"))).toBe(true);
  });

  it("deve rejeitar nome muito curto", () => {
    const body = {
      name: "A",
      email: "user@example.com",
      phone: "1234567890",
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
  });

  it("deve rejeitar telefone muito curto", () => {
    const body = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123", // Muito curto
    };

    const result = validateFormDataAgainstBots(body);
    expect(result.suspicious).toBe(true);
    expect(result.reasons.some((r) => r.includes("Telefone muito curto"))).toBe(
      true
    );
  });
});

describe("Integration Tests", () => {
  beforeEach(() => {
    resetAllRateLimits();
  });

  it("deve bloquear requisição de bot mesmo se dentro do rate limit", () => {
    const ip = "192.168.1.300";
    const config: RateLimitConfig = {
      maxRequests: 10,
      windowMs: 60000,
    };

    // Rate limit permite
    const rateLimitResult = checkRateLimit(ip, config);
    expect(rateLimitResult.allowed).toBe(true);

    // Mas bot detection não permite
    const headers = new Headers({
      "user-agent": "scrapy/2.5.0",
    });

    const botResult = checkIsBot(headers);
    expect(botResult.isBot).toBe(true);
  });

  it("deve bloquear requisição normal além do rate limit", () => {
    const ip = "192.168.1.301";
    const config: RateLimitConfig = {
      maxRequests: 2,
      windowMs: 60000,
    };

    checkRateLimit(ip, config);
    checkRateLimit(ip, config);

    const rateLimitResult = checkRateLimit(ip, config);
    expect(rateLimitResult.allowed).toBe(false);

    // Mesmo que não seja bot, deve ser bloqueado
    const headers = new Headers({
      "user-agent": "Mozilla/5.0",
      "accept": "text/html",
      "accept-language": "pt-BR",
    });

    const botResult = checkIsBot(headers);
    expect(botResult.isBot).toBe(false);

    // Mas rate limit bloqueia de qualquer forma
    expect(rateLimitResult.allowed).toBe(false);
  });
});
