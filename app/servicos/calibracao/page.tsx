"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2,
  Lock, MapPin, Phone, Mail, Clock,
  MessageCircle, Mic, Loader2,
  ChevronRight, ChevronDown,
  Gauge, Thermometer, Ruler, Weight, Droplets, Wrench, Settings,
  XCircle, BadgeAlert, Ban, AlertCircle, RefreshCcw, Unlink, Users,
  Award, Eye, TrendingUp, Zap,
  Instagram, Linkedin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DeveloperSignature from "@/components/DeveloperSignature";

/* ─── Constants ─────────────────────────────────────────────────────── */
const WA_NUM          = "4734401719";
const WA_BASE         = `https://wa.me/${WA_NUM}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista`;

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
  "Certificados conforme ABNT NBR ISO/IEC 17025:2017",
  "Rastreabilidade CGCRE/INMETRO garantida",
  "Atendimento in-loco sem paradas desnecessárias",
  "Gestão completa do parque de instrumentos",
];

const grandezas = [
  {
    id: "pressao",
    icon: Gauge,
    label: "Pressão",
    count: 4,
    desc: "Calibração precisa de instrumentos de pressão com rastreabilidade INMETRO, garantindo leituras confiáveis para processos industriais críticos.",
    instrumentos: ["Manômetros", "Transmissores de pressão", "Pressostatos", "Manômetros padrão"],
  },
  {
    id: "temperatura",
    icon: Thermometer,
    label: "Temperatura",
    count: 4,
    desc: "Controle térmico técnico com certificação completa, essencial para indústrias alimentícias, farmacêuticas e processos de tratamento térmico.",
    instrumentos: ["Termômetros digitais", "Infravermelho", "Termopares", "Termo-higrômetros"],
  },
  {
    id: "dimensional",
    icon: Ruler,
    label: "Dimensional",
    count: 4,
    desc: "Precisão dimensional certificada para controle de qualidade em usinagem, estamparia e processos de fabricação de alta exigência.",
    instrumentos: ["Paquímetros", "Microscópios", "Relógios comparadores", "Durômetros"],
  },
  {
    id: "massa",
    icon: Weight,
    label: "Massa",
    count: 3,
    desc: "Calibração de instrumentos de pesagem em conformidade com as normas vigentes, necessárias para dosagem, formulação e controle de produção.",
    instrumentos: ["Balanças industrial", "Balanças analíticas", "Pesos padrão"],
  },
  {
    id: "vazao",
    icon: Droplets,
    label: "Vazão",
    count: 2,
    desc: "Garantia de precisão volumétrica e mássica precisa para processos de tratamento de água, químico e petroquímico.",
    instrumentos: ["Medidores de dez", "Rotâmetros"],
  },
  {
    id: "torque",
    icon: Wrench,
    label: "Torque",
    count: 2,
    desc: "Verificação e calibração de ferramentas de torque para montagens críticas nas indústrias automotiva, aeronáutica e de energia.",
    instrumentos: ["Torquímetros", "Chaves de torque"],
  },
  {
    id: "diversos",
    icon: Settings,
    label: "Diversos",
    count: 3,
    desc: "Cobertura ampla para instrumentos elétricos, de rotação e laboratoriais, centralizando toda a metrologia em um único parceiro.",
    instrumentos: ["Multímetros", "Tacômetros", "Equipamentos de laboratório"],
  },
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
  { icon: Eye,        title: "Transparência total",                   desc: "Certificados dos padrões disponíveis para consulta a qualquer momento." },
  { icon: Settings,   title: "Sistema de gestão de qualidade ativo",  desc: "Controlamos vencimentos, histórico e alertas automáticos para seu parque de instrumentos." },
  { icon: TrendingUp, title: "Melhoria contínua",                     desc: "Acompanhamento evolutivo das métricas e desempenho metrológico da sua operação." },
  { icon: Users,      title: "Equipe técnica",                        desc: "Profissionais especializados com experiência em múltiplos segmentos industriais." },
  { icon: Zap,        title: "Agilidade e imparcialidade",            desc: "Processos ágeis e laudos imparciais para decisões rápidas e seguras." },
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

const socialLinks = [
  { href: "https://www.instagram.com/leorosajr/",                     icon: Instagram, label: "Instagram" },
  { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin,  label: "LinkedIn"  },
];

const services = ["Calibração", "Certificação", "Manutenção", "Treinamentos"];

/* ─── Canal preferido ────────────────────────────────────────────────── */
type Channel = "whatsapp_text" | "whatsapp_voice" | "email" | "phone_call";

const CHANNELS: { id: Channel; label: string; Icon: React.ElementType }[] = [
  { id: "whatsapp_text",  label: "WhatsApp mensagem", Icon: MessageCircle },
  { id: "whatsapp_voice", label: "WhatsApp voz",      Icon: Mic           },
  { id: "email",          label: "E-mail",             Icon: Mail          },
  { id: "phone_call",     label: "Ligação telefônica", Icon: Phone         },
];

/* ═══════════════════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════════════════ */

/* ─── Hero ───────────────────────────────────────────────────────────── */
function HeroSection({
  onCtaClick,
  onGrandezasClick,
}: {
  onCtaClick: () => void;
  onGrandezasClick: () => void;
}) {
  return (
    <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
      {/* BG image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/banner/banner1.png')",
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
      }} />
      {/* Overlay */}
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
          display: "inline-block", background: RED,
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 4,
          marginBottom: 18, textTransform: "uppercase",
        }}>
          Calibração Industrial
        </div>

        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,52px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Conformidade Metrológica{" "}
          <span style={{ color: RED, fontStyle: "italic" }}>Certificada e Rastreável</span>
        </h1>

        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 520 }}>
          Calibração industrial rastreável ao INMETRO, com controle de erros,
          incertezas e gestão completa do seu parque de instrumentos.
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
              letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "inherit",
            }}
          >
            Solicitar Diagnóstico <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
          <button
            onClick={onGrandezasClick}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#E0E0E0",
              fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
              cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)",
              fontFamily: "inherit",
            }}
          >
            Ver grandezas atendidas
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Riscos ─────────────────────────────────────────────────────────── */
function RiscosSection() {
  return (
    <section style={{ background: "#FDF5F5", padding: "64px 24px", borderBottom: "1px solid #EBEBEB" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
            RISCOS OPERACIONAIS
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Os riscos de um controle metrológico{" "}
            <span style={{ color: RED }}>ineficiente</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
            A maioria das empresas só descobre falhas quando o prejuízo já aconteceu.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {riscos.map(({ icon: Icon, label }) => (
            <div key={label} style={{
              background: "#fff", border: "1.5px solid #F5DADA", borderRadius: 12,
              padding: "18px 20px", display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "#FFF0F0", border: "1px solid #FCCFCF",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ width: 18, height: 18, color: RED }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Diferenciais ───────────────────────────────────────────────────── */
function DiferenciaisSection() {
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px", borderBottom: "1px solid #EBEBEB" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
            NOSSOS DIFERENCIAIS
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Mais que calibração.{" "}
            <span style={{ color: RED }}>Gestão completa da conformidade.</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
            A TECNOISO apresenta o comportamento metrológico de seus equipamentos comparando com
            padrões rastreáveis, identificando erros e incertezas e permitindo o controle contínuo
            do seu processo.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {diferenciais.map(d => {
            const Icon = d.icon;
            return (
              <div key={d.title} style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12,
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
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{d.title}</h3>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Grandezas ──────────────────────────────────────────────────────── */
function GrandezasSection({
  grandezasRef,
  onCtaClick,
}: {
  grandezasRef: React.RefObject<HTMLElement>;
  onCtaClick: () => void;
}) {
  const [active, setActive] = useState("pressao");
  const g = grandezas.find(x => x.id === active)!;
  const GIcon = g.icon;

  return (
    <section
      ref={grandezasRef}
      id="grandezas"
      style={{ background: "#0D0D0D", padding: "64px 24px", scrollMarginTop: 80, position: "relative", overflow: "hidden" }}
    >
      {/* Subtle glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,34,32,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>
            SOLUÇÕES
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,38px)", color: "#fff", margin: "0 0 8px", lineHeight: 1.1 }}>
            Calibração Industrial Completa
          </h2>
          <p style={{ color: "#666", fontSize: 13, margin: 0 }}>
            Selecione uma grandeza para conhecer os instrumentos atendidos
          </p>
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
                  border: `1.5px solid ${on ? RED : "rgba(255,255,255,0.08)"}`,
                  background: on ? RED : "rgba(255,255,255,0.04)",
                  color: on ? "#fff" : "#999",
                  fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s", fontFamily: "inherit",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Icon style={{ width: 15, height: 15 }} /> {label}
                  </span>
                  {on && <ChevronRight style={{ width: 14, height: 14, opacity: 0.8 }} />}
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: 14, overflow: "hidden",
          }}>
            <div style={{ height: 3, background: RED }} />
            <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: "rgba(242,34,32,0.15)", border: "1.5px solid rgba(242,34,32,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <GIcon style={{ width: 24, height: 24, color: RED }} />
                  </div>
                  <div>
                    <h3 style={{ ...raj, fontSize: 26, color: "#fff", margin: 0 }}>{g.label}</h3>
                    <span style={{ fontSize: 12, color: RED, fontWeight: 600 }}>{g.count} tipos de instrumento</span>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#A0A0A0", lineHeight: 1.7, margin: "0 0 24px" }}>{g.desc}</p>
                <button
                  onClick={onCtaClick}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: RED, color: "#fff", fontWeight: 700, fontSize: 12,
                    padding: "11px 22px", borderRadius: 8, border: "none", cursor: "pointer",
                    letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "inherit",
                  }}
                >
                  SOLICITAR CALIBRAÇÃO <ChevronRight style={{ width: 14, height: 14 }} />
                </button>
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", margin: "0 0 12px" }}>
                  INSTRUMENTOS ATENDIDOS
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.instrumentos.map(inst => (
                    <div key={inst} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1.5px solid rgba(255,255,255,0.10)",
                      borderRadius: 9,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: RED, flexShrink: 0 }} />
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

/* ─── FAQ ────────────────────────────────────────────────────────────── */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: "#FAFAFA", padding: "64px 24px", borderBottom: "1px solid #EBEBEB" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 64 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: "0.1em", margin: "0 0 10px" }}>FAQ</p>
          <h2 style={{ ...raj, fontSize: "clamp(20px,2.8vw,30px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Perguntas Frequentes
          </h2>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Tire suas dúvidas sobre nosso processo de calibração e certificação.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #EBEBEB", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "15px 20px", background: "none", border: "none", cursor: "pointer",
                textAlign: "left", gap: 16, fontFamily: "inherit",
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: open === i ? RED : "#111" }}>{faq.q}</span>
                <ChevronDown style={{
                  width: 15, height: 15, color: open === i ? RED : "#AAA", flexShrink: 0,
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

/* ─── Form Section ───────────────────────────────────────────────────── */
function FormSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name:     "",
    company:  "",
    role:     "",
    phone:    "",
    email:    "",
    service:  "Calibração de instrumentos",
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
      service:  formData.service,
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
        body:    JSON.stringify({ ...t, ...utms, origem: "calibracao" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
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
            Solicite seu <span style={{ color: RED }}>Diagnóstico</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Preencha o formulário e nossa equipe técnica entrará em contato em até 1 dia útil
            com uma proposta personalizada para o seu parque de instrumentos.
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

              {/* Tipo de serviço */}
              <div>
                <label style={labelBase}>Tipo de Serviço</label>
                <select
                  value={formData.service}
                  onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                  disabled={isSubmitting}
                  style={{ ...inputBase, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
                  {...fp}
                >
                  {[
                    "Calibração de instrumentos",
                    "Gestão do parque de instrumentos",
                    "Calibração + Certificação",
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
                <label style={labelBase}>Como Podemos Ajudar?</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Ex: Preciso de 3 termômetros digitais para processo de injeção plástica, faixa -10 a 150ºC..."
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
                      Falar com Especialista
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
  const formRef      = useRef<HTMLElement>(null);
  const grandezasRef = useRef<HTMLElement>(null);

  const scrollToForm      = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToGrandezas = () => grandezasRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection      onCtaClick={scrollToForm} onGrandezasClick={scrollToGrandezas} />
      <RiscosSection />
      <DiferenciaisSection />
      <GrandezasSection grandezasRef={grandezasRef as React.RefObject<HTMLElement>} onCtaClick={scrollToForm} />
      <FaqSection />
      <FormSection      formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}