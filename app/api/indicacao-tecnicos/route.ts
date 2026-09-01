import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { checkIsBot } from "@/lib/botDetection";

interface IndicacaoTecnicoBody {
  tecnico: string;
  data_visita: string;
  empresa: string;
  cnpj?: string;
  nome_contato: string;
  cargo_contato?: string;
  telefone: string;
  email?: string;
  tipo_oportunidade: string;
  descricao: string;
  arquivo_url?: string;
  arquivos_urls?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

function validateBody(body: IndicacaoTecnicoBody): string | null {
  if (!body.tecnico || body.tecnico.trim().length === 0)
    return "Técnico é obrigatório.";
  if (!body.data_visita || body.data_visita.trim().length === 0)
    return "Data de visita é obrigatória.";
  if (!body.empresa || body.empresa.trim().length < 2)
    return "Empresa deve ter pelo menos 2 caracteres.";
  if (!body.nome_contato || body.nome_contato.trim().length < 2)
    return "Nome do contato deve ter pelo menos 2 caracteres.";
  const phoneDigits = (body.telefone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15)
    return "Telefone inválido.";
  if (!body.tipo_oportunidade || body.tipo_oportunidade.trim().length === 0)
    return "Tipo de oportunidade é obrigatório.";
  // Alinhado com o formulário: campo obrigatório, sem mínimo de caracteres
  // imposto no client — aqui só barramos strings vazias/whitespace.
  if (!body.descricao || body.descricao.trim().length < 3)
    return "Descrição da oportunidade é obrigatória.";

  // Validação opcional de email se fornecido
  if (body.email && body.email.trim().length > 0) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      return "E-mail inválido.";
  }

  return null;
}

const WEBHOOK =
  "https://flow.goalfy.com.br/automations/v1/95f28601-3567-4250-bb72-66b678d5857e/hooks/catch/";

// Timeout para fetch (10 segundos)
const FETCH_TIMEOUT_MS = 10000;

function createAbortController(): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return controller;
}

