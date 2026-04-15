"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Gauge,
  Award,
  Wrench,
  ShieldCheck,
  Cpu,
  GraduationCap,
  BarChart3,
  ShoppingCart,
  Package,
  Truck,
  ArrowUpRight,
} from "lucide-react";

const mainServices = [
  {
    num: "01",
    slug: "calibracao",
    icon: Gauge,
    tag: "Rastreabilidade INMETRO",
    title: "Calibração de instrumentos com alta precisão",
    desc: "Realizamos a calibração de instrumentos de medição com total rastreabilidade às normas nacionais e internacionais, garantindo a confiabilidade dos seus processos.",
    bullets: [
      "Termômetros, manômetros, balanças e dimensionais",
      "Certificado com rastreabilidade RBC/INMETRO",
      "Atendimento in-loco ou em laboratório",
    ],
    // ── Imagens em /public/servico/ — ajuste a extensão se necessário ──
    bgImage: "/servico/calibracao.jpg",
  },
  {
    num: "02",
    slug: "certificacao",
    icon: Award,
    tag: "Acreditado",
    title: "Certificados acreditados com validade nacional",
    desc: "Emitimos certificados de calibração acreditados pelo INMETRO, reconhecidos por auditorias, órgãos reguladores e sistemas de gestão da qualidade.",
    bullets: [
      "Válidos para ISO 9001, IATF 16949 e BPF",
      "Assinatura digital e código de verificação",
      "Entrega em até 5 dias úteis",
    ],
    bgImage: "/servico/certificados.jpg",
  },
  {
    num: "03",
    slug: "nr13",
    icon: ShieldCheck,
    tag: "Norma Regulamentadora",
    title: "Inspeção de vasos de pressão e caldeiras",
    desc: "Adequação e inspeção de equipamentos conforme a NR 13, com emissão de prontuário e acompanhamento por profissional habilitado.",
    bullets: [
      "Inspeção periódica e inicial de vasos e caldeiras",
      "Emissão de prontuário e registro no MTE",
      "Engenheiro responsável com ART",
    ],
    bgImage: "/servico/Inspecao-de-Equipamentos-NR13.jpg",
  },
  {
    num: "04",
    slug: "gerenciamento",
    icon: BarChart3,
    tag: "Gestão Completa",
    title: "Controle total do seu parque de instrumentos",
    desc: "Gerenciamos todo o ciclo de vida dos seus instrumentos: prazos de calibração, histórico de manutenções, indicadores e relatórios para auditorias.",
    bullets: [
      "Dashboard com vencimentos e status em tempo real",
      "Relatórios para ISO, IATF e ANVISA",
      "Alertas automáticos de vencimento",
    ],
    bgImage: "/servico/controle.jpg",
  },
];

