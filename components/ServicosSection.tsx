"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Gauge, Award, ShieldCheck, BarChart3, Wrench, Cpu, GraduationCap, ShoppingCart, Package, Truck } from "lucide-react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const mainServices = [
  {
    slug: "calibracao",
    icon: Gauge,
    title: "Calibração de Instrumentos",
    desc: "A calibração garante que seus instrumentos de medição operem com exatidão e confiabilidade. A Tecnoiso realiza esse processo com total rastreabilidade às normas nacionais e internacionais, emitindo certificados reconhecidos por auditorias, órgãos reguladores e sistemas de gestão da qualidade.",
    bullets: [
      "Termômetros, manômetros, balanças e dimensionais",
      "Certificado com rastreabilidade RBC/INMETRO",
      "Atendimento in-loco ou em laboratório próprio",
      "Válido para ISO 9001, IATF 16949 e BPF",
    ],
  },
  {
    slug: "certificacao",
    icon: Award,
    title: "Certificados Acreditados",
    desc: "Emitimos certificados de calibração acreditados pelo INMETRO, com validade nacional e reconhecimento internacional. Nossos certificados atendem plenamente às exigências de auditorias internas e externas, garantindo a conformidade do seu sistema de gestão.",
    bullets: [
      "Certificados com assinatura digital e código de verificação",
      "Entrega em até 5 dias úteis",
      "Conformidade com ISO 9001, IATF 16949 e ANVISA",
    ],
  },
  {
    slug: "nr13",
    icon: ShieldCheck,
    title: "Inspeção NR 13",
    desc: "Realizamos a inspeção de vasos de pressão e caldeiras conforme os requisitos da Norma Regulamentadora NR 13. Todo o processo é conduzido por engenheiro habilitado com ART, garantindo a segurança dos equipamentos e a conformidade legal da sua empresa.",
    bullets: [
      "Inspeção periódica e inicial de vasos e caldeiras",
      "Emissão de prontuário e registro no MTE",
      "Engenheiro responsável com ART emitida",
      "Laudos técnicos completos e documentação regularizada",
    ],
  },
  {
    slug: "gerenciamento",
    icon: BarChart3,
    title: "Gerenciamento de Instrumentos",
    desc: "Assumimos o controle total do ciclo de vida dos seus instrumentos. Desde os prazos de calibração até o histórico de manutenções, você tem visibilidade completa via dashboard, com relatórios prontos para auditorias e alertas automáticos antes dos vencimentos.",
    bullets: [
      "Dashboard em tempo real com status e vencimentos",
      "Relatórios para ISO, IATF e ANVISA",
      "Alertas automáticos de vencimento de calibrações",
      "Histórico completo de cada instrumento",
    ],
  },
];

const secondaryServices = [
  { slug: "manutencao",  icon: Wrench,       title: "Manutenção",        desc: "Preventiva e corretiva de instrumentos de medição, prolongando a vida útil e garantindo a precisão dos equipamentos." },
  { slug: "automacao",   icon: Cpu,          title: "Automação",         desc: "Soluções industriais de automação para otimizar processos produtivos e aumentar a eficiência operacional." },
  { slug: "treinamentos",icon: GraduationCap,title: "Treinamentos",      desc: "Capacitação técnica em metrologia, calibração e instrumentação para suas equipes de qualidade e produção." },
  { slug: "vendas",      icon: ShoppingCart, title: "Vendas",            desc: "Comercialização de instrumentos de medição das melhores marcas nacionais e internacionais." },
  { slug: "locacao",     icon: Package,      title: "Locação",           desc: "Instrumentos calibrados disponíveis para locação em projetos temporários ou demandas sazonais." },
  { slug: "logistica",   icon: Truck,        title: "Suporte Logístico", desc: "Coleta e entrega com logística dedicada, garantindo agilidade, rastreabilidade e segurança dos instrumentos." },
];

