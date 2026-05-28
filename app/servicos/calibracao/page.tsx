"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ChevronDown,
  Lock, MapPin, Phone, Mail, Clock, AlertTriangle, MessageCircle,
  Mic, Loader2, Gauge, Thermometer, Ruler, Weight, Droplets,
  Wrench, Settings, XCircle, BadgeAlert, Ban, AlertCircle,
  RefreshCcw, Unlink, Users, Award, Eye, TrendingUp, Zap,
  Instagram, Linkedin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DeveloperSignature from "@/components/DeveloperSignature";

/* ─── Constants ──────────────────────────────────────────────────────── */
const WA_NUM          = "4734401719";
const WA_BASE         = `https://wa.me/${WA_NUM}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista`;

/* ─── Design tokens ──────────────────────────────────────────────────── */
const R  = "#F22020";
const RD = "#a01010";
const RAJ: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani,'Rajdhani',sans-serif)",
  fontWeight: 700,
};

/* ─── Shared style primitives ────────────────────────────────────────── */
const s = {
  section: (bg: string, extra?: React.CSSProperties): React.CSSProperties =>
    ({ background: bg, padding: "64px 24px", ...extra }),
  wrap: (max = 1100): React.CSSProperties =>
    ({ maxWidth: max, margin: "0 auto" }),
  grid: (min = 220, gap = 14): React.CSSProperties =>
    ({ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))`, gap }),
  card: (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "22px", ...extra,
  }),
  darkCard: (extra?: React.CSSProperties): React.CSSProperties => ({
    background: "rgba(255,255,255,0.04)",
    border: "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 14, overflow: "hidden", ...extra,
  }),
  badge: (bg = "#FFF0F0", border = "#FCCFCF"): React.CSSProperties => ({
    width: 38, height: 38, borderRadius: 10, background: bg,
    border: `1px solid ${border}`, display: "flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  }),
  label: (): React.CSSProperties => ({
    display: "block", fontSize: 11, fontWeight: 700, color: "#666",
    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8,
  }),
  input: (): React.CSSProperties => ({
    width: "100%", height: 44,
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.10)",
    borderRadius: 8, padding: "0 14px", fontSize: 14,
    color: "#fff", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border-color 0.2s",
  }),
  tag: (label: string): React.CSSProperties => ({
    fontSize: 11, fontWeight: 700, color: R,
    letterSpacing: "0.12em", margin: "0 0 10px",
  }),
  btnPrimary: (disabled = false): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: disabled ? RD : R, color: "#fff", fontWeight: 700,
    fontSize: 13, padding: "13px 24px", borderRadius: 8,
    border: "none", cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.04em", opacity: disabled ? 0.75 : 1,
    transition: "background 0.2s", fontFamily: "inherit",
  }),
  btnGhost: (): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(255,255,255,0.08)", color: "#E0E0E0",
    fontWeight: 600, fontSize: 13, padding: "13px 20px",
    borderRadius: 8, textDecoration: "none",
    border: "1.5px solid rgba(255,255,255,0.15)",
  }),
  h2: (color = "#111", size = "clamp(22px,3vw,36px)"): React.CSSProperties =>
    ({ ...RAJ, fontSize: size, color, margin: "0 0 12px", lineHeight: 1.1 }),
  redBar: (): React.CSSProperties =>
    ({ height: 3, background: R }),
};

/* ─── Reusable mini-components ───────────────────────────────────────── */
const RedTag  = ({ text }: { text: string }) =>
  <p style={{ fontSize: 11, fontWeight: 700, color: R, letterSpacing: "0.12em", margin: "0 0 10px" }}>{text}</p>;

const IconBadge = ({ Icon, size = 18, light = true }: { Icon: React.ElementType; size?: number; light?: boolean }) =>
  <div style={s.badge(light ? "#FFF0F0" : "rgba(242,34,32,0.15)", light ? "#FCCFCF" : "rgba(242,34,32,0.3)")}>
    <Icon style={{ width: size, height: size, color: R }} />
  </div>;

const CheckItem = ({ text, light = false }: { text: string; light?: boolean }) =>
  <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: light ? "#DEDEDE" : "#A0A0A0" }}>
    <CheckCircle2 style={{ width: 16, height: 16, color: R, marginTop: 2, flexShrink: 0 }} />
    {text}
  </li>;

/* ─── Data ───────────────────────────────────────────────────────────── */
const heroBullets = [
  "Certificados conforme ABNT NBR ISO/IEC 17025:2017",
  "Rastreabilidade CGCRE/INMETRO garantida",
  "Atendimento in-loco sem paradas desnecessárias",
  "Gestão completa do parque de instrumentos",
];

const grandezas = [
  { id: "pressao",     icon: Gauge,       label: "Pressão",     count: 4,
    desc: "Calibração precisa de instrumentos de pressão com rastreabilidade INMETRO, garantindo leituras confiáveis para processos industriais críticos.",
    instrumentos: ["Manômetros","Transmissores de pressão","Pressostatos","Manômetros padrão"] },
  { id: "temperatura", icon: Thermometer, label: "Temperatura",  count: 4,
    desc: "Controle térmico técnico com certificação completa, essencial para indústrias alimentícias, farmacêuticas e processos de tratamento térmico.",
    instrumentos: ["Termômetros digitais","Infravermelho","Termopares","Termo-higrômetros"] },
  { id: "dimensional", icon: Ruler,       label: "Dimensional",  count: 4,
    desc: "Precisão dimensional certificada para controle de qualidade em usinagem, estamparia e processos de fabricação de alta exigência.",
    instrumentos: ["Paquímetros","Microscópios","Relógios comparadores","Durômetros"] },
  { id: "massa",       icon: Weight,      label: "Massa",         count: 3,
    desc: "Calibração de instrumentos de pesagem em conformidade com as normas vigentes, necessárias para dosagem, formulação e controle de produção.",
    instrumentos: ["Balanças industrial","Balanças analíticas","Pesos padrão"] },
  { id: "vazao",       icon: Droplets,    label: "Vazão",         count: 2,
    desc: "Garantia de precisão volumétrica e mássica precisa para processos de tratamento de água, químico e petroquímico.",
    instrumentos: ["Medidores de dez","Rotâmetros"] },
  { id: "torque",      icon: Wrench,      label: "Torque",        count: 2,
    desc: "Verificação e calibração de ferramentas de torque para montagens críticas nas indústrias automotiva, aeronáutica e de energia.",
    instrumentos: ["Torquímetros","Chaves de torque"] },
  { id: "diversos",    icon: Settings,    label: "Diversos",      count: 3,
    desc: "Cobertura ampla para instrumentos elétricos, de rotação e laboratoriais, centralizando toda a metrologia em um único parceiro.",
    instrumentos: ["Multímetros","Tacômetros","Equipamentos de laboratório"] },
];

const riscos = [
  { icon: XCircle,     label: "Peças reprovadas" },
  { icon: BadgeAlert,  label: "Multas (Anvisa/Ministério do Trabalho)" },
  { icon: Ban,         label: "Interdição de operação" },
  { icon: AlertCircle, label: "Perda de certificações" },
  { icon: RefreshCcw,  label: "Retrabalho e aumento de custos" },
  { icon: Unlink,      label: "Falta de rastreabilidade" },
  { icon: Users,       label: "Dependência de múltiplos fornecedores" },
];

const diferenciais = [
  { icon: Award,      title: "Certificados claros e completos",       desc: "Emitidos conforme ABNT NBR ISO/IEC 17025:2017, aceitos por todos os organismos certificadores." },
  { icon: Eye,        title: "Transparência total",                    desc: "Certificados dos padrões disponíveis para consulta a qualquer momento." },
  { icon: Settings,   title: "Sistema de gestão de qualidade ativo",   desc: "Controlamos vencimentos, histórico e alertas automáticos para seu parque de instrumentos." },
  { icon: TrendingUp, title: "Melhoria contínua",                      desc: "Acompanhamento evolutivo das métricas e desempenho metrológico da sua operação." },
  { icon: Users,      title: "Equipe técnica",                         desc: "Profissionais especializados com experiência em múltiplos segmentos industriais." },
  { icon: Zap,        title: "Agilidade e imparcialidade",             desc: "Processos ágeis e laudos imparciais para decisões rápidas e seguras." },
];

const faqs = [
  { q: "Os certificados são válidos para auditorias?",  a: "Sim, atendem à ISO 17025 e possuem rastreabilidade reconhecida. Aceitos por auditores de ISO 9001, IATF 16949 e BPF/ANVISA." },
  { q: "Vocês atendem quais segmentos?",                a: "Alimentício, farmacêutico, agro, plástico, metalúrgico e industrial em geral." },
  { q: "Você apenas calibra ou ajuda na gestão?",       a: "Também auxiliamos no controle contínuo da metrologia. Acompanhe vencimentos, histórico e status em tempo real." },
  { q: "Como funciona o prazo?",                        a: "Após análise técnica do volume e tipo de equipamento. Prazo padrão de até 5 dias úteis, com opção express." },
  { q: "A rastreabilidade é comprovada?",               a: "Sim, com padrões rastreáveis à CGCRE/INMETRO. Cada certificado possui código de verificação e assinatura digital." },
];

const contactItems = [
  { icon: MapPin, text: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
  { icon: Phone,  text: "(47) 3438-3175" },
  { icon: Mail,   text: "contato@tecnoiso.com" },
  { icon: Clock,  text: "Segunda à Sexta\n07:42 às 17:30" },
];

const services = ["Calibração","Certificação","Manutenção","Consultoria","Treinamentos"];

const socialLinks = [
  { href: "https://www.instagram.com/leorosajr/",                     icon: Instagram, label: "Instagram" },
  { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin,  label: "LinkedIn" },
];

const orcamentoBullets = [
  "Atendimento técnico especializado",
  "Certificados com rastreabilidade INMETRO",
  "Proposta personalizada para sua demanda",
  "Atendimento in-loco ou em laboratório",
];

/* ─── Canal preferido ────────────────────────────────────────────────── */
type Channel = "whatsapp_text" | "whatsapp_voice" | "email" | "phone_call";

const CHANNELS: { id: Channel; label: string; Icon: React.ElementType }[] = [
  { id: "whatsapp_text",  label: "WhatsApp mensagem", Icon: MessageCircle },
  { id: "whatsapp_voice", label: "WhatsApp voz",      Icon: Mic },
  { id: "email",          label: "E-mail",             Icon: Mail },
  { id: "phone_call",     label: "Ligação telefônica", Icon: Phone },
];

/* ═══════════════════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════════════════ */

function AlertBanner({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <div style={{ background: R, padding: "14px 24px" }}>
      <div style={{ ...s.wrap(1200), display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Link href="/servicos" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "transparent", color: "#fff", fontWeight: 600, fontSize: 14,
            padding: "8px 16px", borderRadius: 8, textDecoration: "none",
            border: "1.5px solid rgba(255,255,255,0.5)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} /> Voltar
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AlertTriangle style={{ width: 20, height: 20, color: "#fff", flexShrink: 0 }} />
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: 0 }}>
              <strong style={{ fontWeight: 800, fontSize: 16 }}>ATENÇÃO INDÚSTRIAS:</strong>{" "}
              Não conformidade metrológica pode gerar multas, interdições e prejuízos operacionais.
            </p>
          </div>
        </div>
        <button onClick={onCtaClick} style={{
          background: "#fff", color: R, fontWeight: 700, fontSize: 13,
          padding: "9px 20px", borderRadius: 6, border: "none", cursor: "pointer",
          whiteSpace: "nowrap", letterSpacing: "0.04em", flexShrink: 0,
        }}>
          Solicitar Avaliação Técnica
        </button>
      </div>
    </div>
  );
}

function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner1.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg,rgba(10,10,10,0.82) 50%,rgba(242,34,32,0.08) 100%)",
      }} />
      <div style={{ position: "relative", ...s.wrap(900), padding: "80px 24px 72px" }}>
        <h1 style={{ ...RAJ, fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Conformidade Metrológica<br />
          <span style={{ color: R }}>Certificada e Rastreável</span>
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 430 }}>
          Calibração industrial rastreável ao INMETRO, com controle de erros, incertezas e gestão completa do seu parque de instrumentos.
        </p>
        <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {heroBullets.map(b => <CheckItem key={b} text={b} light />)}
        </ul>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={onCtaClick} style={s.btnPrimary()}>
            Solicitar Diagnóstico <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
          <a href={WA_ESPECIALISTA} target="_blank" rel="noopener noreferrer" style={s.btnGhost()}>
            <MessageCircle style={{ width: 15, height: 15 }} /> Falar com Especialista
          </a>
        </div>
      </div>
    </section>
  );
}

function RiscosSection() {
  return (
    <section style={s.section("#FDF5F5", { borderBottom: "1px solid #EBEBEB" })}>
      <div style={s.wrap()}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={s.h2()}>
            Os Riscos de um Controle Metrológico{" "}
            <span style={{ color: R }}>Ineficiente</span>
          </h2>
        </div>
        <div style={s.grid()}>
          {riscos.map(({ icon: Icon, label }) => (
            <div key={label} style={{ ...s.card({ border: "1.5px solid #F5DADA" }), display: "flex", alignItems: "center", gap: 14, padding: "18px 20px" }}>
              <IconBadge Icon={Icon} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{label}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "#999", fontStyle: "italic", margin: "32px 0 0" }}>
          A maioria das empresas só descobre falhas quando o prejuízo já aconteceu.
        </p>
      </div>
    </section>
  );
}

function DiferenciaisSection() {
  return (
    <section style={s.section("#F5F5F5", { borderBottom: "1px solid #EBEBEB" })}>
      <div style={s.wrap()}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={s.h2()}>
            Mais que Calibração.{" "}
            <span style={{ color: R }}>Gestão Completa da Conformidade.</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
            A TECNOISO apresenta o comportamento metrológico de seus equipamentos comparando com padrões rastreáveis,
            identificando erros e incertezas e permitindo o controle contínuo do seu processo.
          </p>
        </div>
        <div style={s.grid()}>
          {diferenciais.map(d => (
            <div key={d.title} style={s.card()}>
              <IconBadge Icon={d.icon} />
              <div style={{ marginTop: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{d.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrandezasSection({ onCtaClick }: { onCtaClick: () => void }) {
  const [active, setActive] = useState("pressao");
  const g = grandezas.find(x => x.id === active)!;
  const GIcon = g.icon;

  return (
    <section style={{ ...s.section("#0D0D0D"), position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(242,34,32,0.08) 0%,transparent 70%)", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", ...s.wrap(1200) }}>
        <div style={{ marginBottom: 28 }}>
          <RedTag text="SOLUÇÕES" />
          <h2 style={s.h2("#fff", "clamp(22px,3vw,34px)")}>Calibração Industrial Completa</h2>
          <p style={{ color: "#666", fontSize: 13, margin: "8px 0 0" }}>Selecione uma grandeza para conhecer os instrumentos atendidos</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16, alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {grandezas.map(({ id, icon: Icon, label }) => {
              const on = id === active;
              return (
                <button key={id} onClick={() => setActive(id)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", borderRadius: 8,
                  border: `1.5px solid ${on ? R : "rgba(255,255,255,0.08)"}`,
                  background: on ? R : "rgba(255,255,255,0.04)",
                  color: on ? "#fff" : "#999",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Icon style={{ width: 15, height: 15 }} /> {label}
                  </span>
                  {on && <ChevronRight style={{ width: 14, height: 14, opacity: 0.8 }} />}
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div style={s.darkCard()}>
            <div style={s.redBar()} />
            <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 40 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: "rgba(242,34,32,0.15)", border: "1.5px solid rgba(242,34,32,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <GIcon style={{ width: 24, height: 24, color: R }} />
                  </div>
                  <div>
                    <h3 style={{ ...RAJ, fontSize: 26, color: "#fff", margin: 0 }}>{g.label}</h3>
                    <span style={{ fontSize: 12, color: R, fontWeight: 600 }}>{g.count} tipos de instrumento</span>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#A0A0A0", lineHeight: 1.7, margin: "0 0 24px" }}>{g.desc}</p>
                <button onClick={onCtaClick} style={{ ...s.btnPrimary(), textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 12, padding: "11px 22px" }}>
                  SOLICITAR CALIBRAÇÃO <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", margin: "0 0 12px" }}>INSTRUMENTOS ATENDIDOS</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.instrumentos.map(inst => (
                    <div key={inst} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px",
                      background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: R, flexShrink: 0 }} />
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

function FormSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", role: "", email: "", phone: "", channels: [] as Channel[], message: "",
  });
  const [utms, setUtms] = useState({ utm_source:"", utm_medium:"", utm_campaign:"", utm_term:"", utm_content:"" });

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

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 11);
    let m = d.length === 0 ? "" : d.length <= 2 ? `(${d}`
      : d.length <= 6  ? `(${d.slice(0,2)}) ${d.slice(2)}`
      : d.length <= 10 ? `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
      :                  `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
    set("phone", m);
  };

  const toggleCh = (id: Channel) =>
    setForm(p => ({ ...p, channels: p.channels.includes(id) ? p.channels.filter(c => c !== id) : [...p.channels, id] }));

  const fp = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = R),
    onBlur:  (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)"),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = { ...form, name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), channels: form.channels.join(", ") };
    if (!t.name || !t.email || !t.phone) { toast.error("Preencha todos os campos obrigatórios."); return; }
    if (t.name.length < 2) { toast.error("Nome deve ter pelo menos 2 caracteres."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) { toast.error("E-mail inválido."); return; }
    if (t.phone.replace(/\D/g,"").length < 10) { toast.error("Telefone inválido."); return; }
    setSending(true);
    try {
      const res  = await fetch("/api/send-quote", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...t, ...utms, origem: "calibracao" }),
      });
      const data = await res.json();
      if (res.ok && data.success) { window.location.href = "/obrigado"; }
      else throw new Error(data.error || "Erro ao enviar");
    } catch { toast.error("Erro ao enviar. Tente novamente ou ligue para nós."); }
    finally  { setSending(false); }
  };

  return (
    <section ref={formRef} id="orcamento" style={{
      ...s.section("#0D0D0D", { borderTop: "1px solid rgba(255,255,255,0.06)" }),
      scrollMarginTop: 80,
    }}>
      <div style={{ ...s.wrap(1200), display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 64, alignItems: "start" }}>

        {/* Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <RedTag text="ORÇAMENTO GRATUITO" />
            <h2 style={s.h2("#fff", "clamp(24px,3vw,38px)")}>
              Solicite seu orçamento<br /><span style={{ color: R }}>sem compromisso</span>
            </h2>
            <p style={{ color: "#777", fontSize: 14, lineHeight: 1.75, margin: 0 }}>
              Preencha o formulário e nossa equipe técnica entrará em contato em até 1 dia útil com uma proposta personalizada para o seu parque de instrumentos.
            </p>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {orcamentoBullets.map(b => <CheckItem key={b} text={b} />)}
          </ul>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Prefere ligar?</p>
            <a href="tel:+554734383175" style={{ fontSize: 18, fontWeight: 700, color: "#fff", textDecoration: "none" }}>(47) 3438-3175</a>
          </div>
        </div>

        {/* Form card */}
        <div style={s.darkCard()}>
          <div style={s.redBar()} />
          <div style={{ padding: 36 }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Texto fields */}
              {[
                { key: "name",    label: "Nome",    req: true, ph: "Seu nome completo",   max: 100, auto: "name" },
                { key: "company", label: "Empresa", req: false, ph: "Nome da empresa",    max: 200, auto: "organization" },
                { key: "role",    label: "Cargo",   req: false, ph: "Seu cargo",          max: 100, auto: "organization-title" },
              ].map(({ key, label, req, ph, max, auto }) => (
                <div key={key}>
                  <label style={s.label()}>{label}{req && <span style={{ color: R }}> *</span>}</label>
                  <input
                    value={(form as any)[key]} onChange={e => set(key, e.target.value)}
                    placeholder={ph} maxLength={max} autoComplete={auto} disabled={sending}
                    style={s.input()} {...fp}
                  />
                </div>
              ))}

              {/* Phone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={s.label()}>Telefone <span style={{ color: R }}>*</span></label>
                  <input value={form.phone} onChange={formatPhone} placeholder="(47) 99999-9999"
                    maxLength={15} autoComplete="tel" inputMode="numeric" disabled={sending}
                    style={s.input()} {...fp} />
                </div>
                <div>
                  <label style={s.label()}>E-mail <span style={{ color: R }}>*</span></label>
                  <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                    placeholder="seu@email.com" maxLength={254} autoComplete="email" disabled={sending}
                    style={s.input()} {...fp} />
                </div>
              </div>

              {/* Canal preferido */}
              <div>
                <label style={s.label()}>Canal Preferido de Atendimento</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CHANNELS.map(({ id, label, Icon }) => {
                    const sel = form.channels.includes(id);
                    return (
                      <button key={id} type="button" onClick={() => toggleCh(id)} disabled={sending} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "11px 14px",
                        background: sel ? "rgba(242,32,32,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1.5px solid ${sel ? R : "rgba(255,255,255,0.10)"}`,
                        borderRadius: 8, color: sel ? R : "rgba(255,255,255,0.5)",
                        fontSize: 13, cursor: sending ? "not-allowed" : "pointer",
                        textAlign: "left", fontFamily: "inherit", transition: "all 0.18s",
                      }}>
                        <Icon size={15} style={{ flexShrink: 0 }} /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label style={s.label()}>Como Podemos Ajudar?</label>
                <textarea
                  value={form.message} onChange={e => set("message", e.target.value)} disabled={sending}
                  placeholder="Ex: Preciso de 3 termômetros digitais para processo de injeção plástica, faixa -10 a 150ºC..."
                  maxLength={2000} rows={4}
                  style={{ ...s.input(), height: "auto", minHeight: 100, padding: "12px 14px", resize: "none" }}
                  {...fp}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button type="submit" disabled={sending} style={{ ...s.btnPrimary(sending), textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 28px" }}>
                  {sending
                    ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> Enviando...</>
                    : <>Falar com Especialista <ArrowRight style={{ width: 16, height: 16 }} /></>}
                </button>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                  <Lock style={{ width: 12, height: 12 }} /> Seus dados estão seguros
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.28); }
      `}</style>
    </section>
  );
}

function CtaBanner({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section style={{ background: R, padding: "44px 24px" }}>
      <div style={{ ...s.wrap(1200), display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 32, alignItems: "center" }}>
        <div>
          <h2 style={{ ...RAJ, fontSize: "clamp(20px,3vw,32px)", color: "#fff", margin: "0 0 6px" }}>
            Seus instrumentos estão conformes?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
            Solicite uma avaliação técnica gratuita. Nossa equipe responde em até 2 horas.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          <button onClick={onCtaClick} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", color: R, fontWeight: 700, fontSize: 13,
            padding: "12px 26px", borderRadius: 8, border: "none", cursor: "pointer",
            whiteSpace: "nowrap", letterSpacing: "0.04em",
          }}>
            Garantir Conformidade Agora <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 4 }}>
            <Lock style={{ width: 11, height: 11 }} /> Seus dados estão seguros
          </span>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={s.section("#FAFAFA", { borderBottom: "1px solid #EBEBEB" })}>
      <div style={{ ...s.wrap(1200), display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 64 }}>
        <div>
          <RedTag text="FAQ" />
          <h2 style={s.h2("#111", "clamp(20px,2.8vw,30px)")}>Perguntas Frequentes</h2>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Tire suas dúvidas sobre nosso processo de calibração e certificação.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #EBEBEB", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: open === i ? R : "#111" }}>{faq.q}</span>
                <ChevronDown style={{
                  width: 15, height: 15, color: open === i ? R : "#AAA", flexShrink: 0,
                  transform: open === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s",
                }} />
              </button>
              {open === i && (
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

function PageFooter() {
  return (
    <footer style={{ background: "#0D0D0D", color: "#fff", padding: "64px 24px 32px" }}>
      <div style={s.wrap(1200)}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, marginBottom: 48 }}>

          <p style={{ color: "#A0A0A0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios próprios e
            metodologia certificada pelo INMETRO. Um dos laboratórios é geral e o outro é físico-químico, bem como um
            laboratório móvel que vai até a sua empresa.
          </p>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Serviços</h3>
            <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {services.map(s => (
                <li key={s}><a href="/#servicos" style={{ color: "#A0A0A0", fontSize: 13, textDecoration: "none" }}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Contato</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {contactItems.map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Icon style={{ width: 18, height: 18, color: R, marginTop: 1, flexShrink: 0 }} />
                  <p style={{ color: "#A0A0A0", fontSize: 13, whiteSpace: "pre-line", margin: 0, lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src="/ceo/Leonardo Rosa Junior.jpg" alt="Leonardo Rosa Junior — CEO e Fundador da Tecnoiso"
              style={{ width: 112, height: 112, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: `2px solid ${R}`, marginBottom: 12 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Leonardo Rosa Junior</p>
            <p style={{ color: R, fontSize: 12, marginTop: 4, marginBottom: 16 }}>CEO & Fundador</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map(({ href, icon: Icon, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{
                  width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center",
                  justifyContent: "center", background: "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none",
                }}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid #333", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ color: "#555", fontSize: 12, margin: 0 }}>
            © 2026 TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA. | CNPJ: 17.459.428/0001-08
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Política de Qualidade","Termos de Uso"].map(label => (
              <a key={label} href="#" style={{ color: "#555", fontSize: 12, textDecoration: "none" }}>{label}</a>
            ))}
            <DeveloperSignature />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════ */
export default function CalibracaoPage() {
  const formRef = useRef<HTMLElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <AlertBanner      onCtaClick={scrollToForm} />
      <HeroSection      onCtaClick={scrollToForm} />
      <RiscosSection />
      <DiferenciaisSection />
      <GrandezasSection onCtaClick={scrollToForm} />
      <FormSection      formRef={formRef as React.RefObject<HTMLElement>} />
      <CtaBanner        onCtaClick={scrollToForm} />
      <FaqSection />
      <PageFooter />
    </main>
  );
}