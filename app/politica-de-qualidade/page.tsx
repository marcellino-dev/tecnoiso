"use client";

import { useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  CheckCircle2,
  ArrowLeft,
  Award,
  Users,
  Lightbulb,
  Scale,
  type LucideIcon,
  FolderTree,
} from "lucide-react";

/* ─── Animation Variants ────────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/* ─── Data ───────────────────────────────────────────────────────────── */
type PoliticaItem = { icon: LucideIcon; text: string };

const politicaItems: PoliticaItem[] = [
  {
    icon: Lightbulb,
    text: "Garantir a melhoria contínua dos processos para a manutenção do sistema de gestão da qualidade.",
  },
  {
    icon: ShieldCheck,
    text: "Prover serviços de calibração e manutenção qualificados através da competência técnica de nossos colaboradores.",
  },
  {
    icon: Heart,
    text: "Priorizar a satisfação de todos os clientes internos e externos com confiabilidade, agilidade e imparcialidade.",
  },
];

const valores = [
  {
    icon: Scale,
    title: "Ética",
    desc: "Nosso comportamento é pautado pela ética e transparência em todas as ações.",
  },
  {
    icon: CheckCircle2,
    title: "Responsabilidade",
    desc: "Cumprimos os acordos firmados com clientes, colaboradores e a sociedade.",
  },
  {
    icon: Users,
    title: "Valorização Humana",
    desc: "Nos preocupamos com a saúde, segurança e qualidade de vida de nossos colaboradores e de todas as pessoas que nos envolvem.",
  },
  {
    icon: Award,
    title: "Qualidade",
    desc: "A satisfação do cliente é nosso principal objetivo.",
  },
  {
    icon: Lightbulb,
    title: "Inovação",
    desc: "Buscamos continuamente soluções inovadoras ao mercado industrial.",
  },
];

/* ─── WhatsApp CTA URL ───────────────────────────────────────────────── */
const WA_URL =
  "https://wa.me/5547996644051?text=Olá%2C%20vim%20da%20página%20de%20Política%20de%20Qualidade%20e%20gostaria%20de%20falar%20com%20um%20consultor.";

/* ─── Hero Banner ────────────────────────────────────────────────────── */
const HeroBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-end"
      style={{ minHeight: "clamp(420px, 55vh, 540px)" }}
    >
      <img
        src="/banner/slide1-precision.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: visible ? "scale(1)" : "scale(1.04)",
          transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[hsl(var(--brand-red))]/8" />
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-black/60 to-transparent" />

      <div className="relative z-10 w-full pb-14 px-8 md:px-16 lg:px-24 pt-8 md:pt-12">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar para a home
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.1] tracking-tight max-w-3xl mb-5">
            Compromisso com a{" "}
            <span className="text-[hsl(var(--brand-red))]">qualidade</span>,
            <br />
            transparência e excelência técnica
          </h1>

          <p className="text-white/55 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            Conheça a Política da Qualidade, a Missão, a Visão e os Valores que orientam todas as
            ações da TECNOISO e sustentam nossa atuação em metrologia, calibração e manutenção
            industrial.
          </p>

          <div className="flex items-center gap-3 flex-wrap" />
        </div>
      </div>
    </section>
  );
};

