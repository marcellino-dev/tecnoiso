"use client";

import { ArrowRight, Lock } from "lucide-react";
import { raj } from "./styles";

interface CtaBannerProps {
  onCtaClick: () => void;
}

export default function CtaBanner({ onCtaClick }: CtaBannerProps) {
  return (
    <section style={{ background: "#F22020", padding: "44px 24px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 32, alignItems: "center",
      }}>
        <div>
          <h2 style={{ ...raj, fontSize: "clamp(20px,3vw,32px)", color: "#fff", margin: "0 0 6px" }}>
            Seus instrumentos estão conformes?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
            Solicite uma avaliação técnica gratuita. Nossa equipe responde em até 2 horas.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <button
            onClick={onCtaClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#F22020", fontWeight: 700, fontSize: 13,
              padding: "12px 26px", borderRadius: 8, border: "none", cursor: "pointer",
              whiteSpace: "nowrap", letterSpacing: "0.04em",
            }}
          >
            Garantir Conformidade Agora <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 4 }}>
            <Lock style={{ width: 11, height: 11 }} /> Seus dados estão seguros
          </span>
        </div>
      </div>
    </section>
  );
}