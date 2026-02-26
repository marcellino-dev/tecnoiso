import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// metadataBase → Next.js usa isso para resolver URLs relativas em OG e canonical
// Sem isso, imagens OG e canonical ficam sem domínio em produção
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://tecnoiso.com.br"),

  title: {
    // template: usado nas páginas internas (ex.: "Serviços | Tecnoiso")
    template: "%s | Tecnoiso",
    default:
      "Tecnoiso - Metrologia, Calibração e Certificação Industrial | Joinville SC",
  },

  description:
    "Laboratório acreditado INMETRO em Joinville/SC. Calibração, certificação, manutenção e consultoria em metrologia industrial. Solicite um orçamento.",

  keywords:
    "metrologia, calibração, certificação, INMETRO, qualidade, precisão, laboratório, Joinville, Santa Catarina",

  authors: [{ name: "Tecnoiso - Tecnologia e Soluções Industriais" }],

  // ── Canonical ──────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    title:
      "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description:
      "Laboratório acreditado INMETRO. Calibração, certificação, manutenção e consultoria em metrologia industrial em Joinville/SC.",
    type: "website",
    url: "https://tecnoiso.com.br",
    // Caminho relativo → Next.js resolve para https://tecnoiso.com.br/og-image.png
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tecnoiso" }],
    locale: "pt_BR",
    siteName: "Tecnoiso",
  },

  // ── Twitter/X Card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@tecnoiso",
    title: "Tecnoiso - Metrologia, Calibração e Certificação Industrial",
    description:
      "Laboratório acreditado INMETRO. Calibração, certificação e consultoria em metrologia industrial.",
    images: ["/og-image.png"],
  },

  // ── Favicons ───────────────────────────────────────────────────────────────
  // Next.js App Router resolve automaticamente se os arquivos existirem em /app:
  //   /app/icon.png          → favicon padrão
  //   /app/apple-icon.png    → iOS home screen
  // Como o logo está em /public, apontamos manualmente:
  icons: {
    icon: "/tecnoiso-logo.png",
    apple: "/tecnoiso-logo.png",
    shortcut: "/tecnoiso-logo.png",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Schemas
// Injetados como <script> estático no HTML — lidos pelo Google antes do JS rodar
// ─────────────────────────────────────────────────────────────────────────────

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tecnoiso - Tecnologia e Soluções Industriais",
  url: "https://tecnoiso.com.br",
  logo: "https://tecnoiso.com.br/tecnoiso-logo.png",
  description:
    "Laboratório acreditado INMETRO especializado em metrologia, calibração e certificação industrial.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Dona Emma, 1541 - Floresta",
    addressLocality: "Joinville",
    addressRegion: "SC",
    postalCode: "89211-493",
    addressCountry: "BR",
  },
  telephone: "+554734383175",
  sameAs: [
    "https://www.instagram.com/tecnoiso/",
    "https://www.facebook.com/tecnoiso/",
    "https://www.linkedin.com/company/tecnoso-tecnologia-e-soluções-industriais-ltda/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+554734383175",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tecnoiso",
  url: "https://tecnoiso.com.br",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tecnoiso.com.br/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é calibração de instrumentos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calibração é o conjunto de operações que estabelece a relação entre valores indicados por um instrumento de medição e os valores correspondentes das grandezas estabelecidas por padrões, garantindo a confiabilidade metrológica.",
      },
    },
    {
      "@type": "Question",
      name: "A Tecnoiso é acreditada pelo INMETRO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, a Tecnoiso possui laboratórios acreditados pelo INMETRO, garantindo que todos os serviços de calibração e certificação atendem às normas nacionais e internacionais de qualidade.",
      },
    },
    {
      "@type": "Question",
      name: "Quais serviços a Tecnoiso oferece?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Tecnoiso oferece calibração, certificação, manutenção de equipamentos, consultoria metrológica e treinamentos especializados, com laboratórios fixos e móveis.",
      },
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// RootLayout
// ─────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}

        <Toaster richColors position="top-right" />

        {/*
         * JSON-LD — renderizado no servidor, visível para crawlers sem JS
         * dangerouslySetInnerHTML é seguro aqui porque o conteúdo é gerado
         * internamente (não vem de input do usuário)
         */}
        <script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgSchema, websiteSchema, faqSchema]),
          }}
        />
      </body>
    </html>
  );
}