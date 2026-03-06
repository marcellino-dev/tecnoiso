"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Facebook, Linkedin, ChevronDown } from "lucide-react";
import Image from "next/image";

const services = [
  "Calibração",
  "Certificação",
  "Manutenção",
  "NR 13",
  "Automação",
  "Treinamentos",
  "Gerenciamento Metrológico",
  "Vendas",
  "Locação",
  "Suporte Logístico",
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      if (currentY > 100) {
        setIsHeaderVisible(currentY < lastScrollY.current);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Abre imediatamente, fecha com delay para permitir mover o mouse até o dropdown
  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 120);
  };

  const menuItems = [
    { label: "HOME", href: "#home" },
    { label: "QUEM SOMOS", href: "#sobre" },
    { label: "SERVIÇOS", href: "#servicos", hasDropdown: true },
    { label: "CERTIFICAÇÕES", href: "#certificacoes" },
    { label: "CONTATO", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[hsl(var(--header-bg))] header-blur shadow-[var(--shadow-elegant)]"
          : "bg-transparent"
      } ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/tecnoiso-logo.png"
              alt="Tecnoiso Logo"
              width={120}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={item.href}
                    className="flex items-center gap-1 text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] font-medium transition-colors duration-300"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-[hsl(var(--brand-red))]" : ""}`}
                    />
                  </a>

                  {/* Ponte invisível entre o link e o dropdown para não fechar ao mover o mouse */}
                  <div className="absolute top-full left-0 w-full h-3" />

                  {/* Dropdown */}
                  <div
                    className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 transition-all duration-200 ${
                      isServicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Triângulo decorativo */}
                    <div className="flex justify-center mb-0">
                      <div className="w-3 h-3 bg-white rotate-45 shadow-sm" />
                    </div>

                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden -mt-1.5">
                      {services.map((service, i) => (
                        <a
                          key={service}
                          href="#servicos"
                          className={`flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-[hsl(var(--brand-red))] hover:text-white transition-colors duration-200 group ${
                            i !== services.length - 1 ? "border-b border-gray-100" : ""
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--brand-red))] group-hover:bg-white transition-colors duration-200 flex-shrink-0" />
                          {service}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] font-medium transition-colors duration-300"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Redes sociais desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 border-l border-[hsl(var(--hero-text))]/20 pl-6">
              <a href="https://www.instagram.com/tecnoiso/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] transition-colors duration-300 hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] transition-colors duration-300 hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/tecnoso-tecnologia-e-soluções-industriais-ltda/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] transition-colors duration-300 hover:scale-110">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Botão mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 bg-[hsl(var(--header-bg))] header-blur rounded-lg">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[hsl(var(--header-text))] hover:text-[hsl(var(--brand-red))] font-medium px-4 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2 border-t border-gray-200/20">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Nossos Serviços</p>
                <div className="flex flex-col space-y-2">
                  {services.map((service) => (
                    <a
                      key={service}
                      href="#servicos"
                      className="text-[hsl(var(--header-text))]/70 hover:text-[hsl(var(--brand-red))] text-sm transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;