export const CONSENT_COOKIE_NAME = "tecnoiso_cookie_consent";
export const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

export type ConsentValue = "accepted" | "rejected";

/** Lê o valor do cookie de consentimento no browser */
export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(^| )${CONSENT_COOKIE_NAME}=([^;]+)`)
  );
  return (match?.[2] as ConsentValue) ?? null;
}

/** Salva a escolha do usuário num cookie por 1 ano */
export function setConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; max-age=${CONSENT_COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

/** Verifica se o usuário aceitou os cookies */
export function hasAccepted(): boolean {
  return getConsent() === "accepted";
}

/** Verifica se o usuário já respondeu (aceitou ou recusou) */
export function hasAnswered(): boolean {
  return getConsent() !== null;
}