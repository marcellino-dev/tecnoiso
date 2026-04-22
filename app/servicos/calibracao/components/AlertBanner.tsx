"use client";

import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AlertBannerProps {
  onCtaClick: () => void;
}

export default function AlertBanner({ onCtaClick }: AlertBannerProps) {
  return (
    <div style={{ background: "#F22020", padding: "14px 24px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Link
            href="/servicos"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#fff", fontWeight: 600, fontSize: 14,
              padding: "8px 16px", borderRadius: 8, textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.5)", transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.borderColor = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Voltar
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle style={{ width: 20, height: 20, color: "#fff", flexShrink: 0 }} />
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
              <strong style={{ fontWeight: 800, fontSize: 16 }}>ATENÇÃO INDÚSTRIAS:</strong>{" "}
              Não conformidade metrológica pode gerar multas, interdições e prejuízos operacionais.
            </p>
          </div>
        </div>

        <button
          onClick={onCtaClick}
          style={{
            background: "#fff", color: "#F22020", fontWeight: 700, fontSize: 13,
            padding: "9px 20px", borderRadius: 6, border: "none", cursor: "pointer",
            whiteSpace: "nowrap", letterSpacing: "0.04em", flexShrink: 0,
          }}
        >
          Solicitar Avaliação Técnica
        </button>
      </div>
    </div>
  );
}