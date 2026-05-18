"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  Lock, MapPin, Phone, Mail, Clock,
  FileText, Shield, QrCode, Link2,
  PenLine, Hash, ClipboardCheck, Eye,
  Search, Instagram, Linkedin,
  Loader2, MessageCircle, Mic,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/* ─── Constants ─────────────────────────────────────────────────────── */
const WA_NUM  = "4734401719";
const WA_BASE = `https://wa.me/${WA_NUM}`;

/* ─── Design Tokens ──────────────────────────────────────────────────── */
const RED      = "#F22020";
const RED_DARK = "#a01010";
const BLUR_BG  = "rgba(255,255,255,0.05)";
const BORDER   = "rgba(255,255,255,0.10)";

const raj: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani, 'Rajdhani', sans-serif)",
  fontWeight: 700,
};

const inputBase: React.CSSProperties = {
  width: "100%",
  height: 44,
  background: BLUR_BG,
  border: `1.5px solid ${BORDER}`,
  borderRadius: 8,
  padding: "0 14px",
  fontSize: 14,
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
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
  "Certificados com rastreabilidade ao INMETRO/RBC",
  "Assinatura digital e código de verificação online",
  "Conformidade com ISO 9001, IATF 16949, ANVISA e ISO 17025",
  "Entrega em até 5 dias úteis após a calibração",
];

const oQueECards = [
  {
    icon: Eye,
    title: "Transparência",
    desc: "Resultados claros, com incertezas e padrões declarados, prontos para auditoria interna ou externa.",
  },
  {
    icon: Shield,
    title: "Qualidade comprovada",
    desc: "Documento formal que demonstra a aderência do instrumento aos limites técnicos exigidos pelo processo.",
  },
  {
    icon: ClipboardCheck,
    title: "Confiança nas decisões",
    desc: "Garantia de que medições críticas — qualidade, segurança e produção — estão amparadas tecnicamente.",
  },
];

const anatomiaItems = [
  {
    icon: FileText,
    title: "Identificação completa",
    desc: "Dados do cliente, do instrumento (TAG, modelo, número de série) e do laboratório responsável.",
  },
  {
    icon: Hash,
    title: "Resultados das medições",
    desc: "Valores medidos, erros encontrados em cada ponto e comparação com o padrão de referência.",
  },
  {
    icon: Search,
    title: "Incerteza de medição",
    desc: "Cálculo de incerteza expandida com fator de abrangência declarado, conforme guia ISO GUM.",
  },
  {
    icon: Link2,
    title: "Rastreabilidade metrológica",
    desc: "Cadeia de padrões rastreados ao INMETRO e ao Sistema Internacional de Unidades (SI).",
  },
  {
    icon: PenLine,
    title: "Assinatura técnica responsável",
    desc: "Assinado digitalmente pelo signatário autorizado, com validade legal e técnica reconhecida.",
  },
  {
    icon: QrCode,
    title: "Código de verificação",
    desc: "QR Code e código único para autenticação online do certificado por auditores e clientes.",
  },
];

const rastreabilidadeSteps = [
  { num: "01", label: "TOPO",       title: "BIPM / SI",          desc: "Sistema Internacional de Unidades — referência mundial." },
  { num: "02", label: "NACIONAL",   title: "INMETRO",            desc: "Padrões nacionais mantidos pelo instituto brasileiro." },
  { num: "03", label: "ACREDITADOS",title: "Laboratórios RBC",   desc: "Laboratórios acreditados pelo CGCRE/INMETRO." },
  { num: "04", label: "OPERAÇÃO",   title: "TECNOISO",           desc: "Padrões de trabalho calibrados e rastreáveis." },
  { num: "05", label: "CLIENTE",    title: "Seu instrumento",    desc: "Calibração certificada com rastreabilidade documentada." },
];

