"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const headerBg = isScrolled
  ? "bg-[hsl(var(--header-bg))] header-blur shadow-[var(--shadow-elegant)]"
  : "bg-transparent";

  const textColor = isScrolled ? "text-[hsl(var(--header-text))]" : "text-white";
 const borderColor = isScrolled ? "border-[hsl(var(--header-text))]/20" : "border-white/20";
  const mobileBg = isScrolled ? "bg-[hsl(var(--header-bg))] header-blur" : "bg-black";

  const linkClass = textColor + " hover:text-[hsl(var(--brand-red))] font-medium transition-colors duration-300";
  const iconClass = textColor + " hover:text-[hsl(var(--brand-red))] transition-colors duration-300 hover:scale-110";

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "QUEM SOMOS", href: "/#sobre" },
    { label: "SERVIÇOS", href: "/servicos" },
    { label: "CERTIFICAÇÕES", href: "/certificacoes" },
    { label: "CONTATO", href: "/#contato" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg} ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/tecnoiso-logo.png"
                alt="Tecnoiso Logo"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Redes sociais desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className={"flex items-center space-x-4 border-l pl-6 " + borderColor}>
              <a href="https://www.instagram.com/tecnoiso/" target="_blank" rel="noopener noreferrer" className={iconClass}>
                <Instagram size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={iconClass}>
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/tecnoso-tecnologia-e-soluções-industriais-ltda/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className={iconClass}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Botão mobile */}
          <Button
            variant="ghost"
            size="icon"
            className={"lg:hidden hover:text-[hsl(var(--brand-red))] " + textColor}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className={"lg:hidden mt-4 py-4 rounded-lg " + mobileBg}>
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-[hsl(var(--brand-red))] font-medium px-4 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;