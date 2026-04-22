"use client";

import { useRef } from "react";
import AlertBanner       from "./components/AlertBanner";
import HeroSection       from "./components/HeroSection";
import RiscosSection     from "./components/RiscosSection";
import DiferenciaisSection from "./components/DiferenciaisSection";
import GrandezasSection  from "./components/GrandezasSection";
import OrcamentoSection  from "./components/OrcamentoSection";
import CtaBanner         from "./components/CtaBanner";
import FaqSection        from "./components/FaqSection";
import PageFooter        from "./components/PageFooter";

export default function CalibracaoPage() {
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ background: "#fff" }}>
      <AlertBanner        onCtaClick={scrollToForm} />
      <HeroSection        onCtaClick={scrollToForm} />
      <RiscosSection />
      <DiferenciaisSection />
      <GrandezasSection   onCtaClick={scrollToForm} />
      <OrcamentoSection   ref={formRef} />
      <CtaBanner          onCtaClick={scrollToForm} />
      <FaqSection />
      <PageFooter />
    </main>
  );
}