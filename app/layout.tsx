import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import IntroAnimation from "@/components/IntroAnimation";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://tecnoiso.com.br"),
  title: { template: "%s | Tecnoiso", default: "Home- Tecnoiso" },
  description: "Laboratório acreditado INMETRO em Joinville/SC. Calibração, certificação, manutenção e consultoria em metrologia industrial. Solicite um orçamento.",
  keywords: "metrologia, calibração, certificação, INMETRO, qualidade, precisão, laboratório, Joinville, Santa Catarina",
  authors: [{ name: "Tecnoiso - Tecnologia e Soluções Industriais" }],
  alternates: { canonical: "/" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description: "Laboratório acreditado INMETRO. Calibração, certificação, manutenção e consultoria em metrologia industrial em Joinville/SC.",
    type: "website", url: "https://tecnoiso.com.br",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tecnoiso" }],
    locale: "pt_BR", siteName: "Tecnoiso",
  },
  twitter: {
    card: "summary_large_image", site: "@tecnoiso",
    title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description: "Laboratório acreditado INMETRO. Calibração, certificação e consultoria em metrologia industrial.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon.ico" },
    ],
    apple: "/favicons/apple-touch-icon.png",
    shortcut: "/favicons/android-chrome-192x192.png",
  },
  manifest: "/favicons/site.webmanifest",
};

const orgSchema = {
  "@context": "https://schema.org", "@type": "Organization",
  name: "Tecnoiso - Tecnologia e Soluções Industriais",
  url: "https://tecnoiso.com.br", logo: "https://tecnoiso.com.br/tecnoiso-logo.png",
  description: "Laboratório acreditado INMETRO especializado em metrologia, calibração e certificação industrial.",
  address: { "@type": "PostalAddress", streetAddress: "R. Dona Emma, 1541 - Floresta", addressLocality: "Joinville", addressRegion: "SC", postalCode: "89211-493", addressCountry: "BR" },
  telephone: "+5547989299801",
  sameAs: ["https://www.instagram.com/tecnoiso/", "https://www.facebook.com/tecnoiso/", "https://www.linkedin.com/company/tecnoso-tecnologia-e-soluções-industriais-ltda/"],
  contactPoint: { "@type": "ContactPoint", telephone: "+5547989299801", contactType: "customer service", availableLanguage: "Portuguese" },
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite",
  name: "Tecnoiso", url: "https://tecnoiso.com.br",
  potentialAction: { "@type": "SearchAction", target: "https://tecnoiso.com.br/?q={search_term_string}", "query-input": "required name=search_term_string" },
};

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "O que é calibração de instrumentos?", acceptedAnswer: { "@type": "Answer", text: "Calibração é o conjunto de operações que estabelece a relação entre valores indicados por um instrumento de medição e os valores correspondentes das grandezas estabelecidas por padrões, garantindo a confiabilidade metrológica." } },
    { "@type": "Question", name: "A Tecnoiso é acreditada pelo INMETRO?", acceptedAnswer: { "@type": "Answer", text: "Sim, a Tecnoiso possui laboratórios acreditados pelo INMETRO, garantindo que todos os serviços de calibração e certificação atendem às normas nacionais e internacionais de qualidade." } },
    { "@type": "Question", name: "Quais serviços a Tecnoiso oferece?", acceptedAnswer: { "@type": "Answer", text: "A Tecnoiso oferece calibração, certificação, manutenção de equipamentos, consultoria metrológica e treinamentos especializados, com laboratórios fixos e móveis." } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap" rel="stylesheet" />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5M69SNRH');
        ` }} />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5M69SNRH"
            height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <div
          id="stage"
          style={{ position: 'relative', overflowX: 'hidden', overflowY: 'hidden' }}
        >
          <IntroAnimation />
          <div
            id="site-content"
            style={{ marginTop: typeof window !== 'undefined' && sessionStorage.getItem('tecnoiso_intro_done') ? '0' : '100vh' }}
          >
            {children}
          </div>
        </div>

        {/* Botão WhatsApp — componente próprio, sem dependência externa */}
        <WhatsAppButton />

        <Toaster richColors position="top-right" />

        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, websiteSchema, faqSchema]) }}
        />
      </body>
    </html>
  );
}