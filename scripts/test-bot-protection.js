// test-bot-protection.js
// Testa em produção se a proteção anti-bot do /api/send-quote está funcionando de verdade.
// Rodar com: node test-bot-protection.js
//
// Ajuste BASE_URL se o domínio não for esse.

const BASE_URL = "https://tecnoiso.com";
const ENDPOINT = `${BASE_URL}/api/send-quote`;

// Ajuste os nomes dos campos conforme o schema real do formulário
// (nome, empresa, cargo, email, telefone, mensagem, e o campo honeypot).
function baseFields() {
  return {
    name: "Teste Automatizado",
    company: "Empresa Teste",
    role: "QA",
    email: "teste@example.com",
    phone: "(47) 99999-0000",
    message: "Mensagem de teste de proteção anti-bot.",
  };
}

async function send(payload, headers = {}, label = "") {
  const start = Date.now();
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(payload),
    });
    const ms = Date.now() - start;
    let body;
    try {
      body = await res.json();
    } catch {
      body = await res.text();
    }
    console.log(`[${label}] status=${res.status} (${ms}ms)`, body);
    return res.status;
  } catch (err) {
    console.log(`[${label}] ERRO:`, err.message);
    return null;
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function testLegitimo() {
  console.log("\n=== 1) Requisição legítima (deve retornar 200) ===");
  await send(baseFields(), {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36",
  }, "legitimo");
}

async function testHoneypot() {
  console.log("\n=== 2) Honeypot preenchido (bot típico) — deve ser bloqueado ===");
  // Troque "website_url" pelo nome real do campo honeypot no seu form
  await send(
    { ...baseFields(), website_url: "http://spam-bot.example" },
    {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36",
    },
    "honeypot"
  );
}

async function testUserAgentSuspeito() {
  console.log("\n=== 3) User-Agent de bot conhecido — deve retornar 403 ===");
  const uas = ["python-requests/2.31.0", "Scrapy/2.11 (+https://scrapy.org)", "curl/8.4.0"];
  for (const ua of uas) {
    await send(baseFields(), { "User-Agent": ua }, `UA:${ua}`);
    await sleep(300);
  }
}

async function testSemUserAgent() {
  console.log("\n=== 4) Sem header User-Agent — verificar comportamento ===");
  await send(baseFields(), {}, "sem-UA");
}

async function testRateLimit() {
  console.log("\n=== 5) Rate limit: 8 requisições seguidas (limite é 5/hora) ===");
  for (let i = 1; i <= 8; i++) {
    const status = await send(
      baseFields(),
      {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36",
      },
      `req-${i}`
    );
    if (status === 429) {
      console.log(`   -> Bloqueado no request #${i}. Rate limit funcionando.`);
    }
    await sleep(200);
  }
}

async function main() {
  console.log(`Testando: ${ENDPOINT}\n`);
  await testLegitimo();
  await sleep(500);
  await testHoneypot();
  await sleep(500);
  await testUserAgentSuspeito();
  await sleep(500);
  await testSemUserAgent();
  await sleep(500);
  await testRateLimit();

  console.log(
    "\n=== Resumo esperado ===\n" +
      "1) legítimo -> 200\n" +
      "2) honeypot -> 403 (ou 200 'silencioso' se a estratégia for enganar o bot)\n" +
      "3) UA suspeito -> 403\n" +
      "4) sem UA -> depende da regra (revisar se está tratado)\n" +
      "5) rate limit -> a partir do 6º request deve vir 429\n\n" +
      "Se algum desses não bater, é sinal de que a camada correspondente não está pegando em produção."
  );
}

main();