const secondaryServices = [
  {
    num: "05",
    slug: "manutencao",
    icon: Wrench,
    title: "Manutenção",
    desc: "Preventiva e corretiva de instrumentos de medição, prolongando a vida útil dos equipamentos.",
  },
  {
    num: "06",
    slug: "automacao",
    icon: Cpu,
    title: "Automação",
    desc: "Soluções industriais para otimizar processos e aumentar a eficiência operacional.",
  },
  {
    num: "07",
    slug: "treinamentos",
    icon: GraduationCap,
    title: "Treinamentos",
    desc: "Capacitação técnica em metrologia, calibração e instrumentação.",
  },
  {
    num: "08",
    slug: "vendas",
    icon: ShoppingCart,
    title: "Vendas",
    desc: "Comercialização de instrumentos das melhores marcas do mercado.",
  },
  {
    num: "09",
    slug: "locacao",
    icon: Package,
    title: "Locação",
    desc: "Instrumentos calibrados para projetos temporários ou demandas sazonais.",
  },
  {
    num: "10",
    slug: "logistica",
    icon: Truck,
    title: "Suporte Logístico",
    desc: "Coleta e entrega com logística dedicada, garantindo agilidade e segurança.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function ServicosSection() {
  return (
    <section id="servicos" className="bg-white">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight tracking-tight max-w-2xl mx-auto">
            Precisão que{" "}
            <span className="text-red-600">transforma</span>{" "}
            processos industriais
          </h1>
          <p className="mt-4 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Soluções completas em metrologia, calibração e automação industrial com certificação INMETRO.
          </p>
        </motion.div>
      </div>

      {/* ── Main Services — alternating rows ── */}
      <div className="divide-y divide-gray-100">
        {mainServices.map((svc, i) => {
          const isEven = i % 2 === 0;
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <Link
                href={`/servicos/${svc.slug}`}
                className={`
                  group flex flex-col md:flex-row
                  ${isEven ? "" : "md:flex-row-reverse"}
                  min-h-[320px] hover:bg-gray-50 transition-colors duration-300
                `}
              >
                {/* ── Visual panel ── */}
                <div className="w-full md:w-5/12 relative overflow-hidden flex flex-col items-center justify-center gap-5 p-10 bg-gray-100">

                  {/*
                    ① Background image
                    — scale-110 evita bordas brancas do blur nas extremidades
                    — blur-sm + low opacity no estado normal
                    — blur-none + higher opacity ao hover
                  */}
                  <div
                    className="
                      absolute inset-0 scale-110
                      bg-cover bg-center
                    "
                    style={{ backgroundImage: `url(${svc.bgImage})` }}
                  />



                  {/* ③ Big number watermark */}
                  <span className="absolute top-2 right-4 text-[7rem] font-bold text-gray-300/60 group-hover:text-red-400/80 leading-none select-none transition-colors duration-500 pointer-events-none z-10">
                    {svc.num}
                  </span>

                  {/* ④ Icon ring */}
                  <div className="relative z-10 w-20 h-20 rounded-full border-2 border-red-300 group-hover:border-white/50 transition-colors duration-500 flex items-center justify-center backdrop-blur-sm bg-white/10 group-hover:bg-white/10">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-500 drop-shadow-sm" />
                  </div>

                  {/* ⑤ Divider */}
                  <div className="w-8 h-0.5 bg-red-200 group-hover:bg-white/40 transition-colors duration-500 relative z-10" />

                  {/* ⑥ Label */}
                  <span className="relative z-10 text-[11px] font-semibold tracking-widest uppercase text-gray-500 group-hover:text-white/70 transition-colors duration-500">
                    {svc.title.split(" ")[0]}
                  </span>
                </div>

                {/* Content panel */}
                <div className="w-full md:w-7/12 flex flex-col justify-center gap-4 p-8 md:p-12">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-sm w-fit uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {svc.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
                    {svc.title}
                  </h2>
                  <p className="text-gray-500 text-[15px] leading-relaxed">
                    {svc.desc}
                  </p>
                  <ul className="space-y-2 mt-1">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-red-600 mt-2 group-hover:gap-2.5 transition-all duration-200">
                    Saiba mais
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Divider label ── */}
      <div className="flex items-center gap-4 px-6 py-4 border-t border-b border-gray-100 bg-gray-50">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">
          Mais serviços
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* ── Secondary Services grid ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-x-0 sm:divide-x divide-gray-100 border-b border-gray-100"
      >
        {secondaryServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <motion.div key={svc.slug} variants={fadeUp}>
              <Link
                href={`/servicos/${svc.slug}`}
                className="group flex flex-col gap-3 p-7 hover:bg-gray-50 transition-colors duration-200 relative overflow-hidden h-full"
              >
                {/* Accent bar on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 group-hover:w-full transition-all duration-500" />

                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-red-500 transition-all duration-200 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                </div>

                <span className="text-[10px] font-semibold text-red-400 tracking-widest">
                  {svc.num}
                </span>
                <h3 className="text-[15px] font-semibold text-gray-800">
                  {svc.title}
                </h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  {svc.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}