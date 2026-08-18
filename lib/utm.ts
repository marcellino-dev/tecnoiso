export type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

const STORAGE_KEY = "tecnoiso_utm_params";
const UTM_KEYS: (keyof UtmParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function readStoredUtmParams(): Partial<UtmParams> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<UtmParams>;
    return UTM_KEYS.reduce<Partial<UtmParams>>((acc, key) => {
      const value = parsed[key];
      acc[key] = typeof value === "string" ? value : "";
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export function getUtmParams(search: string = typeof window !== "undefined" ? window.location.search : ""): UtmParams {
  const params = new URLSearchParams(search);
  const current: UtmParams = {
    utm_source:   params.get("utm_source")   ?? "",
    utm_medium:   params.get("utm_medium")   ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_term:     params.get("utm_term")     ?? "",
    utm_content:  params.get("utm_content")  ?? "",
  };

  const stored = readStoredUtmParams();
  const merged: UtmParams = {
    utm_source:   current.utm_source || stored.utm_source || "",
    utm_medium:   current.utm_medium || stored.utm_medium || "",
    utm_campaign: current.utm_campaign || stored.utm_campaign || "",
    utm_term:     current.utm_term || stored.utm_term || "",
    utm_content:  current.utm_content || stored.utm_content || "",
  };

  if (typeof window !== "undefined") {
    const hasAnyValue = Object.values(merged).some(Boolean);
    if (hasAnyValue) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
  }

  return merged;
}
