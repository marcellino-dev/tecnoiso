"use client";

import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { raj, } from "./styles";
import { WA_ESPECIALISTA } from "./data";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const bullets = [
  "Certificados conforme ABNT NBR ISO/IEC 17025:2017",
  "Rastreabilidade CGCRE/INMETRO garantida",
  "Atendimento in-loco sem paradas desnecessárias",
  "Gestão completa do parque de instrumentos",
];

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner1.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,10,10,0.82) 50%, rgba(242,34,32,0.08) 100%)",
      }} />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 24px 72px" }}>
        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Conformidade Metrológica<br />
          <span style={{ color: "#F22020" }}>Certificada e Rastreável</span>
        </h1>

        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 430 }}>
          Calibração industrial rastreável ao INMETRO, com controle de erros, incertezas e gestão completa do seu parque de instrumentos.
        </p>

        <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map(item => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#DEDEDE" }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: "#F22020", marginTop: 2, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={onCtaClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 13,
              padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            Solicitar Diagnóstico <ArrowRight style={{ width: 16, height: 16 }} />
          </button>

          <a
            href={WA_ESPECIALISTA} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.08)", color: "#E0E0E0",
              fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
              textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)",
            }}
          >
            <MessageCircle style={{ width: 15, height: 15 }} /> Falar com Especialista
          </a>
        </div>
      </div>
    </section>
  );
}