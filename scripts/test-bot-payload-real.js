// test-bot-payload-real.js
//
// Testa UM request só, com payload no formato exato dos e-mails de bot
// recebidos (nome/empresa/cargo gerados + gmail dot-trick).
// Objetivo: confirmar se checkIsBot() está de fato bloqueando (403) ou
// se está deixando passar (200) em produção.
//
// Rodar com: node test-bot-payload-real.js

const ENDPOINT = "https://tecnoiso.com/api/send-quote";

// Payload reconstruído a partir dos 3 e-mails reais que você recebeu
const botPayload = {
  name: "bEUNddQKwuCrwvzzGbbERhc",
  company: "Rrpasst LLC",
  role: "ObIWCqEYfqzZRQIoCRNp",
  email: "en.gl.i.s.hr1.9.8@gmail.com",
  phone: "(36) 5384-6476",
  message: "fTcNiPhNISuIJW.JCEmwru",
};

async function main() {
  console.log("Testando payload real de bot em:", ENDPOINT);
  console.log("Payload:", botPayload, "\n");

  const start = Date.now();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36",
      // headers propositalmente "normais" (o bot real que te mandou esses
      // e-mails provavelmente também usa um UA de navegador comum, senão
      // já teria caído na checagem de UA — o que queremos isolar aqui é
      // SÓ a checagem de conteúdo gerado)
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "pt-BR,pt;q=0.9",
      Referer: "https://tecnoiso.com/servicos/manutencao",
    },
    body: JSON.stringify(botPayload),
  });
  const ms = Date.now() - start;

  let body;
  try {
    body = await res.json();
  } catch {
    body = await res.text();
  }

  console.log(`Status: ${res.status} (${ms}ms)`);
  console.log("Resposta:", body);

  if (res.status === 403) {
    console.log("\n✅ Bloqueado. A checagem de conteúdo gerado está ativa em produção.");
  } else if (res.status === 200) {
    console.log(
      "\n❌ Passou (200). O payload no formato do bot NÃO está sendo bloqueado — checar se checkIsBot() está de fato ligado na rota /api/send-quote."
    );
  } else if (res.status === 429) {
    console.log(
      "\n⚠️ Rate limit ativo (429). Espere o resetAt informado antes de rodar de novo — esse teste sozinho não deveria estourar o limite se for a primeira requisição da hora."
    );
  }
}

main();