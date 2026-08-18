"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, MessageCircle,
  Lock, ChevronDown, MapPin, Phone, Mail, Clock,
  Wrench, Shield, Zap, TrendingUp, Settings, BarChart3,
  Timer, Calendar, FileText, Instagram, Linkedin,
  ClipboardList, Activity,
} from "lucide-react";
import Link from "next/link";
import DeveloperSignature from "@/components/DeveloperSignature";
import { getUtmParams } from "@/lib/utm";
/* ─── Constants ─────────────────────────────────────────────────────── */
const WA_NUM          = "4734401719";
const WA_BASE         = `https://wa.me/${WA_NUM}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20falar%20sobre%20manutenção%20industrial`;

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
const frentes = [
  {
    icon: Calendar,
    subtitle: "Frente 01",
    title: "Manutenção Preventiva",
    desc: "Realizada periodicamente com base em cronograma técnico para evitar falhas antes que elas aconteçam, reduzindo paradas não programadas e aumentando a vida útil dos equipamentos.",
    items: [
      "Plano programado por criticidade do equipamento",
      "Inspeção visual, limpeza técnica e ajustes finos",
      "Substituição preditiva de componentes desgastados",
      "Relatórios técnicos e histórico de intervenções",
    ],
  },
  {
    icon: Wrench,
    subtitle: "Frente 02",
    title: "Manutenção Corretiva",
    desc: "Atendimento ágil após a ocorrência de uma falha, com diagnóstico preciso e reparo rápido para minimizar o impacto operacional e retornar o equipamento à condição metrológica.",
    items: [
      "Atendimento ágil para minimizar paradas operacionais",
      "Diagnóstico técnico da causa raiz da falha",
      "Reparo, realinhamento e validação metrológica",
      "Recomendações para evitar recorrência",
    ],
  },
  {
    icon: Activity,
    subtitle: "Frente 03",
    title: "Manutenção Preditiva",
    desc: "Baseada no monitoramento contínuo das condições do equipamento para antecipar falhas antes que causem paradas, utilizando análise de dados técnicos e histórico metrológico.",
    items: [
      "Análise de tendência de desvios e incertezas",
      "Indicadores de saúde por instrumento",
      "Antecipação de falhas antes do impacto produtivo",
      "Decisões baseadas em dados rastreáveis",
    ],
  },
];

const beneficios = [
  { icon: TrendingUp,    title: "Redução de paradas",    desc: "Menos interrupções não programadas na linha de produção." },
  { icon: Timer,         title: "Vida útil estendida",   desc: "Equipamentos operando dentro da faixa metrológica por mais tempo." },
  { icon: Shield,        title: "Conformidade contínua", desc: "Atendimento permanente aos requisitos da ISO 17025." },
  { icon: BarChart3,     title: "Decisões com dados",    desc: "Indicadores e histórico técnico por instrumento." },
  { icon: FileText,      title: "Rastreabilidade total", desc: "Documentação técnica auditável a cada intervenção." },
  { icon: ClipboardList, title: "Processo estruturado",  desc: "Plano integrado entre manutenção e calibração." },
];

const instrumentos = [
  { grandeza: "Pressão",        lista: ["Manômetros", "Transmissores", "Pressostatos"] },
  { grandeza: "Temperatura",    lista: ["Termopares", "PT-100", "Termômetros digitais"] },
  { grandeza: "Massa",          lista: ["Balanças industriais", "Células de carga", "Pesos padrão"] },
  { grandeza: "Dimensional",    lista: ["Paquímetros", "Micrômetros", "Relógios comparadores"] },
  { grandeza: "Elétrica",       lista: ["Multímetros", "Calibradores", "Fontes de tensão"] },
  { grandeza: "Volume / Vazão", lista: ["Flowmeters", "Pipetas", "Medidores de vazão"] },
];

