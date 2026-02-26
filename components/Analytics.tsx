/**
 * components/Analytics.tsx
 *
 * Componente de rastreamento — centraliza TODOS os pixels em um lugar só.
 * Importado uma única vez no RootLayout, dentro do <body>.
 *
 * ── Como ativar cada pixel ──────────────────────────────────────────────────
 * 1. Adicione a variável no .env.local (nunca hardcode IDs aqui)
 * 2. Remova o comentário do bloco correspondente abaixo
 * 3. Rode `npm run build` e valide no Google Tag Assistant / Meta Pixel Helper
 *
 * ── Variáveis necessárias (.env.local) ──────────────────────────────────────
 * NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          ← Google Analytics 4
 * NEXT_PUBLIC_GTM_ID=GTM-XXXXXX           ← Google Tag Manager (substitui GA se usar)
 * NEXT_PUBLIC_META_PIXEL_ID=000000000     ← Meta (Facebook) Pixel
 */

"use client";

import Script from "next/script";

// Lê IDs das variáveis de ambiente — undefined se não configuradas
const GA_ID    = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID   = process.env.NEXT_PUBLIC_GTM_ID;
const META_ID  = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function Analytics() {
  return (
    <>
      {/* ── Google Tag Manager ────────────────────────────────────────────────
          Usar GTM OU GA diretamente — não os dois ao mesmo tempo.
          GTM é recomendado pois permite gerenciar todos os pixels pelo painel
          sem precisar alterar código.
      ───────────────────────────────────────────────────────────────────────── */}
      {GTM_ID && (
        <>
          {/* GTM script — carrega antes do conteúdo interativo */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
          {/* GTM noscript — fallback para usuários sem JavaScript */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* ── Google Analytics 4 (sem GTM) ─────────────────────────────────────
          Use apenas se NÃO estiver usando GTM acima.
      ───────────────────────────────────────────────────────────────────────── */}
      {GA_ID && !GTM_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}

      {/* ── Meta (Facebook) Pixel ─────────────────────────────────────────────
          strategy="afterInteractive" → carrega após hydration, não bloqueia LCP
      ───────────────────────────────────────────────────────────────────────── */}
      {META_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}