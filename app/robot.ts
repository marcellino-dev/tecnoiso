/**
 * app/robots.ts
 *
 * Substitui o arquivo estático /public/robots.txt.
 * Servido pelo Next.js em /robots.txt com referência automática ao sitemap.
 *
 * ⚠️  Delete o arquivo /public/robots.txt após adicionar este — os dois em
 *     paralelo podem causar conflito dependendo da configuração do servidor.
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Google — permite tudo
      { userAgent: "Googlebot", allow: "/" },
      // Bing — permite tudo
      { userAgent: "Bingbot", allow: "/" },
      // Crawlers de redes sociais para preview correto de links
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      // Todos os demais — permite tudo
      { userAgent: "*", allow: "/" },
    ],
    // Sitemap é gerado automaticamente pelo app/sitemap.ts
    sitemap: "https://tecnoiso.com.br/sitemap.xml",
  };
}