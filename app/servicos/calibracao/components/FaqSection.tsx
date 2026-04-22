"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { raj } from "./styles";
import { faqs } from "./data";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB", padding: "56px 24px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 64,
      }}>
        {/* Left */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>FAQ</p>
          <h2 style={{ ...raj, fontSize: "clamp(20px,2.8vw,30px)", color: "#111", margin: "0 0 10px", lineHeight: 1.1 }}>
            Perguntas Frequentes
          </h2>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Tire suas dúvidas sobre nosso processo de calibração e certificação.
          </p>
        </div>

        {/* Right — accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #EBEBEB", borderRadius: 10, overflow: "hidden" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "15px 20px", background: "none", border: "none",
                  cursor: "pointer", textAlign: "left", gap: 16,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: openFaq === i ? "#F22020" : "#111" }}>
                  {faq.q}
                </span>
                <ChevronDown style={{
                  width: 15, height: 15, color: openFaq === i ? "#F22020" : "#AAA",
                  flexShrink: 0,
                  transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 14px", borderTop: "1px solid #F0F0F0" }}>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: "12px 0 0" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}