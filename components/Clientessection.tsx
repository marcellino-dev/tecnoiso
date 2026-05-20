"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

// Variantes de entrada/saída — efeito "emergindo de trás"
const gridVariants: Variants = {
  enter: { transition: { staggerChildren: 0.06 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const cardVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.55,
    rotateY: -14,
    z: -160,
  },
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    z: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.55,
    rotateY: 14,
    z: -160,
    transition: { duration: 0.28, ease: [0.55, 0, 0.45, 1] },
  },
};

const clientes = [
  { nome: "Heineken",       src: "/parcerias/heinekenlogo.png" },
  { nome: "Coca-Cola",      src: "/parcerias/cocacola.png" },
  { nome: "Porto Ilapoá",   src: "/parcerias/itapoa.png" },
  { nome: "Descarpack",     src: "/parcerias/descarpack.png" },
  { nome: "Docol",          src: "/parcerias/docol.png" },
  { nome: "Portos do Paraná", src: "/parcerias/parana.jpg" },
  { nome: "Lactalis",       src: "/parcerias/Lactalis_logo.svg.png" },
  { nome: "Tigre",          src: "/parcerias/tigre-logo.png" },
  { nome: "Tirol",          src: "/parcerias/tirol.png" },
  { nome: "Cristalpet",     src: "/parcerias/unnamed.png" },
  { nome: "Carbus",         src: "/parcerias/carbuss.png" },
  { nome: "Unimed",         src: "/parcerias/Logo_unimed1.svg.png" },
];

const PER_PAGE = 6;        // quantos logos por "página"
const INTERVAL_MS = 3200;  // tempo entre rotações

const ClientesCarousel = () => {
  const [page, setPage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalPages = Math.ceil(clientes.length / PER_PAGE);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [totalPages]);

  const goTo = (idx: number) => {
    setPage(idx);
    startTimer(); // reinicia o timer ao clicar
  };

  const start = page * PER_PAGE;
  const visible = clientes.slice(start, start + PER_PAGE);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Cabeçalho */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-[hsl(var(--brand-red))] text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Empresas que confiam na Tecnoiso
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Empresas que escolheram a{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              TECNOISO
            </span>{" "}
            para garantir suas medições
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Indústrias líderes dos segmentos alimentício, bebidas, saúde,
            logística, petróleo e construção civil confiam em nossos serviços de
            calibração e metrologia.
          </motion.p>
        </motion.div>

        {/* Carrossel com efeito 3D */}
        <div style={{ perspective: "900px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center"
              variants={gridVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
            >
              {visible.map((cliente) => (
                <motion.div
                  key={cliente.nome}
                  variants={cardVariants}
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="flex items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-[hsl(var(--brand-red))] hover:shadow-lg transition-colors duration-300"
                >
                  <img
                    src={cliente.src}
                    alt={`Logo ${cliente.nome}`}
                    className="max-h-12 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots de navegação */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Página ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === page
                  ? "bg-[hsl(var(--brand-red))] scale-125"
                  : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientesCarousel;