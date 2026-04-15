"use client";

import { useEffect, useState } from "react";

const HeroBannerServicos = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[340px] overflow-hidden">
      <img
        src="/banner/slide1-precision.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
      
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Nossos{" "}
          <span className="text-[hsl(var(--brand-red))]">Serviços</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroBannerServicos;