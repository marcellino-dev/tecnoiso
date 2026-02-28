"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const slide1 = "/slide1-precision.jpg";
const slide2 = "/slide2-calibration.jpg";
const slide3 = "/slide3-certification.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: slide1,
      title: "Precisão,",
      subtitle: "confiabilidade e",
      highlight: "excelência em",
      accent: "metrologia.",
    },
    {
      image: slide2,
      title: "Calibração",
      subtitle: "de alta precisão",
      highlight: "com certificação",
      accent: "INMETRO.",
    },
    {
      image: slide3,
      title: "Certificação",
      subtitle: "e consultoria",
      highlight: "em sistemas de",
      accent: "qualidade.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

 const handleServicesClick = () => {
  document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
};

  return (
    <section id="home" className="h-[700px] relative overflow-hidden">
      {/* Slides usando <img> em vez de background-image */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Overlay escuro para legibilidade do texto */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[hsl(var(--brand-red))]/80 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[hsl(var(--brand-red))]/80 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      <div className="container mx-auto px-4 py-20 relative z-10 h-[750px] flex items-center justify-start">
        <div className="max-w-2xl text-left">
          <div key={currentSlide}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
              <br />
              {slides[currentSlide].subtitle}
              <br />
              {slides[currentSlide].highlight}
              <br />
              <span className="text-[hsl(var(--brand-red))] font-bold">
                {slides[currentSlide].accent}
              </span>
            </h1>

            <Button
              size="lg"
              onClick={handleServicesClick}
              className="bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] hover:from-[hsl(var(--brand-red-dark))] hover:to-[hsl(var(--brand-red))] text-white px-8 py-5 text-base font-semibold transition-all duration-500 hover:scale-105 rounded-full"
            >
              CONHECER SERVIÇOS
              <ChevronRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[hsl(var(--brand-red))] scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;