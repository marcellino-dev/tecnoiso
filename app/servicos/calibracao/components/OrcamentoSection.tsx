import { CheckCircle2 } from "lucide-react";
import { forwardRef } from "react";
import { raj } from "./styles";
import QuoteForm from "./QuoteForm";

const bullets = [
  "Atendimento técnico especializado",
  "Certificados com rastreabilidade INMETRO",
  "Proposta personalizada para sua demanda",
  "Atendimento in-loco ou em laboratório",
];

const OrcamentoSection = forwardRef<HTMLElement>((_, ref) => (
  <section
    ref={ref}
    id="orcamento"
    style={{
      background: "#0D0D0D",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "72px 24px",
      scrollMarginTop: 80,
    }}
  >
    <div style={{
      maxWidth: 1200, margin: "0 auto",
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: 64, alignItems: "start",
    }}>
      {/* Left — info */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.12em", margin: "0 0 12px" }}>
            ORÇAMENTO GRATUITO
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,38px)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
            Solicite seu orçamento<br />
            <span style={{ color: "#F22020" }}>sem compromisso</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
            Preencha o formulário e nossa equipe técnica entrará em contato em até 1 dia útil
            com uma proposta personalizada para o seu parque de instrumentos.
          </p>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {bullets.map(item => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#A0A0A0" }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: "#F22020", flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>
            Prefere ligar?
          </p>
          <a href="tel:+554734383175" style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            (47) 3438-3175
          </a>
        </div>
      </div>

      {/* Right — form card */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: 16, overflow: "hidden",
      }}>
        <div style={{ height: 3, background: "#F22020" }} />
        <div style={{ padding: "36px 36px" }}>
          <QuoteForm />
        </div>
      </div>
    </div>
  </section>
));

OrcamentoSection.displayName = "OrcamentoSection";
export default OrcamentoSection;