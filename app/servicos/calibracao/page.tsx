"use client";

import { useState } from "react";
import {
  CheckCircle2, Gauge, Thermometer, Ruler, Weight, Droplets, Wrench,
  ShieldCheck, Award, ChevronDown, ChevronRight, Settings, Lock,
  ArrowRight, AlertTriangle, MessageCircle, XCircle, AlertCircle,
  Ban, RefreshCcw, Unlink, Users, BadgeAlert, TrendingUp, Eye, Zap,
  MapPin, Phone, Mail, Clock, ArrowLeft,
} from "lucide-react";
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   LINKS
───────────────────────────────────────────────────────────── */
const WA_NUM          = "4734401719";
const WA_BASE         = `https://wa.me/${WA_NUM}`;
const WA_ESPECIALISTA = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20especialista`;
const WA_DIAGNOSTICO  = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20solicitar%20um%20diagnóstico%20metrológico`;
const WA_CALIBRACAO   = `${WA_BASE}?text=Olá%2C%20quero%20solicitar%20calibração`;
const WA_CONFORMIDADE = `${WA_BASE}?text=Quero%20garantir%20conformidade%20dos%20meus%20instrumentos`;
const WA_AVALIACAO    = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20solicitar%20uma%20avaliação`;

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const grandezas = [
  {
    id: "pressao", icon: Gauge, label: "Pressão", count: 4,
    desc: "Calibração precisa de instrumentos de pressão com rastreabilidade INMETRO, garantindo leituras confiáveis para processos industriais críticos.",
    instrumentos: ["Manômetros", "Transmissores de pressão", "Pressostatos", "Manômetros padrão"],
  },
  {
    id: "temperatura", icon: Thermometer, label: "Temperatura", count: 4,
    desc: "Controle térmico técnico com certificação completa, essencial para indústrias alimentícias, farmacêuticas e processos de tratamento térmico.",
    instrumentos: ["Termômetros digitais", "Infravermelho", "Termopares", "Termo-higrômetros"],
  },
  {
    id: "dimensional", icon: Ruler, label: "Dimensional", count: 4,
    desc: "Precisão dimensional certificada para controle de qualidade em usinagem, estamparia e processos de fabricação de alta exigência.",
    instrumentos: ["Paquímetros", "Microscópios", "Relógios comparadores", "Durômetros"],
  },
  {
    id: "massa", icon: Weight, label: "Massa", count: 3,
    desc: "Calibração de instrumentos de pesagem em conformidade com as normas vigentes, necessárias para dosagem, formulação e controle de produção.",
    instrumentos: ["Balanças industrial", "Balanças analíticas", "Pesos padrão"],
  },
  {
    id: "vazao", icon: Droplets, label: "Vazão", count: 2,
    desc: "Garantia de precisão volumétrica e mássica precisa para processos de tratamento de água, químico e petroquímico.",
    instrumentos: ["Medidores de dez", "Rotâmetros"],
  },
  {
    id: "torque", icon: Wrench, label: "Torque", count: 2,
    desc: "Verificação e calibração de ferramentas de torque para montagens críticas nas indústrias automotiva, aeronáutica e de energia.",
    instrumentos: ["Torquímetros", "Chaves de torque"],
  },
  {
    id: "diversos", icon: Settings, label: "Diversos", count: 3,
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
  { icon: Award,      title: "Certificados claros e completos",         desc: "Emitidos conforme ABNT NBR ISO/IEC 17025:2017, aceitos por todos os organismos certificadores." },
  { icon: Eye,        title: "Transparência total",                      desc: "Certificados dos padrões disponíveis para consulta a qualquer momento." },
  { icon: Settings,   title: "Sistema de gestão de qualidade ativo",     desc: "Controlamos vencimentos, histórico e alertas automáticos para seu parque de instrumentos." },
  { icon: TrendingUp, title: "Melhoria contínua",                        desc: "Acompanhamento evolutivo das métricas e desempenho metrológico da sua operação." },
  { icon: Users,      title: "Equipe técnica",                           desc: "Profissionais especializados com experiência em múltiplos segmentos industriais." },
  { icon: Zap,        title: "Agilidade e imparcialidade",               desc: "Processos ágeis e laudos imparciais para decisões rápidas e seguras." },
];

const faqs = [
  { q: "Os certificados são válidos para auditorias?",  a: "Sim, atendem à ISO 17025 e possuem rastreabilidade reconhecida. Aceitos por auditores de ISO 9001, IATF 16949 e BPF/ANVISA." },
  { q: "Vocês atendem quais segmentos?",                a: "Alimentício, farmacêutico, agro, plástico, metalúrgico e industrial em geral." },
  { q: "Você apenas calibra ou ajuda na gestão?",       a: "Também auxiliamos no controle contínuo da metrologia. Acompanhe vencimentos, histórico e status em tempo real." },
  { q: "Como funciona o prazo?",                        a: "Após análise técnica do volume e tipo de equipamento. Prazo padrão de até 5 dias úteis, com opção express." },
  { q: "A rastreabilidade é comprovada?",               a: "Sim, com padrões rastreáveis à CGCRE/INMETRO. Cada certificado possui código de verificação e assinatura digital." },
];

const raj: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani, 'Rajdhani', sans-serif)",
  fontWeight: 700,
};

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function CalibracaoPage() {
  const [activeGrandeza, setActiveGrandeza] = useState("pressao");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const grandezaAtiva = grandezas.find((g) => g.id === activeGrandeza)!;
  const GrandezaIcon  = grandezaAtiva.icon;

  return (
    <main style={{ background: "#fff" }}>

      {/* ══ FAIXA ALERTA COM BOTÃO VOLTAR ══════════════════════════════════════════ */}
      <div style={{ background: "#F22020", padding: "14px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          
          {/* Botão Voltar (branco) + Mensagem */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <Link 
              href="/servicos" 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                padding: "8px 16px",
                borderRadius: 8,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.5)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
            >
              <ArrowLeft style={{ width: 16, height: 16 }} />
              Voltar
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle style={{ width: 20, height: 20, color: "#fff", flexShrink: 0 }} />
              <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
                <strong style={{ fontWeight: 800, fontSize: 16 }}>ATENÇÃO INDÚSTRIAS:</strong>{" "}
                Não conformidade metrológica pode gerar multas, interdições e prejuízos operacionais.
              </p>
            </div>
          </div>

          <a href={WA_AVALIACAO} target="_blank" rel="noopener noreferrer"
            style={{
              background: "#fff", color: "#F22020", fontWeight: 700, fontSize: 13,
              padding: "9px 20px", borderRadius: 6, textDecoration: "none",
              whiteSpace: "nowrap", letterSpacing: "0.04em", flexShrink: 0,
            }}>
            Solicitar Avaliação Técnica
          </a>
        </div>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", background: "#0D0D0D", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/banner/banner1.png')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "blur(2px)", transform: "scale(1.03)", opacity: 0.38,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(10,10,10,0.82) 50%, rgba(242,34,32,0.08) 100%)" }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", padding: "80px 24px 72px" }}>
          <h1 style={{ ...raj, fontSize: "clamp(28px,4vw,50px)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px" }}>
            Conformidade Metrológica<br />
            <span style={{ color: "#F22020" }}>Certificada e Rastreável</span>
          </h1>

          <p style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.75, margin: "0 0 28px", maxWidth: 430 }}>
            Calibração industrial rastreável ao INMETRO, com controle de erros, incertezas e gestão completa do seu parque de instrumentos.
          </p>

          <ul style={{ margin: "0 0 32px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Certificados conforme ABNT NBR ISO/IEC 17025:2017",
              "Rastreabilidade CGCRE/INMETRO garantida",
              "Atendimento in-loco sem paradas desnecessárias",
              "Gestão completa do parque de instrumentos",
            ].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#DEDEDE" }}>
                <CheckCircle2 style={{ width: 16, height: 16, color: "#F22020", marginTop: 2, flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 13, padding: "13px 24px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.04em" }}>
              Solicitar Diagnóstico <ArrowRight style={{ width: 16, height: 16 }} />
            </a>
            <a href={WA_ESPECIALISTA} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "#E0E0E0", fontWeight: 600, fontSize: 13, padding: "13px 20px", borderRadius: 8, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.15)" }}>
              <MessageCircle style={{ width: 15, height: 15 }} /> Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      {/* ══ RISCOS ════════════════════════════════════════════════ */}
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
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFF0F0", border: "1px solid #FCCFCF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

      {/* ══ DIFERENCIAIS ══════════════════════════════════════════ */}
      <section style={{ background: "#F5F5F5", borderBottom: "1px solid #EBEBEB", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <h2 style={{ ...raj, fontSize: "clamp(22px,3vw,36px)", color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>
              Mais que Calibração.{" "}
              <span style={{ color: "#F22020" }}>Gestão Completa da Conformidade.</span>
            </h2>
            <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
              A TECNOISO apresenta o comportamento metrológico de seus equipamentos comparando com padrões rastreáveis, identificando erros e incertezas e permitindo o controle contínuo do seu processo.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 40 }}>
            {diferenciais.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} style={{ background: "#fff", border: "1.5px solid #E8E8E8", borderRadius: 12, padding: "22px 22px" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFF0F0", border: "1px solid #FCCFCF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
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

      {/* ══ GRANDEZAS ════════════════════════════════════════════ */}
      <section style={{ position: "relative", background: "#0D0D0D", padding: "56px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(242,34,32,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.12em", margin: "0 0 10px" }}>SOLUÇÕES</p>
            <h2 style={{
              ...raj,
              fontSize: "clamp(22px,3vw,34px)",
              color: "#fff",
              margin: 0,
              lineHeight: 1.1,
            }}>
              Calibração Industrial Completa
            </h2>
            <p style={{ color: "#666", fontSize: 13, margin: "8px 0 0" }}>
              Selecione uma grandeza para conhecer os instrumentos atendidos
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {grandezas.map((g) => {
                const Icon = g.icon;
                const isActive = g.id === activeGrandeza;
                return (
                  <button key={g.id} onClick={() => setActiveGrandeza(g.id)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: 8,
                      border: `1.5px solid ${isActive ? "#F22020" : "rgba(255,255,255,0.08)"}`,
                      background: isActive ? "#F22020" : "rgba(255,255,255,0.04)",
                      color: isActive ? "#fff" : "#999",
                      fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left",
                      transition: "all 0.15s ease",
                    }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Icon style={{ width: 15, height: 15 }} />
                      {g.label}
                    </span>
                    {isActive && <ChevronRight style={{ width: 14, height: 14, opacity: 0.8 }} />}
                  </button>
                );
              })}
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ height: 3, background: "#F22020" }} />
              <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(242,34,32,0.15)", border: "1.5px solid rgba(242,34,32,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <GrandezaIcon style={{ width: 24, height: 24, color: "#F22020" }} />
                    </div>
                    <div>
                      <h3 style={{ ...raj, fontSize: 26, color: "#fff", margin: 0 }}>{grandezaAtiva.label}</h3>
                      <span style={{ fontSize: 12, color: "#F22020", fontWeight: 600 }}>{grandezaAtiva.count} tipos de instrumento</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: "#A0A0A0", lineHeight: 1.7, margin: "0 0 24px" }}>{grandezaAtiva.desc}</p>
                  <a href={WA_CALIBRACAO} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F22020", color: "#fff", fontWeight: 700, fontSize: 12, padding: "11px 22px", borderRadius: 8, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    SOLICITAR CALIBRAÇÃO <ChevronRight style={{ width: 14, height: 14 }} />
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "0.08em", margin: "0 0 12px" }}>INSTRUMENTOS ATENDIDOS</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {grandezaAtiva.instrumentos.map((inst) => (
                      <div key={inst} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 9 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F22020", flexShrink: 0 }} />
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

      {/* ══ CTA FAIXA ══════════════════════════════════════════ */}
      <section style={{ background: "#F22020", padding: "44px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32, alignItems: "center" }}>
          <div>
            <h2 style={{ ...raj, fontSize: "clamp(20px,3vw,32px)", color: "#fff", margin: "0 0 6px" }}>
              Seus instrumentos estão conformes?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, margin: 0 }}>
              Solicite uma avaliação técnica gratuita. Nossa equipe responde em até 2 horas.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <a href={WA_CONFORMIDADE} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#F22020", fontWeight: 700, fontSize: 13, padding: "12px 26px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.04em" }}>
              Garantir Conformidade Agora <ArrowRight style={{ width: 15, height: 15 }} />
            </a>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", gap: 4 }}>
              <Lock style={{ width: 11, height: 11 }} /> Seus dados estão seguros
            </span>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section style={{ background: "#FAFAFA", borderBottom: "1px solid #EBEBEB", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 64 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#F22020", letterSpacing: "0.1em", margin: "0 0 10px" }}>FAQ</p>
            <h2 style={{ ...raj, fontSize: "clamp(20px,2.8vw,30px)", color: "#111", margin: "0 0 10px", lineHeight: 1.1 }}>
              Perguntas Frequentes
            </h2>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              Tire suas dúvidas sobre nosso processo de calibração e certificação.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #EBEBEB", borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: openFaq === i ? "#F22020" : "#111" }}>{faq.q}</span>
                  <ChevronDown style={{ width: 15, height: 15, color: openFaq === i ? "#F22020" : "#AAA", flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
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

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ background: "#0D0D0D", color: "#fff", padding: "64px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 48 }}>
            <div>
              <p style={{ color: "#A0A0A0", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios próprios e metodologia certificada pelo INMETRO. Um dos laboratórios é geral e o outro é físico-químico, bem como um laboratório móvel que vai até a sua empresa.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Serviços</h3>
              <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Calibração", "Certificação", "Manutenção", "Consultoria", "Treinamentos"].map((s) => (
                  <li key={s}>
                    <a href="/#servicos" style={{ color: "#A0A0A0", fontSize: 13, textDecoration: "none" }}>{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#fff" }}>Contato</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { icon: MapPin, text: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
                  { icon: Phone,  text: "(47) 3438-3175" },
                  { icon: Mail,   text: "contato@tecnoiso.com" },
                  { icon: Clock,  text: "Segunda à Sexta\n07:42 às 17:30" },
                ].map(({ icon: Icon, text }, i) => (
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
                style={{ width: 112, height: 112, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid #F22020", marginBottom: 12 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 14, margin: 0 }}>Leonardo Rosa Junior</p>
              <p style={{ color: "#F22020", fontSize: 12, marginTop: 4, marginBottom: 16 }}>CEO & Fundador</p>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { href: "https://www.instagram.com/leorosajr/", icon: Instagram, label: "Instagram" },
                  { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ width: 40, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none" }}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #333", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "#555", fontSize: 12, margin: 0 }}>
              © 2026 TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA. | CNPJ: 17.459.428/0001-08
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Política de Qualidade", "Termos de Uso"].map((label) => (
                <a key={label} href="#" style={{ color: "#555", fontSize: 12, textDecoration: "none" }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}