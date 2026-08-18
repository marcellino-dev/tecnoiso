"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  Lock, MapPin, Phone, Mail, Clock,
  Instagram, Linkedin,
  PackageCheck, CalendarCheck, Truck, ShieldCheck,
  Gauge, Building2, Timer, Wrench,
  MessageCircle, Mic, AtSign, PhoneCall,
} from "lucide-react";
import Link from "next/link";
import DeveloperSignature from "@/components/DeveloperSignature";
/* ─── Styles ─────────────────────────────────────────────────────────── */
const raj: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani, 'Rajdhani', sans-serif)",
  fontWeight: 700,
};

const inputBase: React.CSSProperties = {
  width: "100%",
  height: 44,
  background: "rgba(255,255,255,0.05)",
  border: "1.5px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  padding: "0 14px",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#666",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 8,
};

/* ─── Data ───────────────────────────────────────────────────────────── */
const heroBullets = [
  "Coleta e entrega de equipamentos no cliente",
  "Laboratório móvel para calibrações in loco",
  "Rastreabilidade e segurança no transporte",
  "Especialidade em equipamentos de vazão que exigem bancada",
];

const etapas = [
  {
    num: "01",
    icon: PackageCheck,
    title: "Embalagem técnica",
    desc: "Equipamentos acondicionados em embalagens apropriadas para preservar a integridade metrológica.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Coleta agendada",
    desc: "Nossa frota recolhe os instrumentos no cliente em horário combinado, sem custos surpresa.",
  },
  {
    num: "03",
    icon: Truck,
    title: "Transporte rastreável",
    desc: "Acompanhamento do trajeto desde a coleta até a chegada ao laboratório TECNOISO.",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Entrega segura",
    desc: "Após a calibração, devolvemos os equipamentos com certificados — prontos para o processo.",
  },
];

const labMovelItems = [
  {
    icon: Gauge,
    title: "Especialidade em vazão",
    desc: "Calibração de medidores e equipamentos que exigem bancada — feita no próprio cliente.",
  },
  {
    icon: Building2,
    title: "Bancada que vai até você",
    desc: "Estrutura completa instalada no laboratório móvel, evitando o transporte de equipamentos pesados.",
  },
  {
    icon: Timer,
    title: "Menor tempo de parada",
    desc: "O equipamento não sai da planta — calibração executada com máxima agilidade no local.",
  },
  {
    icon: Wrench,
    title: "Equipe técnica completa",
    desc: "Técnicos especializados acompanham o veículo, com instrumentação e padrões rastreáveis.",
  },
];

const tiposServico = [
  "Coleta e entrega no laboratório TECNOISO",
  "Calibração in loco com laboratório móvel",
  "Coleta + calibração in loco (combinado)",
];

