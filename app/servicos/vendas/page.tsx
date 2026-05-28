"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  Lock, MapPin, Phone, Mail, Clock,
  Users, Wrench, Star, TrendingUp,
  MessageCircle, Mic, AtSign, PhoneCall,
  UserCheck, RefreshCw, Zap, Heart,
  Instagram, Linkedin, ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import DeveloperSignature from "@/components/DeveloperSignature";
/* ─── Constants ─────────────────────────────────────────────────────── */
const WA_NUM          = "4734401719";
const WA_BASE         = `https://wa.me/${WA_NUM}`;
const WA_VENDAS       = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20especialista%20sobre%20instrumentos%20de%20medição`;

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
  "Atendimento consultivo em todo território nacional",
  "Visita técnica do gerente para entender o seu processo",
  "Instrumentos das melhores marcas nacionais e internacionais",
  "Carteira exclusiva: cada cliente tem seu representante dedicado",
];

const nossJeitoItems = [
  {
    icon: Users,
    title: "Time especializado",
    desc: "Profissionais com vivência técnica em metrologia e calibração — não apenas vendedores, mas consultores.",
  },
  {
    icon: Wrench,
    title: "Visita técnica do gerente",
    desc: "Nosso gerente técnico vai até o cliente para entender o processo e propor soluções práticas de uso diário.",
  },
  {
    icon: Star,
    title: "Valor agregado justo",
    desc: "Indicamos o instrumento certo para a sua aplicação — nada de venda excessiva ou equipamento subdimensionado.",
  },
];

const carteiraItems = [
  {
    icon: UserCheck,
    title: "Representante dedicado",
    desc: "Cada cliente tem um ponto focal único — sem perder histórico, sem repetir explicações.",
  },
  {
    icon: Heart,
    title: "Proximidade real",
    desc: "Relacionamento contínuo: você sempre fala com quem já conhece o seu parque de instrumentos.",
  },
  {
    icon: Zap,
    title: "Agilidade no retorno",
    desc: "Cotações, dúvidas técnicas e follow-up de pedidos com tempo de resposta reduzido.",
  },
  {
    icon: TrendingUp,
    title: "Recomendações sob medida",
    desc: "Sugestões alinhadas ao seu segmento e às particularidades dos seus processos.",
  },
];

const canaisItems = [
  {
    icon: MessageCircle,
    label: "WhatsApp mensagem",
    desc: "Resposta rápida para dúvidas, follow-up e acompanhamento de pedidos.",
    value: "whatsapp-texto",
  },
  {
    icon: Mic,
    label: "WhatsApp voz",
    desc: "Explique sua necessidade por áudio — nosso consultor retorna rapidamente.",
    value: "whatsapp-voz",
  },
  {
    icon: AtSign,
    label: "E-mail",
    desc: "Cotações formais, propostas técnicas e documentação registrada.",
    value: "email",
  },
  {
    icon: PhoneCall,
    label: "Ligação telefônica",
    desc: "Atendimento direto com nosso time comercial em horário comercial.",
    value: "ligacao",
  },
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
function HeroSection({ onCtaClick, onSaibaMaisClick }: { onCtaClick: () => void; onSaibaMaisClick: () => void }) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner-vendas.png')",
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
        {/* Badge */}
        <div style={{
          display: "inline-block", background: "#F22020",
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 4,
          marginBottom: 18, textTransform: "uppercase",
        }}>
          Vendas de Instrumentos
        </div>
        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Mais que vender,{" "}
          <span style={{ color: "#F22020", fontStyle: "italic" }}>
            entendemos o seu processo
          </span>{" "}
          e levamos a melhor solução
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 520 }}>
          Comercialização de instrumentos de medição das melhores marcas nacionais e internacionais —
          com time altamente especializado e atendimento consultivo de ponta a ponta.
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
          <button
            onClick={onCtaClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 13,
              padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >
            Falar com um Especialista
          </button>
          <button
            onClick={onSaibaMaisClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#E0E0E0",
              fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
              cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)",
            }}
          >
            Como atendemos
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Nosso Jeito de Vender ──────────────────────────────────────────── */
function NossoJeitoSection({ nossJeitoRef }: { nossJeitoRef: React.RefObject<HTMLElement> }) {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Left text */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
              NOSSO JEITO DE VENDER
            </p>
            <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 16px", lineHeight: 1.1 }}>
              Atendimento consultivo em{" "}
              <span style={{ color: "#F22020" }}>todo território nacional</span>
            </h2>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 14px" }}>
              Contamos com um <strong>time altamente especializado</strong>, pronto para atender clientes
              de todo o Brasil. Nosso gerente técnico realiza visitas com o objetivo de entender de que
              forma podemos auxiliar a empresa a melhorar seus processos de calibração.
            </p>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              Indicamos equipamentos com <strong>valor agregado justo</strong> e levamos sugestões práticas
              de uso no dia a dia — sempre alinhadas à realidade do seu chão de fábrica ou laboratório.
            </p>
          </div>
          {/* Right cards */}
          <div ref={nossJeitoRef as React.RefObject<HTMLDivElement>} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {nossJeitoItems.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{
                  background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "20px",
                  display: "flex", alignItems: "flex-start", gap: 16,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: "#FFF0F0", border: "1px solid #FCCFCF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
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

/* ─── Carteira Exclusiva ─────────────────────────────────────────────── */
function CarteiraSection() {
  return (
    <section style={{ background: "#0D0D0D", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            CARTEIRA EXCLUSIVA
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Representantes internos com{" "}
            <span style={{ color: "#F22020", fontStyle: "italic" }}>carteira exclusiva</span>{" "}
            de clientes
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Nosso time de representantes internos atende carteiras exclusivas — garantindo maior
            proximidade, relacionamento de longo prazo e atendimento verdadeiramente personalizado.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {carteiraItems.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{
                background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "24px",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "rgba(242,32,32,0.15)", border: "1px solid rgba(242,32,32,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Canais de Atendimento ──────────────────────────────────────────── */
function CanaisSection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            CANAIS DE ATENDIMENTO
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Diversos canais para você falar com a{" "}
            <span style={{ color: "#F22020" }}>TECNOISO</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Escolha o canal mais conveniente — em qualquer um deles, você é atendido pelo seu representante exclusivo.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
          {canaisItems.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.value} style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12,
                padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", gap: 12,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "#FFF0F0", border: "1px solid #FCCFCF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon style={{ width: 22, height: 22, color: "#F22020" }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{item.label}</h3>
                  <p style={{ fontSize: 12, color: "#777", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Formulário ─────────────────────────────────────────────────────── */
function FormSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCanal, setSelectedCanal] = useState("");
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
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.currentTarget.style.borderColor = FOCUS_COLOR),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
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
          name:    formData.name,
          company: formData.company,
          email:   formData.email,
          phone:   formData.phone,
          service: selectedCanal
            ? `Vendas de Instrumentos — Canal preferido: ${canalLabels[selectedCanal]}`
            : "Vendas de Instrumentos",
          message: formData.message,
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
    <section ref={formRef} id="orcamento" style={{
      background: "#0D0D0D", padding: "72px 24px", scrollMarginTop: 80,
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,40px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Fale com um{" "}
            <span style={{ color: "#F22020" }}>Especialista</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Conte sobre o seu processo e os instrumentos que precisa. Em até 1 dia útil retornamos
            com indicação técnica e proposta personalizada.
          </p>
        </div>

        {/* Form card */}
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
                  placeholder="Seu nome completo" style={inputBase} {...fp} />
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
                    placeholder="(47) 99999-9999" style={inputBase} {...fp} />
                </div>
                <div>
                  <label style={labelBase}>E-mail <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="seu@email.com" style={inputBase} {...fp} />
                </div>
              </div>

              {/* Canal preferido — botões visuais */}
              <div>
                <label style={labelBase}>
                  Canal preferido de atendimento
                </label>
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
                <label style={labelBase}>Como podemos ajudar?</label>
                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Ex: Preciso de 3 termômetros digitais para processo de injeção plástica, faixa -10 a 150°C..."
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
                  {isSubmitting ? "Enviando..." : <>Falar com Especialista <ArrowRight style={{ width: 16, height: 16 }} /></>}
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
export default function VendasPage() {
  const formRef = useRef<HTMLElement>(null);
  const nossJeitoRef = useRef<HTMLElement>(null);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const scrollToNossJeito = () =>
    nossJeitoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection onCtaClick={scrollToForm} onSaibaMaisClick={scrollToNossJeito} />
      <NossoJeitoSection nossJeitoRef={nossJeitoRef as React.RefObject<HTMLElement>} />
      <CarteiraSection />
      <CanaisSection />
      <FormSection formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}