/**
 * test-tracking-v2.js
 * ────────────────────────────────────────────────────────────────────────
 * Versão completa: além de escutar o dataLayer, intercepta as requisições
 * de rede REAIS que saem pro GA4 (google-analytics.com/g/collect) e pro
 * Meta Pixel (facebook.com/tr). Isso é a prova definitiva de que um evento
 * chegou no destino — não depende de adivinhar o que a tag dentro do GTM
 * faz com o evento que ela escuta no dataLayer.
 *
 * Também:
 *  - Testa tel:/mailto: em várias rotas (home, /send-quote, /indicacao-tecnicos)
 *  - Tenta clicar automaticamente no botão do WhatsApp (com fallback manual)
 *  - Ao final, imprime um resumo PASS/FAIL por evento
 *  - Salva tudo (dataLayer + hits de rede) em test-tracking-results.json
 *
 * ── COMO USAR ──────────────────────────────────────────────────────────
 * 1. (Se ainda não instalou) npm install -D playwright && npx playwright install chromium
 * 2. npm run dev (em outro terminal)
 * 3. node scripts/test-tracking-v2.js
 *    ou:  TEST_URL=https://tecnoiso.com.br node scripts/test-tracking-v2.js
 * ────────────────────────────────────────────────────────────────────────
 */

const { chromium } = require('playwright');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const MANUAL_WAIT_MS = 60_000;
const ROUTES_TO_SCAN = ['/', '/send-quote', '/indicacao-tecnicos'];

const dataLayerEvents = [];
const networkHits = [];

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
}

function ts() {
  return new Date().toLocaleTimeString('pt-BR');
}

function logDataLayer(payload) {
  dataLayerEvents.push({ time: new Date().toISOString(), payload });
  console.log(`\n[${ts()}] [dataLayer push]`, JSON.stringify(payload));
}

function logNetworkHit(hit) {
  networkHits.push(hit);
  console.log(`\n[${ts()}] [HIT ${hit.destino}] evento="${hit.evento}"`, hit.params);
}

// ── Interceptação de dataLayer ──────────────────────────────────────────
async function attachDataLayerListener(page) {
  await page.exposeFunction('__onDataLayerPush', (payload) => logDataLayer(payload));
  await page.addInitScript(() => {
    window.dataLayer = window.dataLayer || [];
    const originalPush = window.dataLayer.push.bind(window.dataLayer);
    window.dataLayer.push = function (...args) {
      args.forEach((arg) => {
        try { window.__onDataLayerPush(arg); } catch (e) {}
      });
      return originalPush(...args);
    };
  });
}

// ── Interceptação de rede real (GA4 + Meta) ─────────────────────────────
function attachNetworkListener(context) {
  context.on('request', (request) => {
    const url = request.url();

    // GA4 (Measurement Protocol via gtag/GTM)
    if (url.includes('google-analytics.com/g/collect') || url.includes('analytics.google.com/g/collect')) {
      try {
        const u = new URL(url);
        const params = Object.fromEntries(u.searchParams.entries());
        logNetworkHit({
          destino: 'GA4',
          evento: params.en || '(sem nome)',
          params,
          time: new Date().toISOString(),
        });
      } catch (e) {}
    }

    // Meta Pixel
    if (url.includes('facebook.com/tr')) {
      try {
        const u = new URL(url);
        const params = Object.fromEntries(u.searchParams.entries());
        logNetworkHit({
          destino: 'Meta Pixel',
          evento: params.ev || '(sem nome)',
          params,
          time: new Date().toISOString(),
        });
      } catch (e) {}
    }

    // Google Ads conversion ping (útil pra saber se a tag de conversão do Ads disparou)
    if (url.includes('googleadservices.com') || url.includes('google.com/pagead/conversion')) {
      logNetworkHit({
        destino: 'Google Ads',
        evento: '(conversion ping)',
        params: { url },
        time: new Date().toISOString(),
      });
    }
  });
}

// ── Testes por rota ──────────────────────────────────────────────────────
async function scanRouteForLinks(page, route) {
  console.log(`\n=== Escaneando rota ${route} ===`);
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' }).catch((e) => {
    console.log(`  Não consegui carregar ${route}: ${e.message}`);
    return null;
  });
  await page.waitForTimeout(1500);

  const telLink = await page.$('a[href^="tel:"]');
  if (telLink) {
    console.log(`  Link tel: encontrado em ${route}, clicando...`);
    await telLink.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  const mailLink = await page.$('a[href^="mailto:"]');
  if (mailLink) {
    console.log(`  Link mailto: encontrado em ${route}, clicando...`);
    await mailLink.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  if (!telLink && !mailLink) {
    console.log(`  Nenhum link tel:/mailto: nesta rota.`);
  }
}

async function tryAutoClickWhatsApp(page) {
  console.log('\n=== Tentando localizar o botão do WhatsApp automaticamente ===');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2000);

  const candidateSelectors = [
    '[class*="whatsapp" i]',
    '[id*="whatsapp" i]',
    'a[href*="wa.me"]',
    'a[href*="whatsapp"]',
    '[aria-label*="whatsapp" i]',
    'iframe[src*="whatsredirect"]',
  ];

  for (const selector of candidateSelectors) {
    const el = await page.$(selector).catch(() => null);
    if (el) {
      console.log(`  Encontrado elemento com seletor "${selector}", clicando...`);
      await el.click({ timeout: 3000 }).catch((e) => {
        console.log(`  Não consegui clicar automaticamente (${e.message}). Vai precisar clicar manual no fim.`);
      });
      await page.waitForTimeout(1500);
      return true;
    }
  }
  console.log('  Não encontrei o botão automaticamente — clique manual será necessário no fim.');
  return false;
}