const contactItems = [
  { icon: MapPin, text: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
  { icon: Phone,  text: "(47) 3438-3175" },
  { icon: Mail,   text: "contato@tecnoiso.com" },
  { icon: Clock,  text: "Segunda à Sexta\n07:42 às 17:30" },
];

const socialLinks = [
  { href: "https://www.instagram.com/leorosajr/",                     icon: Instagram, label: "Instagram" },
  { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin,  label: "LinkedIn" },
];

const services = ["Calibração", "Certificação", "Manutenção", "Treinamentos"];

/* ─── Hero ───────────────────────────────────────────────────────────── */
function HeroSection({ onCtaClick, onComoFuncionaClick }: { onCtaClick: () => void; onComoFuncionaClick: () => void }) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner-logistica.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,10,10,0.88) 50%, rgba(242,34,32,0.07) 100%)",
      }} />
      {/* Back link */}
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "20px 24px 0" }}>
        <Link href="/servicos" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#A0A0A0", fontSize: 13, textDecoration: "none",
        }}>
          <ArrowLeft style={{ width: 14, height: 14 }} /> Voltar para serviços
        </Link>
      </div>
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "48px 24px 72px" }}>
        <div style={{
          display: "inline-block", background: "#F22020",
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 4,
          marginBottom: 18, textTransform: "uppercase",
        }}>
          Suporte Logístico
        </div>
        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Logística dedicada e{" "}
          <span style={{ color: "#F22020", fontStyle: "italic" }}>laboratório móvel</span>
          {" "}a serviço da sua operação
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 520 }}>
          Oferecemos serviço diferenciado de coleta e entrega de equipamentos, além de um laboratório
          móvel que vai até o cliente realizar calibrações de instrumentos de vazão que exigem bancada.
        </p>
        <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {heroBullets.map(item => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#DEDEDE" }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: "#F22020", marginTop: 2, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={onCtaClick} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 13,
            padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            Solicitar Coleta
          </button>
          <button onClick={onComoFuncionaClick} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: "#E0E0E0",
            fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
            cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)",
          }}>
            Como funciona
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Coleta e Entrega ───────────────────────────────────────────────── */
function ColetaSection({ coletaRef }: { coletaRef: React.RefObject<HTMLElement> }) {
  return (
    <section ref={coletaRef} style={{ background: "#F5F5F5", padding: "64px 24px", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            COLETA E ENTREGA
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Logística dedicada para os seus{" "}
            <span style={{ color: "#F22020" }}>instrumentos críticos</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Sua equipe foca na produção. A TECNOISO cuida da movimentação dos instrumentos com
            agilidade, rastreabilidade e segurança.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {etapas.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.num} style={{
                background: "#fff", border: "1.5px solid #E8E8E8",
                borderRadius: 12, padding: "28px 24px",
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                {/* número + ícone */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: "#FFF0F0", border: "1px solid #FCCFCF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 20, height: 20, color: "#F22020" }} />
                  </div>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#F22020", lineHeight: 1, fontFamily: "var(--font-rajdhani,'Rajdhani',sans-serif)" }}>
                    {item.num}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Laboratório Móvel ──────────────────────────────────────────────── */
function LabMovelSection() {
  return (
    <section style={{ background: "#0D0D0D", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Left text */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
              LABORATÓRIO MÓVEL
            </p>
            <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
              Calibração{" "}
              <span style={{ color: "#F22020", fontStyle: "italic" }}>in loco</span>{" "}
              para equipamentos de vazão que exigem bancada
            </h2>
            <p style={{ color: "#A0A0A0", fontSize: 14, lineHeight: 1.8, margin: "0 0 14px" }}>
              Nosso <strong style={{ color: "#fff" }}>laboratório móvel</strong> vai até o cliente para executar a
              calibração dos equipamentos de <strong style={{ color: "#fff" }}>vazão que exigem bancada</strong> —
              eliminando deslocamentos complexos e reduzindo o tempo de parada da operação.
            </p>
            <p style={{ color: "#A0A0A0", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              Estrutura completa, padrões rastreáveis e equipe técnica embarcada — toda a confiabilidade do
              laboratório TECNOISO entregue dentro da sua planta.
            </p>
          </div>
          {/* Right cards 2x2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {labMovelItems.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{
                  background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "20px",
                  display: "flex", flexDirection: "column", gap: 10,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "rgba(242,32,32,0.15)", border: "1px solid rgba(242,32,32,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{item.title}</h3>
                    <p style={{ fontSize: 12, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Formulário ─────────────────────────────────────────────────────── */
function FormSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCanal, setSelectedCanal] = useState("");
  const [tipoServico, setTipoServico] = useState(tiposServico[0]);
  const [formData, setFormData] = useState({
    name: "", company: "", role: "", phone: "", email: "", message: "",
  });

  const FOCUS_COLOR = "#F22020";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 11);
    let m = "";
    if (d.length <= 2)  m = `(${d}`;
    else if (d.length <= 6) m = `(${d.slice(0,2)}) ${d.slice(2)}`;
    else if (d.length <= 10) m = `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    else m = `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
    setFormData(p => ({ ...p, phone: m }));
  };

  const fp = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = FOCUS_COLOR),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const canalLabels: Record<string, string> = {
        "whatsapp-texto": "WhatsApp mensagem",
        "whatsapp-voz":   "WhatsApp voz",
        "email":          "E-mail",
        "ligacao":        "Ligação telefônica",
      };
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        formData.name,
          company:     formData.company,
          role:        formData.role,
          email:       formData.email,
          phone:       formData.phone,
          service:     `Suporte Logístico — ${tipoServico}`,
          channels:    selectedCanal ? canalLabels[selectedCanal] : "",
          message:     formData.message,
          origem:      "logistica",
          source_page: window.location.pathname,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/obrigado";
      } else {
        alert(data.error || "Erro ao enviar. Tente novamente.");
        setIsSubmitting(false);
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const canalOptions = [
    { value: "whatsapp-texto", label: "WhatsApp mensagem", icon: MessageCircle },
    { value: "whatsapp-voz",  label: "WhatsApp voz",      icon: Mic },
    { value: "email",         label: "E-mail",             icon: AtSign },
    { value: "ligacao",       label: "Ligação telefônica", icon: PhoneCall },
  ];

  return (
    <section ref={formRef} id="solicitar" style={{
      background: "#0D0D0D", padding: "72px 24px", scrollMarginTop: 80,
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,40px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Solicite{" "}
            <span style={{ color: "#F22020" }}>coleta ou visita</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Conte sobre a sua demanda. Em até 1 dia útil organizamos a logística e retornamos com prazo.
          </p>
        </div>

        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1.5px solid rgba(255,255,255,0.08)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ height: 3, background: "#F22020" }} />
          <div style={{ padding: "36px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Nome */}
              <div>
                <label style={labelBase}>Nome <span style={{ color: FOCUS_COLOR }}>*</span></label>
                <input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Seu nome completo" required style={inputBase} {...fp} />
              </div>
              {/* Empresa */}
              <div>
                <label style={labelBase}>Empresa</label>
                <input value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                  placeholder="Nome da empresa" style={inputBase} {...fp} />
              </div>
              {/* Cargo */}
              <div>
                <label style={labelBase}>Cargo</label>
                <input value={formData.role} onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                  placeholder="Seu cargo" style={inputBase} {...fp} />
              </div>
              {/* Telefone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelBase}>Telefone <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input value={formData.phone} onChange={handlePhoneChange}
                    placeholder="(47) 99999-9999" required style={inputBase} {...fp} />
                </div>
                <div>
                  <label style={labelBase}>E-mail <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="seu@email.com" required style={inputBase} {...fp} />
                </div>
              </div>

              {/* Tipo de serviço */}
              <div>
                <label style={labelBase}>Tipo de serviço</label>
                <select
                  value={tipoServico}
                  onChange={e => setTipoServico(e.target.value)}
                  style={{
                    ...inputBase,
                    cursor: "pointer",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: 36,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = FOCUS_COLOR)}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                >
                  {tiposServico.map(t => (
                    <option key={t} value={t} style={{ background: "#1a1a1a", color: "#fff" }}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Canal preferido */}
              <div>
                <label style={labelBase}>Canal preferido de atendimento</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {canalOptions.map(opt => {
                    const Icon = opt.icon;
                    const selected = selectedCanal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedCanal(opt.value)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          background: selected ? "rgba(242,32,32,0.12)" : "rgba(255,255,255,0.04)",
                          border: selected ? "1.5px solid #F22020" : "1.5px solid rgba(255,255,255,0.1)",
                          borderRadius: 10, padding: "12px 14px",
                          cursor: "pointer", textAlign: "left",
                          transition: "all 0.18s",
                        }}
                      >
                        <div style={{
                          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                          background: selected ? "rgba(242,32,32,0.2)" : "rgba(255,255,255,0.06)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "background 0.18s",
                        }}>
                          <Icon style={{ width: 16, height: 16, color: selected ? "#F22020" : "#888" }} />
                        </div>
                        <span style={{
                          fontSize: 13, fontWeight: 600,
                          color: selected ? "#fff" : "#888",
                          transition: "color 0.18s",
                        }}>
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label style={labelBase}>Endereço da coleta, equipamentos e prazo desejado</label>
                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Ex: Rua das Indústrias, 500 — Joinville/SC. Preciso coletar 4 medidores de vazão para calibração. Prazo: até 15 dias."
                  style={{ ...inputBase, height: "auto", minHeight: 100, padding: "12px 14px", resize: "none" }} {...fp} />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button type="submit" disabled={isSubmitting} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: isSubmitting ? "#a01010" : FOCUS_COLOR,
                  color: "#fff", fontWeight: 700, fontSize: 13,
                  padding: "13px 28px", borderRadius: 8, border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                  opacity: isSubmitting ? 0.75 : 1,
                }}>
                  {isSubmitting ? "Enviando..." : <>Solicitar Coleta ou Visita <ArrowRight style={{ width: 16, height: 16 }} /></>}
                </button>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                  <Lock style={{ width: 12, height: 12 }} /> Seus dados estão seguros
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Phone fallback */}
        <div style={{ textAlign: "center", marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: "#555", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
            Prefere ligar?
          </p>
          <a href="tel:+554734383175" style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            (47) 3438-3175
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function PageFooter() {
  return (
    <footer style={{ background: "#0D0D0D", color: "#fff", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 48 }}>
          <div>
            <p style={{ color: "#A0A0A0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios próprios e
              metodologia certificada pelo INMETRO. Um dos laboratórios é geral e o outro é físico-químico, bem como um
              laboratório móvel que vai até a sua empresa.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Serviços</h3>
            <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {services.map(s => (
                <li key={s}>
                  <a href="/#servicos" style={{ color: "#A0A0A0", fontSize: 13, textDecoration: "none" }}>{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Contato</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactItems.map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon style={{ width: 18, height: 18, color: "#F22020", marginTop: 1, flexShrink: 0 }} />
                  <p style={{ color: "#A0A0A0", fontSize: 13, whiteSpace: "pre-line", margin: 0, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src="/ceo/Leonardo Rosa Junior.jpg"
              alt="Leonardo Rosa Junior — CEO e Fundador da Tecnoiso"
              style={{
                width: 112, height: 112, borderRadius: "50%",
                objectFit: "cover", objectPosition: "top",
                border: "2px solid #F22020", marginBottom: 12,
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Leonardo Rosa Junior</p>
            <p style={{ color: "#F22020", fontSize: 12, marginTop: 4, marginBottom: 16 }}>CEO & Fundador</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map(({ href, icon: Icon, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none",
                  }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid #333", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "#555", fontSize: 12, margin: 0 }}>
            © 2026 TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA. | CNPJ: 17.459.428/0001-08
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Política de Qualidade", "Termos de Uso"].map(label => (
              <a key={label} href="#" style={{ color: "#555", fontSize: 12, textDecoration: "none" }}>{label}</a>
            ))}
            <DeveloperSignature />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function LogisticaPage() {
  const formRef   = useRef<HTMLElement>(null);
  const coletaRef = useRef<HTMLElement>(null);

  const scrollToForm   = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToColeta = () => coletaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection onCtaClick={scrollToForm} onComoFuncionaClick={scrollToColeta} />
      <ColetaSection coletaRef={coletaRef as React.RefObject<HTMLElement>} />
      <LabMovelSection />
      <FormSection formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}