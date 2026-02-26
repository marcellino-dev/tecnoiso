/**
 * app/sitemap.ts
 *
 * Gerado automaticamente pelo Next.js e servido em /sitemap.xml
 * Adicione novas rotas aqui conforme o site crescer.
 *
 * Referência: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import type { MetadataRoute } from "next";

const BASE_URL = "https://tecnoiso.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // ── Adicione páginas internas aqui quando existirem ──
    // {
    //   url: `${BASE_URL}/servicos`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${BASE_URL}/quem-somos`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.6,
    // },
    // {
    //   url: `${BASE_URL}/contato`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.5,
    // },
  ];
}