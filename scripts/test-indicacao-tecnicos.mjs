#!/usr/bin/env node
/**
 * Teste automatizado para /api/indicacao-tecnicos
 *
 * USO:
 *   BASE_URL=http://localhost:3000 node test-indicacao-tecnicos.mjs
 *   BASE_URL=https://tecnoiso.com.br node test-indicacao-tecnicos.mjs
 *
 * FLAGS:
 *   --include-success   Também testa o caminho de sucesso (200 + envio real
 *                        pro webhook do Goalfy). DESLIGADO por padrão pra não
 *                        criar leads de teste na sua base. O payload usado
 *                        quando ligado é marcado com "[TESTE AUTOMATIZADO]"
 *                        no nome da empresa, pra ficar fácil de achar/apagar.
 *   --include-cors       Também roda o teste de preflight CORS com uma Origin
 *                        diferente do BASE_URL.
 *   --include-rate-limit Dispara N requisições seguidas pra checar se o
 *                        rate limit responde 429 (por padrão desligado
 *                        porque é lento e "gasta" seu limite de verdade).
 *
 * Requer Node 18+ (fetch nativo). Sem dependências externas.
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const ENDPOINT = `${BASE_URL}/api/indicacao-tecnicos`;

const FLAGS = new Set(process.argv.slice(2));
const INCLUDE_SUCCESS = FLAGS.has("--include-success");
const INCLUDE_CORS = FLAGS.has("--include-cors");
const INCLUDE_RATE_LIMIT = FLAGS.has("--include-rate-limit");

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";

let passed = 0;
let failed = 0;
const failures = [];

function basePayload(overrides = {}) {
  return {
    tecnico: "Caio Vinicius de Moura",
    data_visita: new Date().toISOString().split("T")[0],
    empresa: "Empresa Teste LTDA",
    cnpj: "",
    nome_contato: "Fulano de Tal",
    cargo_contato: "",
    telefone: "47999998888",
    email: "",
    tipo_oportunidade: "Calibração",
    descricao: "Cliente mencionou necessidade de calibração anual.",
    arquivo_url: "",
    arquivos_urls: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    ...overrides,
  };
}

async function post(payload, extraHeaders = {}) {
  const resp = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...extraHeaders },
    body: JSON.stringify(payload),
  });
  let json = {};
  try {
    json = await resp.json();
  } catch {
    // corpo não-JSON — deixa json vazio, o teste que decide se isso é falha
  }
  return { resp, json };
}

async function test(name, fn) {
  try {
    await fn();
    console.log(`${GREEN}✓${RESET} ${name}`);
    passed++;
  } catch (err) {
    console.log(`${RED}✗${RESET} ${name}`);
    console.log(`  ${DIM}${err.message}${RESET}`);
    failed++;
    failures.push(name);
  }
}

function assertStatus(resp, expected, label) {
  if (resp.status !== expected) {
    throw new Error(
      `esperava status ${expected}, veio ${resp.status} (${label || "sem contexto"})`
    );
  }
}

function assertField(json, field, expected) {
  if (json[field] !== expected) {
    throw new Error(
      `esperava json.${field} === ${JSON.stringify(expected)}, veio ${JSON.stringify(json[field])}`
    );
  }
}

// ── Contrato que o page.tsx espera: front só mostra sucesso quando
//    resp.ok === true E json.success === true. Qualquer outra combinação
//    tem que cair no catch/erro. Validamos isso explicitamente abaixo.
function assertFrontendWouldTreatAsFailure(resp, json) {
  const frontendThinksSuccess = resp.ok && json.success === true;
  if (frontendThinksSuccess) {
    throw new Error(
      "BUG DE REGRESSÃO: o front-end mostraria tela de sucesso pra essa resposta, mas deveria falhar"
    );
  }
}

async function main() {
  console.log(`${CYAN}Testando ${ENDPOINT}${RESET}\n`);

  // ── 1. Validação — campos obrigatórios ausentes ──────────────────────
  await test("rejeita quando falta 'tecnico' (400)", async () => {
    const { resp, json } = await post(basePayload({ tecnico: "" }));
    assertStatus(resp, 400, "tecnico ausente");
    assertField(json, "success", false);
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita quando falta 'data_visita' (400)", async () => {
    const { resp, json } = await post(basePayload({ data_visita: "" }));
    assertStatus(resp, 400, "data_visita ausente");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita 'empresa' com menos de 2 caracteres (400)", async () => {
    const { resp, json } = await post(basePayload({ empresa: "A" }));
    assertStatus(resp, 400, "empresa curta");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita 'nome_contato' com menos de 2 caracteres (400)", async () => {
    const { resp, json } = await post(basePayload({ nome_contato: "A" }));
    assertStatus(resp, 400, "nome_contato curto");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita telefone com poucos dígitos (400)", async () => {
    const { resp, json } = await post(basePayload({ telefone: "123" }));
    assertStatus(resp, 400, "telefone inválido");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita quando falta 'tipo_oportunidade' (400)", async () => {
    const { resp, json } = await post(basePayload({ tipo_oportunidade: "" }));
    assertStatus(resp, 400, "tipo_oportunidade ausente");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita descrição vazia (400)", async () => {
    const { resp, json } = await post(basePayload({ descricao: "" }));
    assertStatus(resp, 400, "descricao vazia");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("rejeita descrição curtíssima abaixo do mínimo (400)", async () => {
    // rota exige trim().length >= 3
    const { resp, json } = await post(basePayload({ descricao: "ok" }));
    assertStatus(resp, 400, "descricao com 2 chars");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("aceita descrição curta válida de 3+ caracteres (não deve dar 400 de descrição)", async () => {
    // valida que o mínimo não ficou restritivo demais (era o ponto levantado
    // na revisão anterior) — combinamos com --include-success pra checar 200
    // de fato; aqui só garantimos que não é rejeitada por "descrição curta"
    const { resp, json } = await post(basePayload({ descricao: "vazamento visível" }));
    if (resp.status === 400 && /descri/i.test(json.error || "")) {
      throw new Error(`descrição de 18 caracteres não deveria ser rejeitada: ${json.error}`);
    }
  });

  await test("rejeita e-mail malformado quando fornecido (400)", async () => {
    const { resp, json } = await post(basePayload({ email: "nao-e-email" }));
    assertStatus(resp, 400, "email inválido");
    assertFrontendWouldTreatAsFailure(resp, json);
  });

  await test("aceita quando e-mail vem vazio (campo opcional)", async () => {
    const { resp, json } = await post(basePayload({ email: "" }));
    if (resp.status === 400 && /mail/i.test(json.error || "")) {
      throw new Error(`e-mail vazio não deveria disparar erro de e-mail: ${json.error}`);
    }
  });

  // ── 2. Corpo inválido ──────────────────────────────────────────────
  await test("rejeita corpo que não é JSON válido (400)", async () => {
    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ isso não é json",
    });
    assertStatus(resp, 400, "corpo malformado");
  });

  // ── 3. UTMs — defaults do servidor quando client não manda nada ─────
  await test("usa defaults de UTM quando client não envia utm_source/utm_medium", async () => {
    // Não temos como ler o payload que a rota manda pro Goalfy a partir
    // daqui (é uma chamada servidor-a-servidor, não é ecoada na resposta).
    // O que dá pra confirmar de fora é que a ausência de utm_source/medium
    // NÃO quebra a validação (ambos têm fallback "|| valor-padrão" no
    // route.ts) — ou seja, a requisição não deve falhar por causa disso.
    const { resp, json } = await post(
      basePayload({ utm_source: "", utm_medium: "", utm_campaign: "" })
    );
    if (resp.status === 400) {
      throw new Error(`UTM ausente não deveria causar 400: ${json.error}`);
    }
  });

  // ── 4. CORS (opcional) ───────────────────────────────────────────────
  if (INCLUDE_CORS) {
    await test("preflight CORS com Origin externa — checa se há headers de CORS", async () => {
      const foreignOrigin = "https://origem-diferente.example.com";
      const resp = await fetch(ENDPOINT, {
        method: "OPTIONS",
        headers: {
          Origin: foreignOrigin,
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "content-type",
        },
      });
      const allowOrigin = resp.headers.get("access-control-allow-origin");
      console.log(
        `  ${DIM}OPTIONS -> status ${resp.status}, Access-Control-Allow-Origin: ${allowOrigin ?? "(ausente)"}${RESET}`
      );
      if (!allowOrigin) {
        throw new Error(
          "sem 'Access-Control-Allow-Origin' na resposta — se a página for servida de outra origem que não " +
            BASE_URL +
            ", o navegador vai bloquear a requisição. Se front e API estão sempre no mesmo domínio, isso é esperado e ok."
        );
      }
    });
  } else {
    console.log(`${YELLOW}○${RESET} teste de CORS pulado (use --include-cors pra rodar)`);
  }

  // ── 5. Rate limit (opcional, lento) ──────────────────────────────────
  if (INCLUDE_RATE_LIMIT) {
    await test("dispara rate limit (429) depois de várias requisições seguidas", async () => {
      let got429 = false;
      for (let i = 0; i < 45; i++) {
        const { resp } = await post(basePayload({ empresa: "" })); // usa payload inválido de propósito, não gera lead
        if (resp.status === 429) {
          got429 = true;
          break;
        }
      }
      if (!got429) {
        throw new Error(
          "não recebeu 429 em 45 tentativas — confirme se o limite (atualmente 40/hora) está ativo"
        );
      }
    });
  } else {
    console.log(`${YELLOW}○${RESET} teste de rate limit pulado (use --include-rate-limit pra rodar)`);
  }

  // ── 6. Caminho de sucesso real (opcional — envia pro Goalfy de verdade) ─
  if (INCLUDE_SUCCESS) {
    await test("envio válido retorna 200 + success:true (ENVIA LEAD REAL AO GOALFY)", async () => {
      const { resp, json } = await post(
        basePayload({
          empresa: "[TESTE AUTOMATIZADO] Empresa Teste LTDA",
          nome_contato: "[TESTE AUTOMATIZADO] Fulano de Tal",
        })
      );
      assertStatus(resp, 200, "payload válido");
      assertField(json, "success", true);
      const frontendThinksSuccess = resp.ok && json.success === true;
      if (!frontendThinksSuccess) {
        throw new Error(
          "BUG: payload válido não seria reconhecido como sucesso pelo front-end"
        );
      }
    });
  } else {
    console.log(
      `${YELLOW}○${RESET} teste de sucesso real pulado (use --include-success pra rodar — envia lead de teste ao Goalfy)`
    );
  }

  console.log(`\n${CYAN}Resumo:${RESET} ${GREEN}${passed} passou${RESET}, ${failed ? RED : DIM}${failed} falhou${RESET}`);
  if (failed > 0) {
    console.log(`\n${RED}Falhas:${RESET}`);
    failures.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`${RED}Erro fatal ao rodar os testes:${RESET}`, err);
  process.exit(1);
});
