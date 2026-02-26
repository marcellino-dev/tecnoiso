"use client";

import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const SEO = ({
  title = "Tecnoiso - Metrologia, Calibração e Certificação Industrial | Joinville SC",
  description = "Laboratório acreditado INMETRO em Joinville/SC. Calibração, certificação, manutenção e consultoria em metrologia industrial. Solicite um orçamento.",
  canonical = "https://tecnoiso.com.br",
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el)
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // JSON-LD Organization
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tecnoiso - Tecnologia e Soluções Industriais",
      url: "https://tecnoiso.com.br",
      logo: "https://tecnoiso.com.br/og-image.png",
      description: "Laboratório acreditado INMETRO especializado em metrologia, calibração e certificação industrial.",
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

    let scriptEl = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "seo-jsonld";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify([orgSchema, websiteSchema, faqSchema]);
  }, [title, description, canonical]);

  return null;
};

export default SEO;