const contactItems = [
  { icon: MapPin, text: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
  { icon: Phone,  text: "(47) 3438-3175" },
  { icon: Mail,   text: "contato@tecnoiso.com" },
  { icon: Clock,  text: "Segunda à Sexta\n07:42 às 17:30" },
];

const socialLinks = [
  { href: "https://www.instagram.com/leorosajr/",                     icon: Instagram, label: "Instagram" },
  { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin,  label: "LinkedIn"  },
];

const services = ["Calibração", "Certificação", "Manutenção", "Consultoria", "Treinamentos"];

/* ─── Canal preferido ──────────────────────────────────────────────── */
type Channel = "whatsapp_text" | "whatsapp_voice" | "email" | "phone_call";

const CHANNELS: { id: Channel; label: string; Icon: React.ElementType }[] = [
  { id: "whatsapp_text",  label: "WhatsApp mensagem", Icon: MessageCircle },
  { id: "whatsapp_voice", label: "WhatsApp voz",      Icon: Mic          },
  { id: "email",          label: "E-mail",             Icon: Mail         },
  { id: "phone_call",     label: "Ligação telefônica", Icon: Phone        },
];

/* ═══════════════════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Hero ───────────────────────────────────────────────────────────── */
function HeroSection({
  onCtaClick,
  onSaibaMaisClick,
}: {
  onCtaClick: () => void;
  onSaibaMaisClick: () => void;
}) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      {/* BG image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner-certificados.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,10,10,0.88) 50%, rgba(242,34,32,0.07) 100%)",
      }} />

      {/* Back */}
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "20px 24px 0" }}>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: "#A0A0A0", fontSize: 13, textDecoration: "none",
        }}>
          <ArrowLeft style={{ width: 14, height: 14 }} /> Voltar para a home
        </Link>
      </div>

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "48px 24px 72px" }}>
        {/* Badge */}
        <div style={{
          display: "inline-block", background: RED,
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 4,
          marginBottom: 18, textTransform: "uppercase",
        }}>
          Certificados de Calibração
        </div>

        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Certificados que comprovam a{" "}
          <span style={{ color: RED, fontStyle: "italic" }}>qualidade e a confiança</span>{" "}
          das suas medições
        </h1>

        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 520 }}>
          Documentos formais que registram resultados, padrões utilizados e a rastreabilidade
          aos sistemas oficiais — assegurando transparência em processos industriais,
          laboratoriais e comerciais.
        </p>

        <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {heroBullets.map(item => (
            <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#DEDEDE" }}>
              <CheckCircle2 style={{ width: 16, height: 16, color: RED, marginTop: 2, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={onCtaClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: RED, color: "#fff", fontWeight: 700, fontSize: 13,
              padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >
            Solicitar Certificado
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
            O que contém o certificado
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── O que é ────────────────────────────────────────────────────────── */
function OQueESection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
              O QUE É UM CERTIFICADO DE CALIBRAÇÃO
            </p>
            <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 16px", lineHeight: 1.1 }}>
              O documento que{" "}
              <span style={{ color: RED }}>comprova a confiabilidade</span>{" "}
              dos seus instrumentos
            </h2>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 14px" }}>
              Os <strong>certificados de calibração</strong> são documentos formais que registram
              os resultados das medições, os padrões utilizados e a rastreabilidade aos sistemas oficiais.
            </p>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
              Asseguram <strong>transparência, qualidade e confiança</strong> nos processos industriais,
              laboratoriais e comerciais — sendo exigência direta de auditorias e sistemas de gestão
              como ISO 9001, IATF 16949 e ANVISA.
            </p>
          </div>
          {/* Right cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {oQueECards.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} style={{
                  background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12,
                  padding: "20px", display: "flex", alignItems: "flex-start", gap: 16,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: "#FFF0F0", border: "1px solid #FCCFCF",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: 18, height: 18, color: RED }} />
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

/* ─── Anatomia ───────────────────────────────────────────────────────── */
function AnatomiaSection({ anatomiaRef }: { anatomiaRef: React.RefObject<HTMLElement> }) {
  return (
    <section
      ref={anatomiaRef}
      id="anatomia"
      style={{ background: "#fff", padding: "64px 24px", scrollMarginTop: 80 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
            ANATOMIA DO CERTIFICADO
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            O que está dentro de um{" "}
            <span style={{ color: RED }}>certificado TECNOISO</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
            Cada certificado emitido segue rigorosamente os requisitos da ABNT NBR ISO/IEC 17025
            e das normas metrológicas aplicáveis.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {anatomiaItems.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.title} style={{
                background: "#F9F9F9", border: "1.5px solid #EBEBEB", borderRadius: 12,
                padding: "22px", display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "#FFF0F0", border: "1px solid #FCCFCF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon style={{ width: 18, height: 18, color: RED }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{item.title}</h3>
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

/* ─── Rastreabilidade ────────────────────────────────────────────────── */
function RastreabilidadeSection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
            RASTREABILIDADE METROLÓGICA
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Da sua planta ao{" "}
            <span style={{ color: RED }}>Sistema Internacional de Unidades</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
            Cada certificado mostra a cadeia ininterrupta de comparações até os padrões oficiais.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {rastreabilidadeSteps.map((step, i) => (
            <div key={step.num}>
              <div style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12,
                padding: "18px 24px", display: "flex", alignItems: "center", gap: 20,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: RED,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{step.num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#aaa", letterSpacing: "0.1em", margin: "0 0 2px", textTransform: "uppercase" }}>
                    {step.label}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: "0 0 2px" }}>{step.title}</p>
                  <p style={{ fontSize: 13, color: "#777", margin: 0 }}>{step.desc}</p>
                </div>
              </div>
              {i < rastreabilidadeSteps.length - 1 && (
                <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
                  <div style={{ width: 2, height: 24, background: RED, borderRadius: 2 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Form Section ───────────────────────────────────────────────────── */
function FormSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name:     "",
    company:  "",
    role:     "",
    phone:    "",
    email:    "",
    certType: "Acreditado RBC (CGCRE/INMETRO)",
    channels: [] as Channel[],
    message:  "",
  });
  const [utms, setUtms] = useState({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtms({
      utm_source:   p.get("utm_source")   || "",
      utm_medium:   p.get("utm_medium")   || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_term:     p.get("utm_term")     || "",
      utm_content:  p.get("utm_content")  || "",
    });
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 11);
    let m = "";
    if (d.length === 0)      m = "";
    else if (d.length <= 2)  m = `(${d}`;
    else if (d.length <= 6)  m = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    else if (d.length <= 10) m = `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    else                     m = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
    setFormData(p => ({ ...p, phone: m }));
  };

  const toggleChannel = (id: Channel) =>
    setFormData(p => ({
      ...p,
      channels: p.channels.includes(id)
        ? p.channels.filter(c => c !== id)
        : [...p.channels, id],
    }));

  const fp = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.currentTarget.style.borderColor = RED),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.currentTarget.style.borderColor = BORDER),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const t = {
      name:     formData.name.trim(),
      company:  formData.company.trim(),
      role:     formData.role.trim(),
      email:    formData.email.trim(),
      phone:    formData.phone.trim(),
      service:  formData.certType,
      channels: formData.channels.join(", "),
      message:  formData.message.trim(),
    };

    if (!t.name || !t.email || !t.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios."); return;
    }
    if (t.name.length < 2) {
      toast.error("Nome deve ter pelo menos 2 caracteres."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) {
      toast.error("E-mail inválido."); return;
    }
    if (t.phone.replace(/\D/g, "").length < 10) {
      toast.error("Telefone inválido."); return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-quote", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ ...t, ...utms, origem: "certificados" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData({
          name: "", company: "", role: "", phone: "", email: "",
          certType: "Acreditado RBC (CGCRE/INMETRO)", channels: [], message: "",
        });
        window.location.href = "/obrigado";
      } else {
        throw new Error(data.error || "Erro ao enviar");
      }
    } catch {
      toast.error("Erro ao enviar. Tente novamente ou ligue para nós.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={formRef}
      id="orcamento"
      style={{ background: "#0D0D0D", padding: "72px 24px", scrollMarginTop: 80 }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,40px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Solicite seus <span style={{ color: RED }}>Certificados</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Conte sobre os instrumentos a calibrar. Em até 1 dia útil retornamos com proposta
            técnica e prazo de entrega dos certificados.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1.5px solid rgba(255,255,255,0.08)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ height: 3, background: RED }} />
          <div style={{ padding: "36px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Nome */}
              <div>
                <label style={labelBase}>Nome <span style={{ color: RED }}>*</span></label>
                <input
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Seu nome completo"
                  maxLength={100} autoComplete="name" disabled={isSubmitting}
                  style={inputBase} {...fp}
                />
              </div>

              {/* Empresa */}
              <div>
                <label style={labelBase}>Empresa</label>
                <input
                  value={formData.company}
                  onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                  placeholder="Nome da empresa"
                  maxLength={200} autoComplete="organization" disabled={isSubmitting}
                  style={inputBase} {...fp}
                />
              </div>

              {/* Cargo */}
              <div>
                <label style={labelBase}>Cargo</label>
                <input
                  value={formData.role}
                  onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                  placeholder="Seu cargo"
                  maxLength={100} autoComplete="organization-title" disabled={isSubmitting}
                  style={inputBase} {...fp}
                />
              </div>

              {/* Telefone + E-mail */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelBase}>Telefone <span style={{ color: RED }}>*</span></label>
                  <input
                    value={formData.phone} onChange={handlePhoneChange}
                    placeholder="(47) 99999-9999"
                    maxLength={15} autoComplete="tel" inputMode="numeric" disabled={isSubmitting}
                    style={inputBase} {...fp}
                  />
                </div>
                <div>
                  <label style={labelBase}>E-mail <span style={{ color: RED }}>*</span></label>
                  <input
                    type="email" value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="seu@email.com"
                    maxLength={254} autoComplete="email" disabled={isSubmitting}
                    style={inputBase} {...fp}
                  />
                </div>
              </div>

              {/* Tipo de certificado */}
              <div>
                <label style={labelBase}>Tipo de Certificado</label>
                <select
                  value={formData.certType}
                  onChange={e => setFormData(p => ({ ...p, certType: e.target.value }))}
                  disabled={isSubmitting}
                  style={{ ...inputBase, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
                  {...fp}
                >
                  {[
                    "Acreditado RBC (CGCRE/INMETRO)",
                    "Rastreado INMETRO",
                    "Não sei — preciso de orientação",
                  ].map(s => (
                    <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Canal preferido */}
              <div>
                <label style={labelBase}>Canal Preferido de Atendimento</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CHANNELS.map(({ id, label, Icon }) => {
                    const selected = formData.channels.includes(id);
                    return (
                      <button
                        key={id} type="button"
                        onClick={() => toggleChannel(id)}
                        disabled={isSubmitting}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "11px 14px",
                          background: selected ? "rgba(242,32,32,0.12)" : BLUR_BG,
                          border: `1.5px solid ${selected ? RED : BORDER}`,
                          borderRadius: 8,
                          color: selected ? RED : "rgba(255,255,255,0.5)",
                          fontSize: 13, cursor: isSubmitting ? "not-allowed" : "pointer",
                          textAlign: "left", fontFamily: "inherit",
                          transition: "all 0.18s",
                        }}
                      >
                        <Icon size={15} style={{ flexShrink: 0 }} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label style={labelBase}>Descreva os instrumentos a calibrar</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Ex: 3 manômetros, 2 termopares tipo K, 1 balança analítica — precisam de certificado para auditoria ISO..."
                  disabled={isSubmitting} maxLength={2000} rows={4}
                  style={{ ...inputBase, height: "auto", minHeight: 100, padding: "12px 14px", resize: "none" }}
                  {...fp}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button
                  type="submit" disabled={isSubmitting}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: isSubmitting ? RED_DARK : RED,
                    color: "#fff", fontWeight: 700, fontSize: 13,
                    padding: "13px 28px", borderRadius: 8, border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    transition: "background 0.2s",
                    opacity: isSubmitting ? 0.75 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar Certificados
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </>
                  )}
                </button>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                  <Lock style={{ width: 12, height: 12 }} /> Seus dados estão seguros
                </span>
              </div>

            </form>
          </div>
        </div>

        {/* Fallback telefone */}
        <div style={{
          textAlign: "center", marginTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24,
        }}>
          <p style={{
            fontSize: 12, color: "#555", margin: "0 0 4px",
            textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700,
          }}>
            Prefere ligar?
          </p>
          <a href="tel:+554734383175" style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            (47) 3438-3175
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }
      `}</style>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────── */
function PageFooter() {
  return (
    <footer style={{ background: "#0D0D0D", color: "#fff", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 48 }}>

          {/* Sobre */}
          <div>
            <p style={{ color: "#A0A0A0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios
              próprios e metodologia certificada pelo INMETRO. Um dos laboratórios é geral e o outro é
              físico-químico, bem como um laboratório móvel que vai até a sua empresa.
            </p>
          </div>

          {/* Serviços */}
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

          {/* Contato */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Contato</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactItems.map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon style={{ width: 18, height: 18, color: RED, marginTop: 1, flexShrink: 0 }} />
                  <p style={{ color: "#A0A0A0", fontSize: 13, whiteSpace: "pre-line", margin: 0, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CEO */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src="/ceo/Leonardo Rosa Junior.jpg"
              alt="Leonardo Rosa Junior — CEO e Fundador da Tecnoiso"
              style={{
                width: 112, height: 112, borderRadius: "50%",
                objectFit: "cover", objectPosition: "top",
                border: `2px solid ${RED}`, marginBottom: 12,
              }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Leonardo Rosa Junior</p>
            <p style={{ color: RED, fontSize: 12, marginTop: 4, marginBottom: 16 }}>CEO & Fundador</p>
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

        {/* Bottom bar */}
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
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function CertificadosPage() {
  const formRef     = useRef<HTMLElement>(null);
  const anatomiaRef = useRef<HTMLElement>(null);

  const scrollToForm     = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToAnatomia = () => anatomiaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection onCtaClick={scrollToForm} onSaibaMaisClick={scrollToAnatomia} />
      <OQueESection />
      <AnatomiaSection anatomiaRef={anatomiaRef as React.RefObject<HTMLElement>} />
      <RastreabilidadeSection />
      <FormSection formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}