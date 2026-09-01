/**
 * Rate limiter simples em memória com TTL
 * Rastreia requisições por IP e limita o número de requisições em um período
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // em milissegundos
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5, // 5 requisições
  windowMs: 60 * 60 * 1000, // por hora
};

/**
 * Extrai o IP do cliente da requisição
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback para um identificador genérico em desenvolvimento
  return "unknown-client";
}

/**
 * Verifica rate limit para um IP
 * @returns true se a requisição é permitida, false se excedeu o limite
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetAt: Date } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Se não há registro ou expirou, criar um novo
  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(ip, newRecord);
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: new Date(newRecord.resetTime),
    };
  }

  // Se ainda não excedeu o limite
  if (record.count < config.maxRequests) {
    record.count++;
    return {
      allowed: true,
      remaining: config.maxRequests - record.count,
      resetAt: new Date(record.resetTime),
    };
  }

  // Limite excedido
  return {
    allowed: false,
    remaining: 0,
    resetAt: new Date(record.resetTime),
  };
}

/**
 * Limpa registros expirados periodicamente (cleanup)
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

/**
 * Reseta o rate limit para um IP específico (útil para testes)
 */
export function resetRateLimitForIp(ip: string): void {
  rateLimitStore.delete(ip);
}

/**
 * Reseta todo o store (útil para testes)
 */
export function resetAllRateLimits(): void {
  rateLimitStore.clear();
}

// Cleanup automático a cada 30 minutos
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredRecords, 30 * 60 * 1000);
}
