"use client"

import { motion, Variants } from "framer-motion";
import { CheckCircle, ArrowLeft, Clock, Phone, Mail } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-[hsl(var(--brand-gray))] flex items-center justify-center px-4 py-24">

      <motion.div
        className="fixed top-20 right-10 w-80 h-80 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-transparent rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-2xl w-full relative z-10"
        variants={stagger}
        initial="hidden"
        animate="show"
      >

        {/* Ícone */}
        <motion.div variants={fadeUp} className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center ring-1 ring-green-500/20">
            <CheckCircle className="w-11 h-11 text-green-500" />
          </div>
        </motion.div>

        {/* Headline + Subheadline */}
        <motion.div variants={fadeUp} className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--brand-red))] mb-3">
            Solicitação recebida com sucesso.
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Obrigado pelo seu<br />
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] bg-clip-text">
              contato!
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa equipe técnica irá analisar as informações enviadas para preparar seu atendimento.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="border-t border-border mb-10" />

        {/* Texto principal */}
        <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed mb-10">
          <p>
            Sua solicitação de orçamento foi registrada em nosso sistema e será encaminhada para a equipe responsável pela área técnica relacionada ao serviço solicitado.
          </p>
          <p>
            Caso seja necessário, um especialista poderá entrar em contato para entender melhor a aplicação, os equipamentos envolvidos ou os requisitos do processo.
          </p>
          <p>
            Esse cuidado garante que o orçamento seja elaborado com <strong className="text-foreground">precisão técnica e aderência às necessidades da operação.</strong>
          </p>
        </motion.div>

        {/* Prazo */}
        <motion.div variants={fadeUp} className="flex items-start gap-4 bg-[hsl(var(--brand-red))]/5 border border-[hsl(var(--brand-red))]/20 rounded-2xl p-5 mb-10">
          <Clock className="w-5 h-5 text-[hsl(var(--brand-red))] mt-0.5 shrink-0" />
          <p className="text-foreground">
            Normalmente nosso time responde em <strong>até 1 dia útil</strong>, dependendo da complexidade da solicitação.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="border-t border-border mb-10" />

        {/* Rodapé */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-3">
            <a href="tel:4734383175" className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--brand-red))] transition-colors text-sm">
              <Phone className="w-4 h-4 text-[hsl(var(--brand-red))]" />
              (47) 3438-3175
            </a>
            <a href="mailto:contato@tecnoiso.com.br" className="flex items-center gap-2 text-muted-foreground hover:text-[hsl(var(--brand-red))] transition-colors text-sm">
              <Mail className="w-4 h-4 text-[hsl(var(--brand-red))]" />
              contato@tecnoiso.com.br
            </a>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] text-white font-semibold px-7 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Link>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="text-xs text-muted-foreground mt-8 text-center">© 2026 TECNOISO — Todos os direitos reservados.</p>
        </motion.div>

      </motion.div>
    </main>
  );
}