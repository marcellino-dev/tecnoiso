"use client";

import { motion, Variants } from "framer-motion";
import { Users, Building2, MapPin } from "lucide-react";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const PurposeSection = () => {
  return (
    <section className="py-20 bg-[hsl(var(--background))] relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[hsl(var(--brand-red))]/10 via-[hsl(var(--primary))]/5 to-transparent rounded-bl-[12rem]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[hsl(var(--brand-red))]/8 to-[hsl(var(--primary))]/3 rounded-tr-[10rem]" />
        <motion.div
          className="absolute top-1/2 left-1/4 w-3 h-3 bg-[hsl(var(--brand-red))] rounded-full opacity-60"
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-[hsl(var(--brand-red))]/50 rounded-full"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* COLUNA ESQUERDA */}
          <motion.div
            className="order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={fadeRight} className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[hsl(var(--foreground))]">
              <span className="text-[hsl(var(--brand-red))]">Propósito</span>
              <br />
              Transformar o segmento de manufatura através de
            </motion.h2>

            <motion.div variants={stagger} className="space-y-1 mb-6">
              {["TECNOLOGIA", "INOVAÇÃO", "DESENVOLVIMENTO"].map((item) => (
                <motion.div key={item} variants={fadeRight} className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 bg-[hsl(var(--brand-red))] rounded-full flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <span className="text-xl md:text-2xl font-bold text-[hsl(var(--brand-red))] uppercase tracking-wide">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeRight} className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-10">
              da nossa equipe, inspirando nossos clientes a criar soluções tecnológicas de ponta.
            </motion.p>

            <motion.div variants={staggerFast} className="grid grid-cols-2 gap-4">
              {[
                { value: "25+", title: "Anos de Experiência", sub: "Em metrologia e qualidade" },
                { value: "3mi+", title: "Clientes Atendidos", sub: "Em todo o território nacional" },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-[hsl(var(--card))] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{card.value}</span>
                  </div>
                  <h4 className="font-bold text-[hsl(var(--foreground))] mb-1">{card.title}</h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">{card.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* COLUNA DIREITA */}
          <motion.div
            className="order-1 lg:order-2"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3 variants={fadeLeft} className="text-3xl md:text-4xl font-bold text-center mb-8 text-[hsl(var(--foreground))]">
              Atendendo com <span className="text-[hsl(var(--brand-red))]">Excelência</span>
            </motion.h3>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div
                className="flex-shrink-0 flex justify-center"
                variants={fadeLeft}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/brazil-map-3d.png"
                  alt="Mapa do Brasil"
                  width={280}
                  height={280}
                  className="w-56 md:w-64 h-auto object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.div variants={staggerFast} className="flex-1 space-y-3 w-full">
                {[
                  { icon: Users,     value: "3.654", label: "CLIENTES ATENDIDOS" },
                  { icon: Building2, value: "379",   label: "CIDADES" },
                  { icon: MapPin,    value: "24",     label: "ESTADOS" },
                ].map(({ icon: Icon, value, label }) => (
                  <motion.div
                    key={label}
                    variants={fadeLeft}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 bg-[hsl(var(--card))] p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <motion.div
                      className="w-12 h-12 bg-[hsl(var(--brand-red))] rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-2xl font-black text-[hsl(var(--foreground))]">{value}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest">{label}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PurposeSection;