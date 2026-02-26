"use client";

import { Award, CheckCircle, Target, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    { icon: Award, title: "Certificação", description: "Laboratório acreditado com padrões internacionais de qualidade" },
    { icon: CheckCircle, title: "Precisão", description: "Equipamentos de última geração para máxima precisão nas medições" },
    { icon: Target, title: "Confiabilidade", description: "Processos rigorosos que garantem resultados consistentes e confiáveis" },
    { icon: Users, title: "Experiência", description: "Equipe especializada com anos de experiência em metrologia" },
  ];

  const stats = [
    { value: "20+", label: "Anos de experiência" },
    { value: "5000+", label: "Calibrações realizadas" },
    { value: "100%", label: "Satisfação dos clientes" },
    { value: "24h", label: "Atendimento ágil" },
  ];

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[hsl(var(--brand-red))]/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-[hsl(var(--card))] border border-border/50 hover:border-[hsl(var(--brand-red))]/30 hover:shadow-[var(--shadow-red-soft)] transition-all duration-500">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-br from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] bg-clip-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Somos sua melhor escolha em{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              calibração, certificação e serviços metrológicos.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            A Tecnoiso é referência no mercado nacional nos segmentos de calibração, manutenção, automação industrial e gerenciamento metrológico desde 2001.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Foco na modernidade, inovação, agilidade e atualização constante. Equipe altamente qualificada e proatividade são alguns dos diferenciais do nosso capital humano presentes em todos os produtos fabricados.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Presença nacional e atendimento individualizado é o que torna a Tecnoiso única.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-6 rounded-2xl bg-[hsl(var(--card))] border border-border/50 hover:border-[hsl(var(--brand-red))]/30 transition-all duration-500 hover:shadow-[var(--shadow-red-soft)] hover:-translate-y-1">
              <div className="w-14 h-14 mb-4 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-[hsl(var(--brand-red))]/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-7 h-7 text-[hsl(var(--brand-red))]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;