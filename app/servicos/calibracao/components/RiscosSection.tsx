import { raj } from "./styles";
import { riscos } from "./data";

export default function RiscosSection() {
  return (
    <section style={{ background: "#FDF5F5", borderBottom: "1px solid #EBEBEB", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,36px)", color: "#111", margin: "0 0 8px", lineHeight: 1.1 }}>
            Os Riscos de um Controle Metrológico{" "}
            <span style={{ color: "#F22020" }}>Ineficiente</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 32 }}>
          {riscos.map(({ icon: Icon, label }) => (
            <div key={label} style={{
              background: "#fff", border: "1.5px solid #F5DADA", borderRadius: 12,
              padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "#FFF0F0", border: "1px solid #FCCFCF",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#222", lineHeight: 1.35 }}>{label}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#999", fontStyle: "italic", margin: 0 }}>
          A maioria das empresas só descobre falhas quando o prejuízo já aconteceu.
        </p>
      </div>
    </section>
  );
}