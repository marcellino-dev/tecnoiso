import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PurposeSection from "@/components/PurposeSection";
import ServicesSection from "@/components/ServicesSection";

import TestimonialsSection from "@/components/TestimonialsSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PurposeSection />
        <ServicesSection />
        
        <TestimonialsSection />
        <CareersSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}