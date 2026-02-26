import Header from "@/components/ui/Header";
import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import PurposeSection from "@/components/ui/PurposeSection";
import ServicesSection from "@/components/ui/ServicesSection";
import EventsSection from "@/components/ui/EventsSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import CareersSection from "@/components/ui/CareersSection";
import ContactSection from "@/components/ui/ContactSection";
import Footer from "@/components/ui/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <PurposeSection />
      <ServicesSection />
      <EventsSection />
      <TestimonialsSection />
      <CareersSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}