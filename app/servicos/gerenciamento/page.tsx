"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, MessageCircle,
  Lock, MapPin, Phone, Mail, Clock,
  BarChart3, Bell, FileText, Users, History,
  Target, ShieldCheck, Layers, ClipboardList,
  Instagram, Linkedin,
} from "lucide-react";
import Link from "next/link";

/* ─── Constants ─────────────────────────────────────────────────────── */
const WA_NUM            = "4734401719";
const WA_BASE           = `https://wa.me/${WA_NUM}`;
const WA_GERENCIAMENTO  = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Gerenciamento%20Metrológico`;

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
  "Dashboard em tempo real com status e vencimentos",
  "Relatórios prontos para ISO, IATF e ANVISA",
  "Alertas automáticos antes de cada vencimento",
  "Histórico técnico completo por instrumento",
];

const comoFuncionaSteps = [
  {
    num: "01",
    icon: Layers,
    title: "Mapeamento do parque",
    desc: "Levantamento técnico de todos os instrumentos críticos, classificação por uso e definição de periodicidade.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Cadastro inteligente",
    desc: "Cada instrumento entra no sistema com histórico, certificados, validade e responsável associado.",
  },
  {
    num: "03",
    icon: Bell,
    title: "Monitoramento contínuo",
    desc: "Alertas automáticos antes do vencimento e acompanhamento técnico de todas as ações corretivas.",
  },
  {
    num: "04",
    icon: FileText,
    title: "Relatórios e auditoria",
    desc: "Documentação pronta para ISO 9001, IATF 16949, ANVISA e auditorias internas a qualquer momento.",
  },
];

const beneficios = [
  {
    icon: BarChart3,
    title: "Dashboard em tempo real",
    desc: "Status, vencimentos e indicadores de cada instrumento em um só painel.",
  },
  {
    icon: FileText,
    title: "Relatórios para auditoria",
    desc: "Modelos prontos para ISO 9001, IATF 16949 e ANVISA.",
  },
  {
    icon: Bell,
    title: "Alertas automáticos",
    desc: "Avisos antecipados de vencimento — zero surpresa em auditoria.",
  },
  {
    icon: History,
    title: "Histórico completo",
    desc: "Toda intervenção, calibração e manutenção rastreada por equipamento.",
  },
  {
    icon: Target,
    title: "Foco no seu core",
    desc: "Sua equipe deixa de gastar tempo com planilhas e cobranças.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade contínua",
    desc: "Operação sempre dentro dos requisitos da ISO 17025.",
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

const services = ["Calibração", "Certificação", "Manutenção", "Consultoria", "Treinamentos"];

/* ─── Mock Dashboard ─────────────────────────────────────────────────── */
const mockInstruments = [
  { id: "PT-100 #4521", area: "Caldeira A", date: "12/08/2026", status: "ok" },
  { id: "Manômetro #1183", area: "Linha 03", date: "29/05/2026", status: "warning" },
  { id: "Balança Ind. #07", area: "Expedição", date: "30/09/2026", status: "ok" },
  { id: "Termopar #2210", area: "Forno 03", date: "—", status: "service" },
  { id: "Multímetro #88", area: "Manutenção", date: "15/11/2026", status: "ok" },
];

function MockDashboard() {
  const statusColor = (s: string) =>
    s === "ok" ? "#22c55e" : s === "warning" ? "#ef4444" : "#f59e0b";
  const statusLabel = (s: string) =>
    s === "ok" ? "" : s === "warning" ? "Vencido" : "Serviço";

  return (
    <div style={{
      background: "#111", border: "1px solid #2a2a2a", borderRadius: 14,
      overflow: "hidden", width: "100%", maxWidth: 440,
      boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
    }}>
      {/* Header */}
      <div style={{
        background: "#1a1a1a", padding: "14px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #2a2a2a",
      }}>
        <div>
          <p style={{ fontSize: 10, color: "#666", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Painel de Controle
          </p>
          <p style={{ fontSize: 13, color: "#fff", fontWeight: 700, margin: 0 }}>
            Instrumentos monitorados
          </p>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#F22020", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Bell style={{ width: 13, height: 13, color: "#fff" }} />
        </div>
      </div>
      {/* Stats row */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        borderBottom: "1px solid #2a2a2a",
      }}>
        {[
          { label: "Total", value: "324", color: "#fff" },
          { label: "Em dia", value: "298", color: "#22c55e" },
          { label: "Atenção", value: "26", color: "#F22020" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ padding: "12px 16px", borderRight: "1px solid #2a2a2a" }}>
            <p style={{ fontSize: 10, color: "#555", margin: 0, marginBottom: 2 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
      {/* Rows */}
      {mockInstruments.map(inst => (
        <div key={inst.id} style={{
          padding: "11px 18px", borderBottom: "1px solid #1e1e1e",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 12,
        }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#e0e0e0", margin: 0 }}>{inst.id}</p>
            <p style={{ fontSize: 11, color: "#555", margin: 0 }}>{inst.area}</p>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.04)", borderRadius: 20,
            padding: "3px 10px",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: statusColor(inst.status),
            }} />
            <span style={{ fontSize: 11, color: statusColor(inst.status), fontWeight: 600 }}>
              {inst.status === "ok" ? inst.date : statusLabel(inst.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */
function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner-manutencao.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,10,10,0.88) 50%, rgba(242,34,32,0.07) 100%)",
      }} />
      {/* Back link */}
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
          display: "inline-block", background: "#F22020",
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 4,
          marginBottom: 18, textTransform: "uppercase",
        }}>
          Gerenciamento Metrológico
        </div>
        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Foque no seu negócio.{" "}
          <span style={{ color: "#F22020", fontStyle: "italic" }}>
            A metrologia é com a TECNOISO.
          </span>
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 520 }}>
          Assumimos o controle total do ciclo de vida dos seus instrumentos — dos prazos de calibração
          ao histórico técnico — com visibilidade completa via dashboard e alertas automáticos antes
          de qualquer vencimento.
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
            Quero terceirizar minha metrologia
          </button>
          <button
            onClick={() => { document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#E0E0E0",
              fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
              cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)",
            }}
          >
            Como funciona
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Como Funciona ──────────────────────────────────────────────────── */
function ComoFuncionaSection() {
  return (
    <section id="como-funciona" style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            COMO FUNCIONA
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Um processo claro para{" "}
            <span style={{ color: "#F22020" }}>controle total</span>{" "}
            da sua metrologia
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Da entrada do instrumento à entrega do relatório de auditoria, conduzimos cada etapa
            com rastreabilidade técnica.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
          {comoFuncionaSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 14,
                overflow: "hidden", display: "flex", flexDirection: "column",
              }}>
                <div style={{ height: 3, background: "#F22020" }} />
                <div style={{ padding: "22px" }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 16,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "#FFF0F0", border: "1px solid #FCCFCF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon style={{ width: 20, height: 20, color: "#F22020" }} />
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#EBEBEB", letterSpacing: "0.02em" }}>
                      {step.num}
                    </span>
                  </div>
                  <h3 style={{ ...raj, fontSize: 18, color: "#111", margin: "0 0 8px", lineHeight: 1.2 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard Section ──────────────────────────────────────────────── */
function DashboardSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 64, alignItems: "center",
      }}>
        {/* Left text */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            DASHBOARD TECNOISO
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 16px", lineHeight: 1.1 }}>
            Toda a sua metrologia em{" "}
            <span style={{ color: "#F22020" }}>um só painel</span>
          </h2>
          <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 20px" }}>
            Você acompanha em tempo real cada instrumento da sua planta — status de calibração,
            próximas datas, histórico de manutenções e relatórios prontos para auditoria.
            Notificações inteligentes garantem que nada vença sem aviso.
          </p>
          <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Acesso web seguro — login individual por usuário",
              "Filtros por área, criticidade ou tipo de equipamento",
              "Exportação em PDF/Excel pronta para auditoria",
              "Notificações por e-mail antes de cada vencimento",
            ].map(item => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#444" }}>
                <CheckCircle2 style={{ width: 15, height: 15, color: "#F22020", marginTop: 2, flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={onCtaClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 13,
              padding: "13px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >
            Quero conhecer o painel <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
        </div>
        {/* Right mock dashboard */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MockDashboard />
        </div>
      </div>
    </section>
  );
}

/* ─── Benefícios ─────────────────────────────────────────────────────── */
function BeneficiosSection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            BENEFÍCIOS
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 10px", lineHeight: 1.1 }}>
            Visibilidade total.{" "}
            <span style={{ color: "#F22020" }}>Zero retrabalho.</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Tudo o que sua equipe precisa para operar com conformidade e sem surpresas em auditoria.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {beneficios.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.title} style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "22px",
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
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
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
  const [formData, setFormData] = useState({
    name: "", company: "", role: "", phone: "", email: "",
    instruments: "", message: "",
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
    setTimeout(() => { setIsSubmitting(false); window.location.href = "/obrigado"; }, 1500);
  };

  return (
    <section ref={formRef} id="orcamento" style={{
      background: "#0D0D0D", padding: "72px 24px", scrollMarginTop: 80,
    }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,40px)", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Terceirize sua{" "}
            <span style={{ color: "#F22020" }}>Metrologia</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Conte sobre seu parque de instrumentos. Em até 1 dia útil retornamos com uma proposta.
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
              {/* Quantidade de instrumentos */}
              <div>
                <label style={labelBase}>Quantidade aproximada de instrumentos</label>
                <select value={formData.instruments} onChange={e => setFormData(p => ({ ...p, instruments: e.target.value }))}
                  style={{ ...inputBase, cursor: "pointer", appearance: "none" }} {...fp}>
                  {[
                    "Até 50 instrumentos",
                    "51 a 150 instrumentos",
                    "151 a 300 instrumentos",
                    "Mais de 300 instrumentos",
                    "Não sei ao certo",
                  ].map(s => (
                    <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>
                  ))}
                </select>
              </div>
              {/* Mensagem */}
              <div>
                <label style={labelBase}>Descreva sua necessidade</label>
                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Ex: temos dificuldade em controlar os vencimentos, precisamos de relatórios para auditoria ISO..."
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
                  {isSubmitting ? "Enviando..." : <>Quero terceirizar minha metrologia <ArrowRight style={{ width: 16, height: 16 }} /></>}
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
          </div>
        </div>
      </div>
    </footer>
  );
}



/* ─── Main Page ──────────────────────────────────────────────────────── */
export default function GerenciamentoPage() {
  const formRef = useRef<HTMLElement>(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection        onCtaClick={scrollToForm} />
      <ComoFuncionaSection />
      <DashboardSection   onCtaClick={scrollToForm} />
      <BeneficiosSection />
      <FormSection        formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}