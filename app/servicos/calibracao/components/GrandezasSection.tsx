"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { raj } from "./styles";
import { grandezas } from "./data";

interface GrandezasSectionProps {
  onCtaClick: () => void;
}

export default function GrandezasSection({ onCtaClick }: GrandezasSectionProps) {
  const [activeGrandeza, setActiveGrandeza] = useState("pressao");

  const grandezaAtiva = grandezas.find((g) => g.id === activeGrandeza)!;
  const GrandezaIcon  = grandezaAtiva.icon;

  return (
    <section style={{ position: "relative", background: "#0D0D0D", padding: "56px 24px", overflow: "hidden" }}>
      {/* Decorative radial glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,34,32,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.12em", margin: "0 0 10px" }}>SOLUÇÕES</p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,34px)", color: "#fff", margin: 0, lineHeight: 1.1 }}>
            Calibração Industrial Completa
          </h2>
          <p style={{ color: "#666", fontSize: 13, margin: "8px 0 0" }}>
            Selecione uma grandeza para conhecer os instrumentos atendidos
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16, alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {grandezas.map((g) => {
              const Icon = g.icon;
              const isActive = g.id === activeGrandeza;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGrandeza(g.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px", borderRadius: 8,
                    border: `1.5px solid ${isActive ? "#F22020" : "rgba(255,255,255,0.08)"}`,
                    background: isActive ? "#F22020" : "rgba(255,255,255,0.04)",
                    color: isActive ? "#fff" : "#999",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Icon style={{ width: 15, height: 15 }} />
                    {g.label}
                  </span>
                  {isActive && <ChevronRight style={{ width: 14, height: 14, opacity: 0.8 }} />}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: 14, overflow: "hidden",
          }}>
            <div style={{ height: 3, background: "#F22020" }} />
            <div style={{
              padding: "32px 36px",
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40,
            }}>
              {/* Left: description */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: "rgba(242,34,32,0.15)", border: "1.5px solid rgba(242,34,32,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <GrandezaIcon style={{ width: 24, height: 24, color: "#F22020" }} />
                  </div>
                  <div>
                    <h3 style={{ ...raj, fontSize: 26, color: "#fff", margin: 0 }}>{grandezaAtiva.label}</h3>
                    <span style={{ fontSize: 12, color: "#F22020", fontWeight: 600 }}>
                      {grandezaAtiva.count} tipos de instrumento
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#A0A0A0", lineHeight: 1.7, margin: "0 0 24px" }}>
                  {grandezaAtiva.desc}
                </p>
                <button
                  onClick={onCtaClick}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 12,
                    padding: "11px 22px", borderRadius: 8, border: "none", cursor: "pointer",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}
                >
                  SOLICITAR CALIBRAÇÃO <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>

              {/* Right: instruments list */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                  INSTRUMENTOS ATENDIDOS
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {grandezaAtiva.instrumentos.map((inst) => (
                    <div key={inst} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px",
                      background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
                      borderRadius: 9,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F22020", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#E0E0E0" }}>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#444", margin: "28px 0 0", fontStyle: "italic" }}>
          Centralize sua confiança em um único parceiro e elimine riscos de inconsistência entre laudos.
        </p>
      </div>
    </section>
  );
}