import {
  Gauge, Thermometer, Ruler, Weight, Droplets, Wrench, Settings,
  XCircle, BadgeAlert, Ban, AlertCircle, RefreshCcw, Unlink, Users,
  Award, Eye, TrendingUp, Zap,
} from "lucide-react";

/* ─── Links ─────────────────────────────────────────────────────────── */
export const WA_NUM          = "4734401719";
export const WA_BASE         = `https://wa.me/${WA_NUM}`;
export const WA_ESPECIALISTA = `${WA_BASE}?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20especialista`;

/* ─── Grandezas ─────────────────────────────────────────────────────── */
export const grandezas = [
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

/* ─── Riscos ────────────────────────────────────────────────────────── */
export const riscos = [
  { icon: XCircle,     label: "Peças reprovadas" },
  { icon: BadgeAlert,  label: "Multas (Anvisa/Ministério do Trabalho)" },
  { icon: Ban,         label: "Interdição de operação" },
  { icon: AlertCircle, label: "Perda de certificações" },
  { icon: RefreshCcw,  label: "Retrabalho e aumento de custos" },
  { icon: Unlink,      label: "Falta de rastreabilidade" },
  { icon: Users,       label: "Dependência de múltiplos fornecedores" },
];

/* ─── Diferenciais ──────────────────────────────────────────────────── */
export const diferenciais = [
  { icon: Award,      title: "Certificados claros e completos",         desc: "Emitidos conforme ABNT NBR ISO/IEC 17025:2017, aceitos por todos os organismos certificadores." },
  { icon: Eye,        title: "Transparência total",                      desc: "Certificados dos padrões disponíveis para consulta a qualquer momento." },
  { icon: Settings,   title: "Sistema de gestão de qualidade ativo",     desc: "Controlamos vencimentos, histórico e alertas automáticos para seu parque de instrumentos." },
  { icon: TrendingUp, title: "Melhoria contínua",                        desc: "Acompanhamento evolutivo das métricas e desempenho metrológico da sua operação." },
  { icon: Users,      title: "Equipe técnica",                           desc: "Profissionais especializados com experiência em múltiplos segmentos industriais." },
  { icon: Zap,        title: "Agilidade e imparcialidade",               desc: "Processos ágeis e laudos imparciais para decisões rápidas e seguras." },
];

/* ─── FAQs ──────────────────────────────────────────────────────────── */
export const faqs = [
  { q: "Os certificados são válidos para auditorias?",  a: "Sim, atendem à ISO 17025 e possuem rastreabilidade reconhecida. Aceitos por auditores de ISO 9001, IATF 16949 e BPF/ANVISA." },
  { q: "Vocês atendem quais segmentos?",                a: "Alimentício, farmacêutico, agro, plástico, metalúrgico e industrial em geral." },
  { q: "Você apenas calibra ou ajuda na gestão?",       a: "Também auxiliamos no controle contínuo da metrologia. Acompanhe vencimentos, histórico e status em tempo real." },
  { q: "Como funciona o prazo?",                        a: "Após análise técnica do volume e tipo de equipamento. Prazo padrão de até 5 dias úteis, com opção express." },
  { q: "A rastreabilidade é comprovada?",               a: "Sim, com padrões rastreáveis à CGCRE/INMETRO. Cada certificado possui código de verificação e assinatura digital." },
];