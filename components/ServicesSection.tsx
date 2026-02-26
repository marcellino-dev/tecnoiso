"use client";

/**
 * ServicesSection.tsx
 *
 * Seção de serviços da Tecnoiso.
 * Exibe os 6 serviços principais em um grid responsivo com
 * cards animados, efeito de número sequencial e hover rico.
 *
 * @author  Tecnoiso Dev
 * @version 2.0.0
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  Shield,
  Settings,
  FileCheck,
  Wrench,
  Microscope,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  /** Rótulo de destaque exibido no canto superior direito do card */
  badge?: string;
}

// ─────────────────────────────────────────────
// Dados dos serviços
// ─────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    icon: Gauge,
    title: "Calibração de Instrumentos",
    description:
      "Calibração de equipamentos de medição com certificados rastreáveis ao INMETRO.",
    features: [
      "Instrumentos de pressão",
      "Equipamentos de temperatura",
      "Instrumentos dimensionais",
    ],
    badge: "Popular",
  },
  {
    icon: FileCheck,
    title: "Certificação Metrológica",
    description:
      "Emissão de certificados de calibração com rastreabilidade garantida.",
    features: [
      "Certificados RBC",
      "Rastreabilidade INMETRO",
      "Documentação completa",
    ],
  },
  {
    icon: Settings,
    title: "Manutenção Técnica",
    description:
      "Serviços especializados de manutenção preventiva e corretiva.",
    features: [
      "Manutenção preventiva",
      "Reparo especializado",
      "Suporte técnico",
    ],
  },
  {
    icon: Shield,
    title: "Consultoria em Qualidade",
    description:
      "Assessoria para implementação de sistemas de gestão da qualidade.",
    features: ["ISO 9001", "ISO/IEC 17025", "Auditorias internas"],
    badge: "Novo",
  },
  {
    icon: Microscope,
    title: "Análises Laboratoriais",
    description:
      "Ensaios e análises técnicas com equipamentos de alta precisão.",
    features: [
      "Análises químicas",
      "Testes de materiais",
      "Relatórios técnicos",
    ],
  },
  {
    icon: Wrench,
    title: "Treinamentos",
    description:
      "Capacitação técnica em metrologia e sistemas de qualidade.",
    features: [
      "Cursos técnicos",
      "Treinamento in-company",
      "Certificação profissional",
    ],
  },
];

// ─────────────────────────────────────────────
// Sub-componente: ServiceCard
// ─────────────────────────────────────────────

interface ServiceCardProps {
  service: Service;
  /** Índice base-0 para exibir o número sequencial */
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

/**
 * Card individual de serviço.
 * Gerencia internamente o estado de hover via props
 * para que o grid pai possa coordenar efeitos entre cards.
 */
const ServiceCard = ({ service, index, isActive, onHover }: ServiceCardProps) => {
  const Icon = service.icon;
  /** Número formatado com zero à esquerda: 01, 02 … */
  const cardNumber = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`
        group relative flex flex-col bg-card border rounded-2xl p-7 cursor-default
        transition-all duration-500 overflow-hidden
        ${isActive
          ? "border-[hsl(var(--brand-red))]/60 shadow-[0_8px_40px_hsl(var(--brand-red)/0.18)] -translate-y-2"
          : "border-border hover:border-[hsl(var(--brand-red))]/30"
        }
      `}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      aria-label={`Serviço: ${service.title}`}
    >
      {/* ── Fundo decorativo: número gigante ── */}
      <span
        aria-hidden="true"
        className={`
          absolute -top-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none
          transition-all duration-500
          ${isActive
            ? "text-[hsl(var(--brand-red))]/10 scale-110"
            : "text-muted/5"
          }
        `}
      >
        {cardNumber}
      </span>

      {/* ── Badge opcional (ex.: "Popular", "Novo") ── */}
      {service.badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-[hsl(var(--brand-red))]/10 text-[hsl(var(--brand-red))] border border-[hsl(var(--brand-red))]/20">
          {service.badge}
        </span>
      )}

      {/* ── Ícone ── */}
      <div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative z-10
          transition-all duration-500
          ${isActive
            ? "bg-[hsl(var(--brand-red))] shadow-[0_4px_20px_hsl(var(--brand-red)/0.4)]"
            : "bg-[hsl(var(--brand-red))]/10"
          }
        `}
      >
        <Icon
          className={`w-6 h-6 transition-colors duration-500 ${isActive ? "text-white" : "text-[hsl(var(--brand-red))]"}`}
        />
      </div>

      {/* ── Número sequencial pequeno (acessível) ── */}
      <span className="text-xs font-mono text-muted-foreground/50 mb-1 relative z-10">
        {cardNumber}
      </span>

      {/* ── Título ── */}
      <h3 className="text-lg font-bold text-foreground mb-3 relative z-10 leading-tight">
        {service.title}
      </h3>

      {/* ── Descrição ── */}
      <p className="text-sm text-muted-foreground mb-5 relative z-10 flex-grow leading-relaxed">
        {service.description}
      </p>

      {/* ── Lista de features ── */}
      <ul className="space-y-2 mb-6 relative z-10">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2
              className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                isActive ? "text-[hsl(var(--brand-red))]" : "text-muted-foreground/40"
              }`}
            />
            {feature}
          </li>
        ))}
      </ul>

      {/* ── CTA ── */}
      <Button
        variant="ghost"
        size="sm"
        className={`
          w-full justify-between relative z-10 transition-all duration-300
          ${isActive
            ? "bg-[hsl(var(--brand-red))]/10 text-[hsl(var(--brand-red))] hover:bg-[hsl(var(--brand-red))]/20"
            : "text-muted-foreground hover:text-foreground"
          }
        `}
      >
        Saiba mais
        <ArrowRight
          className={`w-4 h-4 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}
        />
      </Button>
    </article>
  );
};

// ─────────────────────────────────────────────
// Componente principal: ServicesSection
// ─────────────────────────────────────────────

const ServicesSection = () => {
  /**
   * Índice do card atualmente com hover (ou null).
   * Elevado ao pai para coordenar efeitos visuais entre cards.
   */
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="servicos"
      className="py-24 bg-gradient-to-b from-[hsl(var(--brand-gray))] to-background relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* ── Elementos decorativos de fundo ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--brand-red))]/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute top-32 right-0 w-64 h-64 bg-[hsl(var(--brand-red))]/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-32 left-0 w-48 h-48 bg-[hsl(var(--brand-red))]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Cabeçalho da seção ── */}
        <header className="text-center mb-16 max-w-3xl mx-auto">
          {/* Pílula de identificação */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsl(var(--brand-red))]/20 bg-[hsl(var(--brand-red))]/5 text-[hsl(var(--brand-red))] text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-red))] animate-pulse" />
            O que oferecemos
          </div>

          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight"
          >
            Nossos{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              Serviços
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Soluções especializadas em metrologia, calibração e certificação —
            do instrumento ao certificado, com rastreabilidade garantida.
          </p>
        </header>

        {/* ── Grade de cards ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>

        {/* ── Rodapé da seção: CTA secundário ── */}
        <div className="mt-14 text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            Não encontrou o que precisa?
          </p>
          <Button
            variant="outline"
            className="border-[hsl(var(--brand-red))]/30 text-[hsl(var(--brand-red))] hover:bg-[hsl(var(--brand-red))]/5 hover:border-[hsl(var(--brand-red))]/60 transition-all duration-300"
          >
            Entre em contato com nossa equipe
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;