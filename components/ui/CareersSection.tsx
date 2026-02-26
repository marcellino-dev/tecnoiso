"use client";

import { Briefcase, Send, TrendingUp, Users, Heart } from "lucide-react";

const CareersSection = () => {
  const benefits = [
    { icon: TrendingUp, title: "Crescimento Profissional", description: "Plano de carreira e treinamentos contínuos" },
    { icon: Users, title: "Equipe Qualificada", description: "Trabalhe com especialistas em metrologia" },
    { icon: Heart, title: "Ambiente Colaborativo", description: "Cultura de respeito e valorização" },
  ];

  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[hsl(var(--brand-red))] font-semibold text-sm tracking-widest uppercase mb-3 block">
                Carreiras
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trabalhe <span className="text-[hsl(var(--brand-red))]">Conosco</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Faça parte de uma equipe que é referência em metrologia e calibração no Brasil. Buscamos profissionais comprometidos com a excelência técnica e inovação.
              </p>

              <div className="space-y-5 mb-10">
                {benefits.map((benefit, index) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--brand-red))]/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={20} className="text-[hsl(var(--brand-red))]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="mailto:rh@tecnoiso.com.br?subject=Trabalhe Conosco - Candidatura"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[hsl(var(--brand-red))] text-[hsl(var(--brand-white))] font-semibold rounded-xl hover:bg-[hsl(var(--brand-red-dark))] transition-colors duration-300"
              >
                <Send size={16} />
                Enviar Currículo
              </a>
            </div>

            <div className="relative">
              <div className="bg-muted/30 border border-border rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--brand-red))]/5 rounded-full blur-3xl" />
                <Briefcase size={48} className="text-[hsl(var(--brand-red))]/20 mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Junte-se à Tecnoiso</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Estamos sempre em busca de talentos nas áreas de metrologia, engenharia, qualidade e administração.
                </p>
                <div className="space-y-3">
                  {["Engenharia de Medição", "Técnico em Calibração", "Qualidade e Normas", "Administrativo"].map((role) => (
                    <div key={role} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[hsl(var(--brand-red))]" />
                      <span className="text-foreground">{role}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Envie seu currículo para{" "}
                    <a href="mailto:rh@tecnoiso.com.br" className="text-[hsl(var(--brand-red))] font-medium hover:underline">
                      rh@tecnoiso.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;