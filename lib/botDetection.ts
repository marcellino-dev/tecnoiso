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

  const accept = headers.get("accept");
  if (!accept) {
    reasons.push("Header Accept ausente");
  }

  const acceptLanguage = headers.get("accept-language");
  if (!acceptLanguage) {
    reasons.push("Header Accept-Language ausente");
  }

  const referer = headers.get("referer");
  if (!referer) {
    reasons.push("Header Referer ausente");
  }

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

// ============================================================
// HEURÍSTICAS DE CONTEÚDO
// Pegam bots que já passam nas checagens de formato (nome tem
// >=2 chars, email tem "@", telefone tem dígitos suficientes)
// mas geram texto sem sentido, com padrões característicos de
// geração automática.
// ============================================================

const VOWELS = "aeiouAEIOU";

/**
 * Detecta texto "gerado": sequências longas de consoantes e/ou
 * capitalização caótica no meio da palavra (ex: "bEUNddQKwuCrwvzzGbbERhc").
 * Nomes/palavras reais raramente têm 5+ consoantes seguidas ou
 * trocam de maiúscula/minúscula várias vezes sem padrão.
 */
function looksGenerated(text: string): boolean {
  const cleaned = text.trim();
  if (cleaned.length < 6) return false; // texto curto demais pra avaliar com confiança

  // 1) Maior sequência de consoantes seguidas
  let maxConsonantRun = 0;
  let currentRun = 0;
  for (const ch of cleaned) {
    if (/[a-zA-Z]/.test(ch)) {
      if (!VOWELS.includes(ch)) {
        currentRun++;
        maxConsonantRun = Math.max(maxConsonantRun, currentRun);
      } else {
        currentRun = 0;
      }
    } else {
      currentRun = 0;
    }
  }

  // 2) Trocas de maiúscula/minúscula entre letras adjacentes
  let caseSwitches = 0;
  let prevWasUpper: boolean | null = null;
  for (const ch of cleaned) {
    if (!/[a-zA-Z]/.test(ch)) {
      prevWasUpper = null;
      continue;
    }
    const isUpper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
    if (prevWasUpper !== null && isUpper !== prevWasUpper) {
      caseSwitches++;
    }
    prevWasUpper = isUpper;
  }

  return maxConsonantRun >= 5 || caseSwitches >= 3;
}

/**
 * Detecta o "dot trick" do Gmail usado em massa: endereços do tipo
 * "e.n.g.l.i.s.h1.9.8@gmail.com" — muitos pontos separando poucas
 * letras. O Gmail ignora pontos no endereço, então isso é usado pra
 * gerar "e-mails únicos" que caem todos na mesma caixa.
 */
function hasSuspiciousGmailDotPattern(email: string): boolean {
  const [local, domain] = email.split("@");
  if (!local || !domain) return false;

  const isGmail = /^(gmail\.com|googlemail\.com)$/i.test(domain.trim());
  if (!isGmail) return false;

  const segments = local.split(".");
  if (segments.length < 4) return false; // 1-2 pontos é uso normal (ex: nome.sobrenome)

  const avgSegmentLength =
    segments.reduce((sum, s) => sum + s.length, 0) / segments.length;

  return avgSegmentLength <= 2.5;
}

/**
 * Detecta padrão "<palavra aleatória> LLC/Inc/Ltd" onde a primeira
 * palavra parece gerada (não é um nome de empresa real digitado).
 */
function isSuspiciousCompanyName(company: string): boolean {
  const match = company.trim().match(/^([A-Za-z]+)\s+(LLC|Inc\.?|Ltd\.?|Corp\.?)$/i);
  if (!match) return false;

  const firstWord = match[1];
  return firstWord.length >= 5 && looksGenerated(firstWord);
}

/**
 * Valida dados do formulário contra padrões suspeitos
 */
export function validateFormDataAgainstBots(body: Record<string, any>): {
  suspicious: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];

  if (!body.name || body.name.length < 2) {
    reasons.push("Nome muito curto ou ausente");
  }

  if (!body.email || !body.email.includes("@")) {
    reasons.push("Email inválido");
  }

  if (!body.phone || body.phone.length < 10) {
    reasons.push("Telefone muito curto");
  }

  if (body.message) {
    const message = body.message.toString().toLowerCase();

    const urlCount = (message.match(/https?:\/\/|www\./g) || []).length;
    if (urlCount > 3) {
      reasons.push(`Múltiplas URLs na mensagem (${urlCount})`);
    }

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

  // Honeypot field (nome do campo é dinâmico via getHoneypotFieldName())
  const honeypotField = getHoneypotFieldName();
  if (body[honeypotField] && body[honeypotField].toString().trim().length > 0) {
    reasons.push("Honeypot field preenchido (padrão de bot)");
  }

  // --- Heurísticas de conteúdo gerado ---
  let contentFlags = 0;

  if (typeof body.name === "string" && looksGenerated(body.name)) {
    reasons.push("Nome parece gerado aleatoriamente (padrão não-humano)");
    contentFlags++;
  }

  if (typeof body.company === "string" && isSuspiciousCompanyName(body.company)) {
    reasons.push("Nome da empresa parece gerado aleatoriamente");
    contentFlags++;
  }

  if (typeof body.email === "string" && hasSuspiciousGmailDotPattern(body.email)) {
    reasons.push("E-mail usa padrão de pontos suspeito (Gmail dot trick)");
    contentFlags++;
  }

  if (
    typeof body.message === "string" &&
    !body.message.includes(" ") &&
    body.message.length > 10 &&
    looksGenerated(body.message)
  ) {
    reasons.push("Mensagem parece gerada aleatoriamente (sem estrutura de frase)");
    contentFlags++;
  }

  // Duas ou mais heurísticas de conteúdo batendo ao mesmo tempo é
  // um sinal muito forte de geração automática (evita bloquear
  // por coincidência um único campo estranho de um usuário real).
  if (contentFlags >= 2) {
    reasons.push("Múltiplos campos com padrão de conteúdo gerado automaticamente");
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

  const userAgent = headers.get("user-agent");
  const userAgentCheck = checkUserAgent(userAgent);
  if (userAgentCheck.isSuspicious) {
    reasons.push(userAgentCheck.reason || "User-Agent suspeito");
    suspicionScore += 30;
  }

  const headersCheck = checkSuspiciousHeaders(headers);
  if (headersCheck.suspicious) {
    reasons.push(...headersCheck.reasons);
    suspicionScore += headersCheck.reasons.length * 15;
  }

  if (body) {
    const formCheck = validateFormDataAgainstBots(body);
    if (formCheck.suspicious) {
      reasons.push(...formCheck.reasons);
      suspicionScore += formCheck.reasons.length * 15;
    }
  }

  const isBot =
    suspicionScore >= 60 ||
    reasons.some(
      (r) =>
        r.includes("Honeypot field") ||
        r.includes("User-Agent contém padrão") ||
        r.includes("Múltiplos campos com padrão de conteúdo gerado")
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