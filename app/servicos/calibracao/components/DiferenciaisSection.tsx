import { raj } from "./styles";
import { diferenciais } from "./data";

export default function DiferenciaisSection() {
  return (
    <section style={{ background: "#F5F5F5", borderBottom: "1px solid #EBEBEB", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,36px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Mais que Calibração.{" "}
            <span style={{ color: "#F22020" }}>Gestão Completa da Conformidade.</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
            A TECNOISO apresenta o comportamento metrológico de seus equipamentos comparando com padrões rastreáveis,
            identificando erros e incertezas e permitindo o controle contínuo do seu processo.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 40 }}>
          {diferenciais.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.title} style={{ background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "22px 22px" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "#FFF0F0", border: "1px solid #FCCFCF",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                }}>
                  <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px", lineHeight: 1.3 }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}