/* ─────────────────────────────────────────
   Hero Banner
───────────────────────────────────────── */
const HeroBanner = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[420px] md:h-[500px] overflow-hidden">
      {/* Imagem */}
      <img
        src="/banner/slide1-precision.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: visible ? "scale(1)" : "scale(1.04)",
          transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Overlay: escurecimento + tint vermelho sutil */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[hsl(var(--brand-red))]/10" />

      {/* Gradiente lateral esquerdo vermelho — como o verde da Falcon */}
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[hsl(var(--brand-red))]/40 to-transparent" />

      {/* Conteúdo alinhado à esquerda */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-5xl">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}
        >
          

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl">
            Da calibração à{" "}
            <span className="text-[hsl(var(--brand-red))]">conformidade</span>{" "}
            total.
          </h1>

          <p className="mt-4 text-white/60 text-base md:text-lg max-w-lg leading-relaxed">
            Soluções completas em metrologia, inspeção e automação industrial com certificação INMETRO.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function ServicosPage() {
  return (
    <>
      <HeroBanner />

      {/* ── Seção escura — serviços principais ── */}
      <section className="bg-gray-950 text-white">

        {/* Heading da seção */}
        <div className="px-8 md:px-16 lg:px-24 pt-16 pb-10 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--brand-red))] leading-tight">
            Soluções em metrologia industrial
          </h2>
          <p className="mt-2 text-white/40 text-sm max-w-xl">
            Atendemos indústrias de todos os segmentos com precisão, rastreabilidade e conformidade normativa.
          </p>
        </div>

        {/* Lista de serviços principais */}
        <div className="divide-y divide-white/10">
          {mainServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.slug}
                className="group px-8 md:px-16 lg:px-24 py-10 hover:bg-white/[0.03] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 max-w-5xl">

                  {/* Ícone + título */}
                  <div className="flex-shrink-0 flex items-start gap-4 md:w-64">
                    <div className="w-10 h-10 rounded-sm bg-[hsl(var(--brand-red))]/10 border border-[hsl(var(--brand-red))]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(var(--brand-red))] group-hover:border-[hsl(var(--brand-red))] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[hsl(var(--brand-red))] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-[15px] font-bold text-white leading-snug pt-1.5">
                      {svc.title}
                    </h3>
                  </div>

                  {/* Descrição + bullets + botão */}
                  <div className="flex-1 space-y-4">
                    <p className="text-white/55 text-[14px] leading-relaxed">
                      {svc.desc}
                    </p>
                    <ul className="space-y-1.5">
                      {svc.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13px] text-white/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-red))] mt-1.5 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/servicos/${svc.slug}`}
                      className="inline-flex items-center gap-2 bg-[hsl(var(--brand-red))] hover:bg-red-700 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-2.5 rounded-sm transition-all duration-200 group/btn hover:gap-3 mt-2"
                    >
                      Saiba mais
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Separador ── */}
        <div className="flex items-center gap-4 px-8 md:px-16 lg:px-24 py-4 border-t border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">
            Mais serviços
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ── Grid secundário ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y divide-white/10 sm:divide-y-0 border-t border-white/10">
          {secondaryServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.slug}
                className="group relative flex flex-col gap-3 px-8 py-8 hover:bg-white/[0.04] transition-colors duration-200 border-b border-r border-white/10 last:border-r-0 [&:nth-child(3n)]:border-r-0"
              >
                <div className="absolute bottom-0 left-0 h-px w-0 bg-[hsl(var(--brand-red))] group-hover:w-full transition-all duration-500" />

                <div className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[hsl(var(--brand-red))] group-hover:border-[hsl(var(--brand-red))] transition-all duration-300">
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-[14px] font-bold text-white/80">{svc.title}</h3>
                <p className="text-[12px] text-white/35 leading-relaxed">{svc.desc}</p>

                <Link
                  href={`/servicos/${svc.slug}`}
                  className="inline-flex items-center gap-1.5 mt-auto bg-[hsl(var(--brand-red))] hover:bg-red-700 text-white text-[11px] font-semibold tracking-widest uppercase px-3 py-2 rounded-sm transition-all duration-200 w-fit group/btn"
                >
                  Saiba mais
                  <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>
            );
          })}
        </div>

      </section>
    </>
  );
}