async function testGenerateLead(page) {
  const answer = await ask(
    '\nDeseja testar o envio do formulário de orçamento agora? ' +
    'Isso vai submeter um lead de teste de verdade (s/N): '
  );
  if (answer.trim().toLowerCase() !== 's') {
    console.log('Pulando teste de generate_lead.');
    return;
  }
  console.log('\n=== Testando generate_lead (send-quote) ===');
  await page.goto(`${BASE_URL}/send-quote`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  console.log('Preencha e envie o formulário manualmente na janela do navegador.');
  await ask('Pressione ENTER depois de enviar o formulário para continuar...');
  await page.waitForTimeout(2000);
}

// ── Resumo final ─────────────────────────────────────────────────────────
function printSummary() {
  console.log('\n\n========================= RESUMO =========================');

  const dlEventNames = dataLayerEvents.map((e) => e.payload && e.payload.event).filter(Boolean);
  const ga4EventNames = networkHits.filter((h) => h.destino === 'GA4').map((h) => h.evento);
  const metaEventNames = networkHits.filter((h) => h.destino === 'Meta Pixel').map((h) => h.evento);

  function check(label, dlNames, ga4Names, extraNote) {
    const inDL = dlNames.some((n) => dlEventNames.includes(n));
    const inGA4 = ga4Names ? ga4Names.some((n) => ga4EventNames.includes(n)) : false;
    let status;
    if (inGA4) status = '✅ CONFIRMADO NO GA4 (hit de rede real)';
    else if (inDL) status = '⚠️  visto no dataLayer, mas NÃO confirmado como hit no GA4';
    else status = '❌ NÃO detectado';
    console.log(`\n${label}: ${status}`);
    if (extraNote) console.log(`   nota: ${extraNote}`);
  }

  check(
    'generate_lead',
    ['generate_lead', 'gtm.formSubmit'],
    ['generate_lead']
  );
  check(
    'whatsapp',
    ['whatsapp', 'whatsapp_click'],
    ['whatsapp', 'whatsapp_click']
  );
  check(
    'phone_click',
    ['phone_click', 'gtm.linkClick'],
    ['phone_click'],
    'gtm.linkClick genérico foi visto se você clicou em tel: — mas isso só confirma o CLIQUE, não que a tag do GTM está renomeando/enviando isso como "phone_click" pro GA4. Olhe a coluna GA4 acima para saber se realmente chegou com esse nome.'
  );
  check(
    'email_click',
    ['email_click', 'gtm.linkClick'],
    ['email_click'],
    'mesma observação do phone_click.'
  );

  console.log('\n--- Todos os eventos GA4 confirmados por hit de rede ---');
  console.log(ga4EventNames.length ? [...new Set(ga4EventNames)].join(', ') : '(nenhum hit de GA4 capturado)');

  console.log('\n--- Todos os eventos Meta Pixel confirmados por hit de rede ---');
  console.log(metaEventNames.length ? [...new Set(metaEventNames)].join(', ') : '(nenhum hit de Meta capturado)');

  console.log('\n============================================================\n');
}

function saveResults() {
  const outPath = path.join(__dirname, 'test-tracking-results.json');
  fs.writeFileSync(outPath, JSON.stringify({ dataLayerEvents, networkHits }, null, 2), 'utf-8');
  console.log(`Resultado completo salvo em: ${outPath}`);
}

async function main() {
  console.log(`Iniciando teste completo de tracking em: ${BASE_URL}`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  attachNetworkListener(context);

  const page = await context.newPage();
  await attachDataLayerListener(page);

  for (const route of ROUTES_TO_SCAN) {
    await scanRouteForLinks(page, route);
  }

  await testGenerateLead(page);

  const foundWhatsApp = await tryAutoClickWhatsApp(page);
  if (!foundWhatsApp) {
    console.log(
      `\nJanela aberta por ${MANUAL_WAIT_MS / 1000}s — clique manualmente no WhatsApp agora.`
    );
  } else {
    console.log(
      `\nCliquei automaticamente, mas deixando a janela aberta por ${MANUAL_WAIT_MS / 1000}s ` +
      'pra garantir que o modal/redirect terminou de carregar e disparar.'
    );
  }
  await page.waitForTimeout(MANUAL_WAIT_MS);

  await browser.close();

  printSummary();
  saveResults();
}

main().catch((err) => {
  console.error('Erro ao rodar o teste:', err);
  process.exit(1);
});