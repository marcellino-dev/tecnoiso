import Header from "@/components/Header";
import HeroBannerServicos from "@/components/Herobannerservico";
import ServicosSection from "@/components/ServicosSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Serviços | Tecnoiso",
  description: "Soluções completas em metrologia, calibração e automação industrial com certificação INMETRO.",
};

export default function ServicosPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBannerServicos />
        <ServicosSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}