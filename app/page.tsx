import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PurposeSection from "@/components/PurposeSection";





import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

import EventsSection from "@/components/EventosSection";

export default function Home() {
  return (
    <>
    
      <Header />
      <main>
        <HeroSection />
       
        <AboutSection />
        <PurposeSection />
   
                <EventsSection />
      
        
        <ContactSection />

      </main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}