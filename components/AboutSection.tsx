"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Award, CheckCircle, Target, Users } from "lucide-react";

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) { setDisplay(value); return; }
    const target = parseInt(match[1]);
    const suffix = match[2];
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.floor(eased * target)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  const isNumeric = /^\d/.test(value);
  return <span ref={ref}>{isNumeric ? display : value}</span>;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const AboutSection = () => {
  const features = [
    { icon: Award,       title: "Certificação",  description: "Laboratório acreditado com padrões internacionais de qualidade" },
    { icon: CheckCircle, title: "Precisão",       description: "Equipamentos de última geração para máxima precisão nas medições" },
    { icon: Target,      title: "Confiabilidade", description: "Processos rigorosos que garantem resultados consistentes e confiáveis" },
    { icon: Users,       title: "Experiência",    description: "Equipe especializada com anos de experiência em metrologia" },
  ];

  const stats = [
    { value: "20+",         label: "Anos de experiência" },
    { value: "5000+",       label: "Calibrações realizadas" },
    { value: "100%",        label: "Satisfação dos clientes" },
    { value: "Atendimento", label: "Personalizado" },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[hsl(var(--brand-red))]/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* STATS */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="text-center p-6 rounded-2xl bg-[hsl(var(--card))] border border-border/50 hover:border-[hsl(var(--brand-red))]/30 hover:shadow-[var(--shadow-red-soft)] transition-all duration-500"
            >
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-br from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] bg-clip-text mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* TEXTO CENTRAL */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Somos sua melhor escolha em{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              calibração, certificação e serviços metrológicos.
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
            A Tecnoiso é referência no mercado nacional nos segmentos de calibração, manutenção, automação industrial e gerenciamento metrológico desde 2001.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
            Foco na modernidade, inovação, agilidade e atualização constante. Equipe altamente qualificada e proatividade são alguns dos diferenciais do nosso capital humano presentes em todos os produtos fabricados.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            Presença nacional e atendimento individualizado é o que torna a Tecnoiso única.
          </motion.p>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerFast}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeLeft}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative p-6 rounded-2xl bg-[hsl(var(--card))] border border-border/50 hover:border-[hsl(var(--brand-red))]/30 transition-all duration-500 hover:shadow-[var(--shadow-red-soft)]"
            >
              <motion.div
                className="w-14 h-14 mb-4 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-[hsl(var(--brand-red))]/5 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <feature.icon className="w-7 h-7 text-[hsl(var(--brand-red))]" />
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;