export async function POST(req: NextRequest) {
  try {
    // ────────────────────────────────────────────────────────────────────────
    // 1️⃣ RATE LIMITING
    // Formulário de USO INTERNO (equipe de ~27 técnicos), não público como o
    // de orçamento. Vários técnicos podem compartilhar o mesmo IP (Wi-Fi da
    // empresa, NAT de operadora), por isso o limite é bem mais alto que o do
    // send-quote — é só uma rede de segurança contra loops/erros, não uma
    // barreira anti-spam.
    // ────────────────────────────────────────────────────────────────────────
    const clientIp = getClientIp(req.headers);
    const rateLimitResult = checkRateLimit(clientIp, {
      maxRequests: 40,
      windowMs: 60 * 60 * 1000,
    });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Limite de requisições excedido. Tente novamente em ${Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 60000)} minutos.`,
          resetAt: rateLimitResult.resetAt.toISOString(),
        },
        { status: 429 }
      );
    }

    // ────────────────────────────────────────────────────────────────────────
    // 2️⃣ PARSE DO CORPO
    // ────────────────────────────────────────────────────────────────────────
    let body: IndicacaoTecnicoBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Corpo da requisição inválido." },
        { status: 400 }
      );
    }

    // ────────────────────────────────────────────────────────────────────────
    // 3️⃣ VERIFICAÇÃO DE BOT (apenas log — não bloqueia)
    // Link usado internamente pela equipe, não pelo público — risco de bot é
    // baixo. Mantemos a detecção só para observabilidade, sem barrar a
    // requisição (evita falso-positivo travar um técnico real em campo).
    // ────────────────────────────────────────────────────────────────────────
    const botCheck = checkIsBot(req.headers, body);
    if (botCheck.isBot || botCheck.suspicionScore > 40) {
      console.warn(
        `⚠️ Requisição suspeita de IP ${clientIp} (score: ${botCheck.suspicionScore}):`,
        botCheck.reasons
      );
    }

    // ────────────────────────────────────────────────────────────────────────
    // 4️⃣ NORMALIZAÇÃO E VALIDAÇÃO DE DADOS
    // ────────────────────────────────────────────────────────────────────────
    const trimmed: IndicacaoTecnicoBody = {
      tecnico:           body.tecnico?.trim() || "",
      data_visita:       body.data_visita?.trim() || "",
      empresa:           body.empresa?.trim() || "",
      cnpj:              body.cnpj?.trim() || "",
      nome_contato:      body.nome_contato?.trim() || "",
      cargo_contato:     body.cargo_contato?.trim() || "",
      telefone:          body.telefone?.trim() || "",
      email:             body.email?.trim().toLowerCase() || "",
      tipo_oportunidade: body.tipo_oportunidade?.trim() || "",
      descricao:         body.descricao?.trim() || "",
      arquivo_url:       body.arquivo_url?.trim() || "",
      arquivos_urls:     body.arquivos_urls?.trim() || "",
      utm_source:        body.utm_source?.trim() || "indicação",
      utm_medium:        body.utm_medium?.trim() || "tecnico",
      utm_campaign:      body.utm_campaign?.trim() || "",
      utm_term:          body.utm_term?.trim() || "",
      utm_content:       body.utm_content?.trim() || "",
    };

    const validationError = validateBody(trimmed);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    // ────────────────────────────────────────────────────────────────────────
    // 5️⃣ ENVIO PARA WEBHOOK GOALFY
    // ────────────────────────────────────────────────────────────────────────
    const goalfyPayload = {
      tecnico:           trimmed.tecnico,
      data_visita:       trimmed.data_visita,
      empresa:           trimmed.empresa,
      cnpj:              trimmed.cnpj || "—",
      nome_contato:      trimmed.nome_contato,
      cargo_contato:     trimmed.cargo_contato || "—",
      telefone:          trimmed.telefone,
      email:             trimmed.email || "—",
      tipo_oportunidade: trimmed.tipo_oportunidade,
      descricao:         trimmed.descricao,
      arquivo_url:       trimmed.arquivo_url || "",
      arquivos_urls:     trimmed.arquivos_urls || "",
      utm_source:        trimmed.utm_source,
      utm_medium:        trimmed.utm_medium,
      utm_campaign:      trimmed.utm_campaign,
      utm_term:          trimmed.utm_term,
      utm_content:       trimmed.utm_content,
      timestamp:         new Date().toISOString(),
      ip:                clientIp,
      suspicionScore:    botCheck.suspicionScore,
    };

    const abortController = createAbortController();
    let resp: Response;
    try {
      resp = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalfyPayload),
        signal: abortController.signal,
      });
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("Timeout ao enviar lead para o Goalfy");
        return NextResponse.json(
          { success: false, error: "Timeout na requisição. Tente novamente." },
          { status: 504 }
        );
      }
      throw fetchError;
    }

    if (resp.status >= 500) {
      console.error(
        `❌ Erro no servidor Goalfy (${resp.status}): lead de ${trimmed.nome_contato}`
      );
      return NextResponse.json(
        { success: false, error: "Erro ao processar no servidor de destino. Tente novamente." },
        { status: 502 }
      );
    }

    if (!resp.ok) {
      console.warn(
        `⚠️ Webhook Goalfy retornou ${resp.status}: lead ${trimmed.nome_contato} da ${trimmed.empresa}`
      );
      return NextResponse.json(
        { success: false, error: "Não foi possível registrar a indicação. Tente novamente." },
        { status: 502 }
      );
    }

    console.info(
      `✅ Lead recebido: ${trimmed.nome_contato} (${trimmed.empresa}) de ${trimmed.telefone}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar lead para o Goalfy:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno ao processar sua indicação." },
      { status: 500 }
    );
  }
}