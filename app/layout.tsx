import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import IntroAnimation from "@/components/IntroAnimation";

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
      </head>
      <body className="antialiased">
        {/*
          stage: container com overflow hidden e position relative.
          - intro-panel (absolute, 100vh) fica em cima
          - site-content fica logo abaixo no fluxo normal
          Quando a animação dispara, intro-panel e site-content
          sobem juntos via translateY(-100%) sincronizado,
          criando o efeito de puxar o site para cima.
        */}
        <div
          id="stage"
          style={{
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        >
          <IntroAnimation />

          <div id="site-content" style={{ marginTop: "100vh" }}>
            {children}
          </div>
        </div>

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