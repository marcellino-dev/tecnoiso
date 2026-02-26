"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Shield, Settings, FileCheck, Wrench, Microscope } from "lucide-react";

const ServicesSection = () => {
  const services = [
    { icon: Gauge, title: "Calibração de Instrumentos", description: "Calibração de equipamentos de medição com certificados rastreáveis ao INMETRO", features: ["Instrumentos de pressão", "Equipamentos de temperatura", "Instrumentos dimensionais"] },
    { icon: FileCheck, title: "Certificação Metrológica", description: "Emissão de certificados de calibração com rastreabilidade garantida", features: ["Certificados RBC", "Rastreabilidade INMETRO", "Documentação completa"] },
    { icon: Settings, title: "Manutenção Técnica", description: "Serviços especializados de manutenção preventiva e corretiva", features: ["Manutenção preventiva", "Reparo especializado", "Suporte técnico"] },
    { icon: Shield, title: "Consultoria em Qualidade", description: "Assessoria para implementação de sistemas de gestão da qualidade", features: ["ISO 9001", "ISO/IEC 17025", "Auditorias internas"] },
    { icon: Microscope, title: "Análises Laboratoriais", description: "Ensaios e análises técnicas com equipamentos de alta precisão", features: ["Análises químicas", "Testes de materiais", "Relatórios técnicos"] },
    { icon: Wrench, title: "Treinamentos", description: "Capacitação técnica em metrologia e sistemas de qualidade", features: ["Cursos técnicos", "Treinamento in-company", "Certificação profissional"] },
  ];

  return (
    <section id="servicos" className="py-20 bg-gradient-to-b from-[hsl(var(--brand-gray))] to-background relative overflow-hidden">
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[hsl(var(--brand-red))]/5 to-transparent rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="relative text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nossos <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">Serviços</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma ampla gama de serviços especializados em metrologia, calibração e certificação para atender todas as necessidades do seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-[var(--shadow-red)] transition-all duration-500 hover:-translate-y-3 border-0 bg-card overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[hsl(var(--brand-red))]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-[hsl(var(--brand-red))]/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500">
                  <service.icon className="w-8 h-8 text-[hsl(var(--brand-red))]" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[hsl(var(--brand-red))] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:border-[hsl(var(--brand-red))] group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Saiba Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;