/* ─── Política da Qualidade — winding scroll-linked path ───────────────── */
const VB_W = 480;
const NODE_GAP = 200;
const NODE_TOP = 90;
const NODE_BOTTOM_PAD = 90;

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const PoliticaTimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const totalH = NODE_TOP + (politicaItems.length - 1) * NODE_GAP + NODE_BOTTOM_PAD;

  const nodes = useMemo(
    () =>
      politicaItems.map((_, i) => ({
        x: i % 2 === 0 ? 150 : VB_W - 150,
        y: NODE_TOP + i * NODE_GAP,
      })),
    []
  );

  const pathD = useMemo(() => buildSmoothPath(nodes), [nodes]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.2"],
  });
  const drawProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });

  const yFractions = nodes.map((n) => n.y / totalH);
  const xPercents = nodes.map((n) => (n.x / VB_W) * 100);
  const yPercents = nodes.map((n) => (n.y / totalH) * 100);
  const dotLeft = useTransform(scrollYProgress, yFractions, xPercents);
  const dotTop = useTransform(scrollYProgress, yFractions, yPercents);

  return (
    <section className="relative bg-[hsl(var(--background))] py-20 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-5" />

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          >
            Política da Qualidade
          </motion.h2>

          <motion.p variants={fadeUp} className="text-muted-foreground text-[15px] mb-4 max-w-2xl">
            Diretrizes que orientam nosso sistema de gestão da qualidade e o atendimento aos
            clientes.
          </motion.p>
        </motion.div>

        <div
          ref={containerRef}
          className="hidden md:block relative mt-14"
          style={{ height: totalH }}
        >
          <svg
            viewBox={`0 0 ${VB_W} ${totalH}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            <path d={pathD} stroke="hsl(var(--border))" strokeWidth={3} strokeLinecap="round" />
            <motion.path
              d={pathD}
              stroke="hsl(var(--brand-red))"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ pathLength: shouldReduceMotion ? 1 : drawProgress }}
            />
          </svg>

          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              className="absolute w-3 h-3 rounded-full bg-[hsl(var(--brand-red))] z-10"
              style={{
                left: useTransform(dotLeft, (v) => `${v}%`),
                top: useTransform(dotTop, (v) => `${v}%`),
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 14px 3px hsl(var(--brand-red) / 0.55)",
              }}
            />
          )}

          {politicaItems.map((item, i) => {
            const node = nodes[i];
            const isLeft = node.x < VB_W / 2;
            const leftPct = (node.x / VB_W) * 100;
            const topPct = (node.y / totalH) * 100;
            const cardVariant = shouldReduceMotion
              ? fadeOnly
              : isLeft
              ? slideFromLeft
              : slideFromRight;

            return (
              <div key={i} className="absolute inset-x-0" style={{ top: `${topPct}%` }}>
                <div
                  className="absolute z-10 w-14 h-14 rounded-full bg-[hsl(var(--brand-red))] text-white flex items-center justify-center shadow-lg ring-4 ring-[hsl(var(--background))]"
                  style={{ left: `${leftPct}%`, top: 0, transform: "translate(-50%, -50%)" }}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[hsl(var(--brand-black))] text-white text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={cardVariant}
                  className={`absolute bg-[hsl(var(--card))] border border-border/50 rounded-xl px-5 py-4 shadow-sm hover:border-[hsl(var(--brand-red))]/30 transition-colors duration-300 ${
                    isLeft ? "text-right" : "text-left"
                  }`}
                  style={
                    isLeft
                      ? {
                          right: `${100 - leftPct}%`,
                          paddingRight: "44px",
                          top: 0,
                          transform: "translateY(-50%)",
                          maxWidth: "40%",
                        }
                      : {
                          left: `${leftPct}%`,
                          paddingLeft: "44px",
                          top: 0,
                          transform: "translateY(-50%)",
                          maxWidth: "40%",
                        }
                  }
                >
                  <p className="text-[14px] text-foreground/80 leading-relaxed">{item.text}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="block md:hidden space-y-3 mt-10"
        >
          {politicaItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeLeft}
              className="flex items-start gap-4 bg-[hsl(var(--card))] border border-border/50 rounded-xl p-5"
            >
              <div className="relative flex-shrink-0 w-11 h-11 rounded-full bg-[hsl(var(--brand-red))] text-white flex items-center justify-center">
                <item.icon className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[hsl(var(--brand-black))] text-white text-[9px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <p className="text-[15px] text-foreground/80 leading-relaxed pt-1">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Missão + Visão ─────────────────────────────────────────────────── */
const MissaoVisaoSection = () => (
  <section className="bg-[hsl(var(--muted))]/40 py-20 px-8 md:px-16 lg:px-24">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={scaleIn}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bg-[hsl(var(--card))] border border-border/50 rounded-2xl p-8 hover:border-[hsl(var(--brand-red))]/25 transition-all duration-300 hover:shadow-[var(--shadow-red-soft)]"
        >
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--brand-red))]/10 flex items-center justify-center mb-5">
            <Target className="w-5 h-5 text-[hsl(var(--brand-red))]" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-4">Missão</h3>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Prestar serviços técnicos de excelência em todos os mercados em que atuamos, cultivando
            o bem-estar e a qualidade de vida de nossos colaboradores, com foco nos resultados e
            perenidade da empresa.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="bg-[hsl(var(--brand-black))] border border-white/10 rounded-2xl p-8 hover:border-[hsl(var(--brand-red))]/40 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-[hsl(var(--brand-red))]/20 flex items-center justify-center mb-5">
            <Eye className="w-5 h-5 text-[hsl(var(--brand-red))]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Visão</h3>
          <p className="text-white/55 text-[15px] leading-relaxed">
            Ser referência em todos os mercados em que atua e consolidar presença na{" "}
            <span className="text-[hsl(var(--brand-red))] font-semibold">
              América Latina até 2029
            </span>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ─── Nossos Valores ─────────────────────────────────────────────────── */
const ValoresSection = () => (
  <section className="bg-[hsl(var(--background))] py-20 px-8 md:px-16 lg:px-24">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-14"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={scaleIn}
          className="inline-flex w-12 h-12 rounded-xl bg-[hsl(var(--brand-red))]/10 items-center justify-center mb-5"
        >
          <Heart className="w-6 h-6 text-[hsl(var(--brand-red))]" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Nossos Valores
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[15px] max-w-xl mx-auto">
          Princípios que guiam o comportamento de toda a equipe TECNOISO no dia a dia.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerFast}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {valores.map((v, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -5, transition: { duration: 0.22 } }}
            className="group bg-[hsl(var(--card))] border border-border/50 hover:border-[hsl(var(--brand-red))]/30 rounded-xl p-6 transition-all duration-300 hover:shadow-[var(--shadow-red-soft)]"
          >
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--brand-red))]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--brand-red))]/20 transition-colors duration-300">
              <v.icon className="w-5 h-5 text-[hsl(var(--brand-red))]" />
            </div>
            <h4 className="font-bold text-foreground mb-2 group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
              {v.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─── CTA Bottom ─────────────────────────────────────────────────────── */
const CtaSection = () => (
  <section className="bg-[hsl(var(--brand-black))] py-16 px-8 md:px-16 lg:px-24">
    <motion.div
      className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div variants={fadeLeft}>
        <p className="text-[hsl(var(--brand-red))] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
          Pronto para começar?
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-md">
          Fale com nossa equipe e garanta a conformidade da sua empresa.
        </h3>
      </motion.div>

      <motion.div variants={scaleIn} className="flex-shrink-0">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[hsl(var(--brand-red))] hover:bg-red-700 text-white text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded-sm transition-all duration-200 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
          </svg>
          Entrar em contato
        </a>
      </motion.div>
    </motion.div>
  </section>
);

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function PoliticaQualidadePage() {
  return (
    <>
      <HeroBanner />
      <PoliticaTimelineSection />
      <MissaoVisaoSection />
      <ValoresSection />
      <CtaSection />
    </>
  );
}