/**
 * Detecção de bots e padrões suspeitos
 * Valida headers, user-agents e comportamentos típicos de bots
 */

export interface BotCheckResult {
  isBot: boolean;
  reasons: string[];
  suspicionScore: number; // 0-100
}

// User-agents comuns de bots e crawlers
const BOT_USER_AGENTS = [
  "bot",
  "crawler",
  "spider",
  "scraper",
  "scrapy",
  "selenium",
  "puppeteer",
  "headless",
  "curl",
  "wget",
  "python",
  "java",
  "httpclient",
  "okhttp",
  "axios",
  "node-fetch",
  "urllib",
  "requests",
  "mechanize",
  "scrapybot",
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "semrushbot",
  "dotbot",
  "mj12bot",
  "ahrefs",
  "petalbot",
  "nmap",
  "nikto",
  "masscan",
];

/**
 * Verifica o user-agent contra lista de bots conhecidos
 */
function checkUserAgent(userAgent: string | null): {
  isSuspicious: boolean;
  reason?: string;
} {
  if (!userAgent) {
    return { isSuspicious: true, reason: "User-Agent ausente" };
  }

  const lowerUserAgent = userAgent.toLowerCase();

  for (const botPattern of BOT_USER_AGENTS) {
    if (lowerUserAgent.includes(botPattern)) {
      return {
        isSuspicious: true,
        reason: `User-Agent contém padrão suspeito: ${botPattern}`,
      };
    }
  }

  return { isSuspicious: false };
}

/**
 * Verifica headers suspeitos comuns em bots
 */
function checkSuspiciousHeaders(headers: Headers): {
  suspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Verificar Accept header (browsers normalmente têm um Accept específico)
  const accept = headers.get("accept");
  if (!accept) {
    reasons.push("Header Accept ausente");
  }

  // Verificar Accept-Language (bots frequentemente não têm)
  const acceptLanguage = headers.get("accept-language");
  if (!acceptLanguage) {
    reasons.push("Header Accept-Language ausente");
  }

  // Verificar Referer (alguns bots não enviam)
  const referer = headers.get("referer");
  if (!referer) {
    reasons.push("Header Referer ausente");
  }

  // Verificar se a requisição vem de um proxy/VPN comum de bots
  const xForwardedFor = headers.get("x-forwarded-for");
  if (
    xForwardedFor &&
    (xForwardedFor.includes("127.0.0.1") ||
      xForwardedFor.includes("localhost"))
  ) {
    reasons.push("IP suspeito de localhost/loopback");
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Valida dados do formulário contra padrões suspeitos
 */
export function validateFormDataAgainstBots(body: Record<string, any>): {
  suspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  // Verificar campos vazios que deveriam estar preenchidos
  if (!body.name || body.name.length < 2) {
    reasons.push("Nome muito curto ou ausente");
  }

  if (!body.email || !body.email.includes("@")) {
    reasons.push("Email inválido");
  }

  if (!body.phone || body.phone.length < 10) {
    reasons.push("Telefone muito curto");
  }

  // Verificar padrões de spam
  if (body.message) {
    const message = body.message.toString().toLowerCase();

    // Múltiplas URLs em uma mensagem
    const urlCount = (message.match(/https?:\/\/|www\./g) || []).length;
    if (urlCount > 3) {
      reasons.push(`Múltiplas URLs na mensagem (${urlCount})`);
    }

    // Palavras-chave de spam
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "prize",
      "click here",
      "buy now",
      "limited time",
      "act now",
      "urgente",
      "clique aqui",
      "compre agora",
    ];
    for (const keyword of spamKeywords) {
      if (message.includes(keyword)) {
        reasons.push(`Palavra-chave suspeita: ${keyword}`);
        break;
      }
    }
  }

  // Verificar honeypot field (se foi preenchido, é bot)
  // CORRIGIDO: antes checava "body.honeypot", um campo que nunca existe.
  // O campo real é dinâmico, vindo de getHoneypotFieldName() (= "website_url").
  const honeypotField = getHoneypotFieldName();
  if (body[honeypotField] && body[honeypotField].toString().trim().length > 0) {
    reasons.push("Honeypot field preenchido (padrão de bot)");
  }

  return {
    suspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Executa verificação completa de bot
 */
export function checkIsBot(
  headers: Headers,
  body?: Record<string, any>
): BotCheckResult {
  const reasons: string[] = [];
  let suspicionScore = 0;

  // 1. Verificar User-Agent (peso: 30 pontos)
  const userAgent = headers.get("user-agent");
  const userAgentCheck = checkUserAgent(userAgent);
  if (userAgentCheck.isSuspicious) {
    reasons.push(userAgentCheck.reason || "User-Agent suspeito");
    suspicionScore += 30;
  }

  // 2. Verificar headers (peso: 20 pontos por header suspeito)
  const headersCheck = checkSuspiciousHeaders(headers);
  if (headersCheck.suspicious) {
    reasons.push(...headersCheck.reasons);
    suspicionScore += headersCheck.reasons.length * 15;
  }

  // 3. Verificar dados do formulário (peso: 25 pontos)
  if (body) {
    const formCheck = validateFormDataAgainstBots(body);
    if (formCheck.suspicious) {
      reasons.push(...formCheck.reasons);
      suspicionScore += formCheck.reasons.length * 15;
    }
  }

  // Decisão final: é bot se pontuação >= 60 ou tem razões óbvias
  const isBot =
    suspicionScore >= 60 ||
    reasons.some(
      (r) =>
        r.includes("Honeypot field") ||
        r.includes("User-Agent contém padrão")
    );

  return {
    isBot,
    reasons,
    suspicionScore: Math.min(suspicionScore, 100),
  };
}

/**
 * Retorna um honeypot field HTML para incluir no formulário
 * Este campo deve ser invisível (display: none) e não deve ser preenchido por usuários reais
 */
export function getHoneypotFieldName(): string {
  return "website_url"; // Campo comum que bots preenchem
}

/**
 * HTML do honeypot para incluir no formulário (CSS para esconder)
 */
export function getHoneypotFieldHTML(): string {
  const fieldName = getHoneypotFieldName();
  return `
    <input 
      type="text" 
      name="${fieldName}" 
      style="display: none; position: absolute; left: -9999px;" 
      tabindex="-1" 
      autocomplete="off"
      aria-hidden="true"
    />
  `;
}