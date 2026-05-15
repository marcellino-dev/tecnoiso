"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const logoItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Lista de logos com src apontando para /public/clientes/
const clientes = [
  { nome: "Heineken", src: "/parcerias/heinekenlogo.png" },
  { nome: "Coca-Cola", src: "/parcerias/cocacola.png" },
  { nome: "Porto Ilapoá", src: "/parcerias/itapoa.png" },
  { nome: "Descarpack", src: "/parcerias/descarpack.png" },
  { nome: "Docol", src: "/parcerias/docol.png" },
  { nome: "Portos do Paraná", src: "/parcerias/parana.jpg" },
  { nome: "Lactalis", src: "/parcerias/Lactalis_logo.svg.png" },
  { nome: "Tigre", src: "/parcerias/tigre-logo.png" },
  { nome: "Tirol", src: "/parcerias/tirol.png" },
  { nome: "Cristalpet", src: "/parcerias/unnamed.png" },
  { nome: "Carbus", src: "/parcerias/carbuss.png" },
  { nome: "Unimed", src: "/parcerias/Logo_unimed1.svg.png" },
];

const ClientesSection = () => {
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

        {/* Grade de logos */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0 }}
        >
          {clientes.map((cliente) => (
            <motion.div
              key={cliente.nome}
              variants={logoItem}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-[hsl(var(--brand-red))] hover:shadow-lg transition-colors duration-300"
            >
              <img
                src={cliente.src}
                alt={`Logo ${cliente.nome}`}
              className="max-h-12 w-auto object-contain transition-transform duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientesSection;