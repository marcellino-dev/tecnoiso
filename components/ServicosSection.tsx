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
    desc: "Calibração de instrumentos de medição com total rastreabilidade às normas nacionais e internacionais, garantindo a confiabilidade dos seus processos.",
    bullets: [
      "Termômetros, manômetros, balanças e dimensionais",
      "Certificado com rastreabilidade RBC/INMETRO",
      "Atendimento in-loco ou em laboratório",
    ],
    bgImage: "/servico/calibracao.jpg",
  },
  {
    num: "02",
    slug: "certificacao",
    icon: Award,
    tag: "Acreditado",
    title: "Certificados acreditados com validade nacional",
    desc: "Certificados de calibração acreditados pelo INMETRO, reconhecidos por auditorias, órgãos reguladores e sistemas de gestão da qualidade.",
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
    desc: "Preventiva e corretiva de instrumentos, prolongando a vida útil dos equipamentos.",
  },
  {
    num: "06",
    slug: "automacao",
    icon: Cpu,
    title: "Automação",
    desc: "Soluções industriais para otimizar processos e aumentar eficiência operacional.",
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
    desc: "Instrumentos calibrados para projetos temporários ou sazonais.",
  },
  {
    num: "10",
    slug: "logistica",
    icon: Truck,
    title: "Suporte Logístico",
    desc: "Coleta e entrega dedicada, com agilidade e segurança garantidas.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function ServicosSection() {
  return (
    <section id="servicos" className="bg-white">

      {/* ── Intro ── */}
      <div className="border-b border-gray-100 py-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight tracking-tight max-w-xl mx-auto">
            Precisão que{" "}
            <span className="text-red-600">transforma</span>{" "}
            processos industriais
          </h1>
          <p className="mt-3 text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Soluções completas em metrologia, calibração e automação industrial com certificação INMETRO.
          </p>
        </motion.div>
      </div>

      {/* ── Main Services ── */}
      <div className="divide-y divide-gray-100">
        {mainServices.map((svc, i) => {
          const isEven = i % 2 === 0;
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <div
                className={`
                  group flex flex-col md:flex-row
                  ${isEven ? "" : "md:flex-row-reverse"}
                  hover:bg-gray-50/70 transition-colors duration-300
                `}
              >
                {/* ── Visual panel ── */}
                <div className="w-full md:w-[38%] relative overflow-hidden flex flex-col items-center justify-center gap-3 p-8 bg-gray-100 min-h-[220px]">
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-700"
                    style={{ backgroundImage: `url(${svc.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />

                  {/* large number */}
                  <span className="absolute top-2 right-3 text-[6rem] font-bold text-white/10 group-hover:text-white/20 leading-none select-none transition-colors duration-500 pointer-events-none z-10">
                    {svc.num}
                  </span>

                  {/* icon circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white drop-shadow" />
                  </div>

                  <span className="relative z-10 text-[10px] font-semibold tracking-widest uppercase text-white/60">
                    {svc.title.split(" ")[0]}
                  </span>
                </div>

                {/* ── Content panel ── */}
                <div className="w-full md:w-[62%] flex flex-col justify-center gap-3 p-6 md:p-8 lg:p-10">
                  {/* tag */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-sm w-fit uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {svc.tag}
                  </span>

                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug tracking-tight">
                    {svc.title}
                  </h2>

                  <p className="text-gray-500 text-[14px] leading-relaxed">
                    {svc.desc}
                  </p>

                  <ul className="space-y-1.5">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[12px] text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* ── CTA button ── */}
                  <div className="mt-1">
                    <Link
                      href={`/servicos/${svc.slug}`}
                      className="
                        inline-flex items-center gap-2
                        bg-red-600 hover:bg-red-700 active:bg-red-800
                        text-white text-[12px] font-semibold tracking-wide uppercase
                        px-4 py-2.5 rounded-sm
                        transition-all duration-200
                        hover:gap-3 group/btn
                        w-fit
                      "
                    >
                      Saiba mais
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Divider ── */}
      <div className="flex items-center gap-3 px-5 py-3 border-t border-b border-gray-100 bg-gray-50">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:[&>*:nth-child(3n+2)]:border-x sm:[&>*:nth-child(3n+2)]:border-gray-100 lg:divide-y-0 border-b border-gray-100"
      >
        {secondaryServices.map((svc) => {
          const Icon = svc.icon;
          return (
            <motion.div key={svc.slug} variants={fadeUp}>
              <div className="group relative flex flex-col gap-2 p-5 hover:bg-gray-50/80 transition-colors duration-200 overflow-hidden h-full border-b border-gray-100 sm:border-b-0 sm:border-r last:border-r-0 [&:nth-child(3n)]:border-r-0">
                {/* bottom accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 group-hover:w-full transition-all duration-500" />

                {/* icon */}
                <div className="w-8 h-8 rounded-md bg-white border border-gray-100 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 mb-0.5">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </div>

                <span className="text-[9px] font-bold text-red-400 tracking-widest">
                  {svc.num}
                </span>
                <h3 className="text-[14px] font-semibold text-gray-800 leading-tight">
                  {svc.title}
                </h3>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  {svc.desc}
                </p>

                {/* ── CTA button ── */}
                <Link
                  href={`/servicos/${svc.slug}`}
                  className="
                    inline-flex items-center gap-1.5 mt-auto pt-1
                    bg-red-600 hover:bg-red-700 active:bg-red-800
                    text-white text-[11px] font-semibold tracking-wide uppercase
                    px-3 py-2 rounded-sm
                    transition-all duration-200
                    w-fit
                    group/btn
                  "
                >
                  Saiba mais
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}