const faqs = [
  { q: "A manutenção é realizada no local da empresa?",   a: "Sim. Contamos com equipe técnica mobile e laboratório móvel que vai até sua planta, minimizando o tempo de parada dos equipamentos." },
  { q: "Vocês emitem relatório técnico após cada visita?", a: "Sempre. Cada intervenção gera relatório com diagnóstico, serviços realizados, histórico e recomendações. Documentação auditável para ISO 9001 e IATF." },
  { q: "Posso contratar os três tipos de manutenção?",    a: "Sim. Oferecemos planos combinados de manutenção preventiva, corretiva e preditiva, integrados com calibração e gestão metrológica." },
  { q: "Como funciona o prazo de atendimento?",           a: "Para manutenção corretiva, respondemos em até 4 horas. Para preventiva e preditiva, elaboramos cronograma personalizado conforme o seu parque de instrumentos." },
  { q: "A manutenção está integrada com a calibração?",   a: "Sim. Nosso processo é integrado: toda manutenção é seguida de verificação metrológica e, quando necessário, calibração rastreável ao INMETRO." },
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
function HeroSection({ onCtaClick }: { onCtaClick: () => void }) {
  const bullets = [
    "Preventiva, corretiva e preditiva sob um único contrato",
    "Equipe técnica com expertise em metrologia industrial",
    "Redução comprovada de paradas não programadas",
    "Histórico técnico documentado por equipamento",
  ];
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
        background: "linear-gradient(135deg, rgba(10,10,10,0.82) 50%, rgba(242,34,32,0.08) 100%)",
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
        <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.12em", margin: "0 0 14px" }}>
          MANUTENÇÃO INDUSTRIAL
        </p>
        <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
          Manutenção que{" "}
          <span style={{ color: "#F22020", fontStyle: "italic" }}>prolonga a vida útil</span>{" "}
          e protege a precisão dos seus instrumentos
        </h1>
        <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 480 }}>
          A TECNOISO atua nas três frentes da manutenção — preventiva, corretiva e preditiva — para reduzir paradas,
          aumentar a vida útil dos equipamentos e garantir a qualidade contínua dos seus processos.
        </p>
        <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map(item => (
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
            Solicitar Plano de Manutenção
          </button>
          <button
            onClick={() => {
              document.getElementById("frentes")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", color: "#E0E0E0",
              fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8,
              cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)",
            }}
          >
            Conhecer as 3 frentes
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Frentes (3 cards side by side) ────────────────────────────────── */
function FrentesSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section id="frentes" style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            AS TRÊS FRENTES
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,36px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
            Um processo de manutenção{" "}
            <span style={{ color: "#F22020" }}>bem estruturado</span>{" "}
            reduz paradas e aumenta a vida útil
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            A TECNOISO trabalha integrada às três frentes de manutenção, garantindo a qualidade contínua
            dos seus processos e a confiabilidade dos seus instrumentos de medição.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {frentes.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.subtitle} style={{
                background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 14,
                overflow: "hidden", display: "flex", flexDirection: "column",
              }}>
                <div style={{ height: 3, background: "#F22020" }} />
                <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 12px" }}>
                    {f.subtitle}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: "#FFF0F0", border: "1px solid #FCCFCF",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon style={{ width: 20, height: 20, color: "#F22020" }} />
                    </div>
                    <h3 style={{ ...raj, fontSize: 20, color: "#111", margin: 0, lineHeight: 1.2 }}>{f.title}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>{f.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    {f.items.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <CheckCircle2 style={{ width: 14, height: 14, color: "#F22020", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: "#555", lineHeight: 1.45 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onCtaClick}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      marginTop: 20, background: "none", border: "none",
                      color: "#F22020", fontWeight: 700, fontSize: 13,
                      cursor: "pointer", padding: 0, letterSpacing: "0.02em",
                    }}
                  >
                    Solicitar esta frente <ArrowRight style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Benefícios ─────────────────────────────────────────────────────── */
function BeneficiosSection() {
  return (
    <section style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            BENEFÍCIOS
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,36px)", color: "#111", margin: 0, lineHeight: 1.1 }}>
            Resultados que sua planta sente{" "}
            <span style={{ color: "#F22020" }}>no primeiro ciclo</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {beneficios.map(b => {
            const Icon = b.icon;
            return (
              <div key={b.title} style={{
                background: "#FAFAFA", border: "1.5px solid #EBEBEB", borderRadius: 12, padding: "22px",
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "#FFF0F0", border: "1px solid #FCCFCF",
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                }}>
                  <Icon style={{ width: 18, height: 18, color: "#F22020" }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>{b.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Instrumentos ───────────────────────────────────────────────────── */
function InstrumentosSection() {
  const icons: Record<string, string> = {
    "Pressão": "⊙", "Temperatura": "⊕", "Massa": "⊗",
    "Dimensional": "⊞", "Elétrica": "⊡", "Volume / Vazão": "⊘",
  };
  return (
    <section style={{ background: "#F5F5F5", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>
            INSTRUMENTOS ATENDIDOS
          </p>
          <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,34px)", color: "#111", margin: 0, lineHeight: 1.1 }}>
            Manutenção especializada para{" "}
            <span style={{ color: "#F22020" }}>cada grandeza</span>
          </h2>
          <p style={{ color: "#777", fontSize: 14, margin: "10px auto 0", maxWidth: 520, lineHeight: 1.6 }}>
            Atuamos em uma ampla gama de instrumentos críticos da sua operação.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {instrumentos.map(inst => (
            <div key={inst.grandeza} style={{
              background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "18px 20px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#F22020", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 16 }}>{icons[inst.grandeza]}</span> {inst.grandeza}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {inst.lista.map(item => (
                  <p key={item} style={{ fontSize: 13, color: "#555", margin: 0, paddingLeft: 4 }}>• {item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Channel options ────────────────────────────────────────────────── */
const CHANNEL_OPTIONS = [
  { id: "whatsapp_text",  label: "WhatsApp mensagem", icon: MessageCircle },
  { id: "whatsapp_voice", label: "WhatsApp voz",      icon: Phone },
  { id: "email",          label: "E-mail",            icon: Mail },
  { id: "phone_call",     label: "Ligação telefônica", icon: Phone },
] as const;

/* ─── Maintenance type options ───────────────────────────────────────── */
const MAINTENANCE_OPTIONS = [
  { value: "",            label: "Selecione o tipo de manutenção" },
  { value: "preventiva",  label: "Manutenção Preventiva" },
  { value: "corretiva",   label: "Manutenção Corretiva" },
  { value: "preditiva",   label: "Manutenção Preditiva" },
] as const;

/* ─── Orçamento Form ─────────────────────────────────────────────────── */
function OrcamentoSection({ formRef }: { formRef: React.RefObject<HTMLElement> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "", company: "", role: "", phone: "", email: "",
    message: "", maintenanceType: "",
  });

  const FOCUS_COLOR = "#F22020";

  const toggleChannel = (id: string) =>
    setSelectedChannels(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 11);
    let m = "";
    if (d.length <= 2)       m = `(${d}`;
    else if (d.length <= 6)  m = `(${d.slice(0,2)}) ${d.slice(2)}`;
    else if (d.length <= 10) m = `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
    else                     m = `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`;
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

    const utmPayload = getUtmParams();

    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:            formData.name,
          company:         formData.company,
          role:            formData.role,
          email:           formData.email,
          phone:           formData.phone,
          channels:        selectedChannels.join(", "),
          message:         formData.message,
          maintenanceType: formData.maintenanceType,
          origem:          "manutencao",
          utm_source:      utmPayload.utm_source,
          utm_medium:      utmPayload.utm_medium,
          utm_campaign:    utmPayload.utm_campaign,
          utm_term:        utmPayload.utm_term,
          utm_content:     utmPayload.utm_content,
        }),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "/obrigado";
      } else {
        alert(data.error ?? "Erro ao enviar. Tente novamente.");
        setIsSubmitting(false);
      }
    } catch {
      alert("Erro de conexão. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const bullets = [
    "Atendimento técnico especializado",
    "Plano integrado de manutenção e calibração",
    "Proposta personalizada para sua demanda",
    "Atendimento in-loco sem paradas desnecessárias",
  ];

  return (
    <section ref={formRef} id="orcamento" style={{
      background: "#0D0D0D", padding: "72px 24px", scrollMarginTop: 80,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 64, alignItems: "start",
      }}>
        {/* Left: texto + bullets + telefone */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.12em", margin: "0 0 12px" }}>
              ORÇAMENTO GRATUITO
            </p>
            <h2 style={{ ...raj, fontSize: "clamp(24px,3vw,38px)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
              Monte seu plano de manutenção<br />
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

        {/* Right: form card */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1.5px solid rgba(255,255,255,0.08)",
          borderRadius: 16, overflow: "hidden",
        }}>
          <div style={{ height: 3, background: "#F22020" }} />
          <div style={{ padding: "36px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Nome + Empresa */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelBase}>Nome <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input
                    name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Seu nome completo"
                    style={inputBase} {...fp}
                  />
                </div>
                <div>
                  <label style={labelBase}>Empresa</label>
                  <input
                    name="company"
                    value={formData.company} onChange={handleChange}
                    placeholder="Nome da empresa"
                    style={inputBase} {...fp}
                  />
                </div>
              </div>

              {/* Cargo */}
              <div>
                <label style={labelBase}>Cargo</label>
                <input
                  name="role"
                  value={formData.role} onChange={handleChange}
                  placeholder="Seu cargo"
                  style={inputBase} {...fp}
                />
              </div>

              {/* Telefone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelBase}>Telefone <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input
                    name="phone" required
                    value={formData.phone} onChange={handlePhoneChange}
                    placeholder="(47) 99999-9999"
                    style={inputBase} {...fp}
                  />
                </div>
                <div>
                  <label style={labelBase}>E-mail <span style={{ color: FOCUS_COLOR }}>*</span></label>
                  <input
                    name="email" type="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="seu@email.com"
                    style={inputBase} {...fp}
                  />
                </div>
              </div>

              {/* Tipo de Manutenção */}
              <div>
                <label style={labelBase}>Tipo de Manutenção</label>
                <div style={{ position: "relative" }}>
                  <select
                    name="maintenanceType"
                    value={formData.maintenanceType}
                    onChange={handleChange}
                    style={{
                      ...inputBase,
                      appearance: "none",
                      WebkitAppearance: "none",
                      cursor: "pointer",
                      paddingRight: 40,
                      color: formData.maintenanceType ? "#fff" : "#555",
                    }}
                    {...fp}
                  >
                    {MAINTENANCE_OPTIONS.map(opt => (
                      <option
                        key={opt.value} value={opt.value}
                        style={{ background: "#1a1a1a", color: opt.value ? "#fff" : "#777" }}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: "absolute", right: 14, top: "50%",
                    transform: "translateY(-50%)",
                    width: 15, height: 15, color: "#555",
                    pointerEvents: "none",
                  }} />
                </div>
              </div>

              {/* Canal preferido */}
              <div>
                <label style={labelBase}>Canal preferido de atendimento</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {CHANNEL_OPTIONS.map(({ id, label, icon: Icon }) => {
                    const active = selectedChannels.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleChannel(id)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "11px 14px", borderRadius: 8, cursor: "pointer",
                          fontSize: 13, fontWeight: 500, textAlign: "left",
                          background: active ? "rgba(242,34,32,0.12)" : "rgba(255,255,255,0.04)",
                          border: `1.5px solid ${active ? "#F22020" : "rgba(255,255,255,0.1)"}`,
                          color: active ? "#fff" : "#888",
                          transition: "all 0.15s",
                        }}
                      >
                        <Icon style={{ width: 15, height: 15, color: active ? "#F22020" : "#555", flexShrink: 0 }} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label style={labelBase}>Descreva os equipamentos e a criticidade da operação</label>
                <textarea
                  name="message"
                  value={formData.message} onChange={handleChange}
                  placeholder="Ex: 12 manômetros de pressão, 4 balanças industriais, linha de produção contínua..."
                  style={{ ...inputBase, height: "auto", minHeight: 100, padding: "12px 14px", resize: "none" }}
                  {...fp}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: isSubmitting ? "#a01010" : FOCUS_COLOR,
                    color: "#fff", fontWeight: 700, fontSize: 13,
                    padding: "13px 28px", borderRadius: 8, border: "none",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    opacity: isSubmitting ? 0.75 : 1,
                  }}
                >
                  {isSubmitting
                    ? "Enviando..."
                    : <><span>Quero meu Plano de Manutenção</span> <ArrowRight style={{ width: 16, height: 16 }} /></>
                  }
                </button>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                  <Lock style={{ width: 12, height: 12 }} /> Seus dados estão seguros
                </span>
              </div>

            </form>
          </div>
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
export default function ManutencaoPage() {
  const formRef = useRef<HTMLElement>(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <HeroSection       onCtaClick={scrollToForm} />
      <FrentesSection    onCtaClick={scrollToForm} />
      <BeneficiosSection />
      <InstrumentosSection />
      <OrcamentoSection  formRef={formRef as React.RefObject<HTMLElement>} />
      <PageFooter />
    </main>
  );
}