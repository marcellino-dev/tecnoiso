"use client";

import { Users, Building2, MapPin } from "lucide-react";
import Image from "next/image";

const PurposeSection = () => {
  return (
    <section className="py-20 bg-[hsl(var(--background))] relative overflow-hidden">

      {/* ── Decorativos de fundo ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[hsl(var(--brand-red))]/10 via-[hsl(var(--primary))]/5 to-transparent rounded-bl-[12rem]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[hsl(var(--brand-red))]/8 to-[hsl(var(--primary))]/3 rounded-tr-[10rem]" />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-[hsl(var(--brand-red))] rounded-full opacity-60" />
        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-[hsl(var(--brand-red))]/50 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── COLUNA ESQUERDA ── */}
          <div className="order-2 lg:order-1">

            {/* Título — "Propósito" em vermelho na mesma linha que o resto */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[hsl(var(--foreground))]">
              <span className="text-[hsl(var(--brand-red))]">Propósito</span>
              <br />
              Transformar o segmento de manufatura através de
            </h2>

            {/* Palavras-chave em vermelho com bullet */}
            <div className="space-y-1 mb-6">
              {["TECNOLOGIA", "INOVAÇÃO", "DESENVOLVIMENTO"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[hsl(var(--brand-red))] rounded-full flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-bold text-[hsl(var(--brand-red))] uppercase tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Texto complementar */}
            <p className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed mb-10">
              da nossa equipe, inspirando nossos clientes a criar soluções tecnológicas de ponta.
            </p>

            {/* Cards de stats — sem borda visível, fundo sutil */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[hsl(var(--card))] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">25+</span>
                </div>
                <h4 className="font-bold text-[hsl(var(--foreground))] mb-1">Anos de Experiência</h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Em metrologia e qualidade</p>
              </div>

              <div className="bg-[hsl(var(--card))] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3mi+</span>
                </div>
                <h4 className="font-bold text-[hsl(var(--foreground))] mb-1">Clientes Atendidos</h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">Em todo o território nacional</p>
              </div>
            </div>
          </div>

          {/* ── COLUNA DIREITA: mapa + estatísticas ── */}
          <div className="order-1 lg:order-2">

            {/* Título da coluna direita */}
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[hsl(var(--foreground))]">
              Atendendo com <span className="text-[hsl(var(--brand-red))]">Excelência</span>
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6">

              {/* Mapa 3D do Brasil */}
              <div className="flex-shrink-0 flex justify-center">
                <Image
                  src="/brazil-map-3d.png"
                  alt="Mapa do Brasil - Atuação Nacional da Tecnoiso"
                  width={280}
                  height={280}
                  className="w-56 md:w-64 h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Cards de estatísticas nacionais */}
              <div className="flex-1 space-y-3 w-full">
                {[
                  { icon: Users,     value: "3.654", label: "CLIENTES ATENDIDOS" },
                  { icon: Building2, value: "379",   label: "CIDADES"            },
                  { icon: MapPin,    value: "24",     label: "ESTADOS"            },
                ].map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 bg-[hsl(var(--card))] p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* Ícone com fundo vermelho circular */}
                    <div className="w-12 h-12 bg-[hsl(var(--brand-red))] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-[hsl(var(--foreground))]">{value}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-widest">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PurposeSection;