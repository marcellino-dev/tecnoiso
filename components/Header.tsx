"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Facebook, Linkedin, ShoppingBag } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

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

  const menuItems = [
    { label: "HOME", href: "#home" },
    { label: "QUEM SOMOS", href: "#sobre" },
    { label: "SERVIÇOS", href: "#servicos" },
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

          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))] font-medium transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

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

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[hsl(var(--hero-text))] hover:text-[hsl(var(--brand-red))]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

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
              <a
                href="https://tecnoiso-shop.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[hsl(var(--header-text))] hover:text-[hsl(var(--brand-red))] font-semibold px-4 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag size={18} />
                SHOP
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;