"use client"

import { motion, Variants } from "framer-motion";
import { Download, ExternalLink, Award, Shield } from "lucide-react";
import Link from "next/link";

const certificados = [
  {
    titulo: "Certificado de Qualidade ABNT",
    descricao: "Certificado ISO 9001:2015 — Válido até 08/07/2028",
    arquivo: "/certificacoes/certificado-abnt-iso9001.pdf",
    icone: Award,
    badge: "ISO 9001:2015",
  },
  {
    titulo: "Acreditação RBC INMETRO",
    descricao: "Acreditação RBC (INMETRO) CAL 0621 — ISO 17025",
    arquivo: "/certificacoes/acreditacao-inmetro-cal0621.pdf",
    icone: Shield,
    badge: "INMETRO",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function CertificacoesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-[hsl(var(--brand-gray))] py-20 px-4">

      {/* Fundo decorativo */}
      <motion.div
        className="fixed top-20 left-10 w-64 h-64 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-[hsl(var(--brand-red))]/5 to-transparent rounded-full blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">

        {/* Título */}
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--brand-red))] mb-3">
            Documentos Oficiais
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-5">
            Nossas{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              Certificações
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A Tecnoiso é acreditada pelo INMETRO e certificada pelas principais normas de qualidade. Acesse abaixo os documentos oficiais.
          </motion.p>
        </motion.div>

        {/* Cards dos certificados */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {certificados.map((cert, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-2xl p-6 shadow-lg hover:shadow-[var(--shadow-red-soft)] transition-shadow duration-300 flex flex-col gap-5"
            >
              {/* Ícone + Badge */}
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 bg-[hsl(var(--brand-red))]/10 rounded-xl flex items-center justify-center">
                  <cert.icone className="w-7 h-7 text-[hsl(var(--brand-red))]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider bg-[hsl(var(--brand-red))]/10 text-[hsl(var(--brand-red))] px-3 py-1 rounded-full">
                  {cert.badge}
                </span>
              </div>

              {/* Título e descrição */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">{cert.titulo}</h2>
                <p className="text-sm text-muted-foreground">{cert.descricao}</p>
              </div>

              {/* Botões */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={cert.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:opacity-90 transition-opacity duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visualizar
                </a>
                <a
                  href={cert.arquivo}
                  download
                  className="flex items-center justify-center gap-2 border border-[hsl(var(--brand-red))]/30 text-[hsl(var(--brand-red))] text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-[hsl(var(--brand-red))]/5 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  Baixar
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Voltar */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            ← Voltar para o início
          </Link>
        </motion.div>

      </div>
    </main>
  );
}