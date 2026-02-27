"use client";

import Image from "next/image";

const partners = [
  { name: "Endress+Hauser", logo: "/parcerias/endress+hause.png" },
  { name: "K&L Laboratórios", logo: "/parcerias/k&l.jpg" },
  { name: "Tupy", logo: "/parcerias/tupy.jpg" },
  { name: "Unisociesc", logo: "/parcerias/unisociesc.png" },
];

// Duplica para o loop infinito ficar suave
const allPartners = [...partners, ...partners, ...partners];

const PartnersCarousel = () => {
  return (
    <section className="py-12 border-y border-border/50 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Empresas que confiam na Tecnoiso
        </p>
      </div>

      <div className="relative">
        {/* Gradiente esquerda */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Gradiente direita */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll gap-16 w-max">
          {allPartners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-40 h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain max-h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;