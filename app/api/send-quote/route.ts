import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface QuoteRequestBody {
  name: string;
  company?: string;
  role?: string;
  email: string;
  phone: string;
  channels?: string;       // ex: "whatsapp_text, email"
  message?: string;
  origem?: string;         // ex: "site" | "certificados" | "vendas"
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

}

function validateBody(body: QuoteRequestBody): string | null {
  if (!body.name || body.name.trim().length < 2)
    return "Nome deve ter pelo menos 2 caracteres.";
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
    return "E-mail inválido.";
  const phoneDigits = (body.phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15)
    return "Telefone inválido.";
  return null;
}

// Human-readable label for channel ids
const CHANNEL_LABELS: Record<string, string> = {
  whatsapp_text:  "WhatsApp mensagem",
  whatsapp_voice: "WhatsApp voz",
  email:          "E-mail",
  phone_call:     "Ligação telefônica",
};

function formatChannels(raw: string | undefined): string {
  if (!raw) return "—";
  return raw
    .split(",")
    .map(c => CHANNEL_LABELS[c.trim()] ?? c.trim())
    .join(", ");
}

export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequestBody = await req.json();

    const trimmed: QuoteRequestBody = {
      name:         body.name?.trim(),
      company:      body.company?.trim()      || "",
      role:         body.role?.trim()         || "",
      email:        body.email?.trim().toLowerCase(),
      phone:        body.phone?.trim(),
      channels:     body.channels?.trim()     || "",
      message:      body.message?.trim()      || "",
      origem:       body.origem?.trim()       || "site",
      utm_source:   body.utm_source?.trim()   || "",
      utm_medium:   body.utm_medium?.trim()   || "",
      utm_campaign: body.utm_campaign?.trim() || "",
      utm_term:     body.utm_term?.trim()     || "",
      utm_content:  body.utm_content?.trim()  || "",
    };

    const validationError = validateBody(trimmed);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    const channelsFormatted = formatChannels(trimmed.channels);

    // ── E-mail interno ──────────────────────────────────────────────────────
    const internalMailOptions = {
      from:    `"Formulário do Site" <${process.env.SMTP_EMAIL}>`,
      to:      `maristela@tecnoiso.com, mclsouza1613ad@gmail.com`,
      replyTo: trimmed.email,
      subject: `📋 Novo orçamento de ${trimmed.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #c0392b, #e74c3c); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nova Solicitação de Orçamento</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Recebido pelo site tecnoiso.com</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; width: 160px;">
                  <strong style="color: #555;">👤 Nome</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">${trimmed.name}</td>
              </tr>
              ${trimmed.company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">🏢 Empresa</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">${trimmed.company}</td>
              </tr>` : ""}
              ${trimmed.role ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">💼 Cargo</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">${trimmed.role}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">📧 E-mail</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${trimmed.email}" style="color: #c0392b;">${trimmed.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">📞 Telefone</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <a href="tel:${trimmed.phone.replace(/\D/g, "")}" style="color: #c0392b;">${trimmed.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">📡 Canal preferido</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">${channelsFormatted}</td>
              </tr>
            </table>

            ${trimmed.message ? `
            <div style="margin-top: 20px;">
              <strong style="color: #555;">💬 Mensagem:</strong>
              <div style="background: white; border-left: 4px solid #c0392b; padding: 16px; margin-top: 10px; border-radius: 4px; color: #333; line-height: 1.6;">
                ${trimmed.message.replace(/\n/g, "<br>")}
              </div>
            </div>` : ""}

            ${(trimmed.utm_source || trimmed.utm_medium || trimmed.utm_campaign) ? `
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee;">
              <strong style="color: #aaa; font-size: 12px;">UTMs</strong>
              <p style="margin: 4px 0; font-size: 12px; color: #aaa;">
                Source: ${trimmed.utm_source || "—"} &nbsp;|&nbsp;
                Medium: ${trimmed.utm_medium || "—"} &nbsp;|&nbsp;
                Campaign: ${trimmed.utm_campaign || "—"}
                ${trimmed.utm_term    ? ` | Term: ${trimmed.utm_term}`    : ""}
                ${trimmed.utm_content ? ` | Content: ${trimmed.utm_content}` : ""}
              </p>
            </div>` : ""}
          </div>
        </div>
      `,
    };

    // ── E-mail de confirmação ao cliente ────────────────────────────────────
    const clientMailOptions = {
      from:    `"Tecnoiso" <${process.env.SMTP_EMAIL}>`,
      to:      trimmed.email,
      subject: "✅ Recebemos sua mensagem – Tecnoiso",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #c0392b, #e74c3c); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Mensagem Recebida!</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Obrigado por entrar em contato com a Tecnoiso</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eee;">
            <p style="color: #333; font-size: 16px;">Olá, <strong>${trimmed.name}</strong>!</p>
            <p style="color: #555; line-height: 1.6;">
              Recebemos sua solicitação e entraremos em contato pelo canal de sua preferência em breve.
              Nossa equipe responde em até <strong>1 dia útil</strong>.
            </p>

            <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #c0392b; margin: 0 0 16px;">Resumo do seu contato:</h3>
              <p style="margin: 6px 0; color: #555;"><strong>Nome:</strong> ${trimmed.name}</p>
              ${trimmed.company ? `<p style="margin: 6px 0; color: #555;"><strong>Empresa:</strong> ${trimmed.company}</p>` : ""}
              ${trimmed.role    ? `<p style="margin: 6px 0; color: #555;"><strong>Cargo:</strong> ${trimmed.role}</p>`    : ""}
              <p style="margin: 6px 0; color: #555;"><strong>E-mail:</strong> ${trimmed.email}</p>
              <p style="margin: 6px 0; color: #555;"><strong>Telefone:</strong> ${trimmed.phone}</p>
              <p style="margin: 6px 0; color: #555;"><strong>Canal preferido:</strong> ${channelsFormatted}</p>
            </div>

            <p style="color: #555; line-height: 1.6;">
              Se precisar de atendimento imediato, ligue para
              <a href="tel:4734383175" style="color: #c0392b; font-weight: bold;">(47) 3438-3175</a>.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="color: #999; font-size: 13px; text-align: center; margin: 0;">
              Tecnoiso – R. Dona Emma, 1541 – Floresta, Joinville – SC<br>
              Segunda à Sexta: 07:42 às 17:30
            </p>
          </div>
        </div>
      `,
    };

    // ── Envio paralelo: e-mails + webhook Goalfy ────────────────────────────
    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(clientMailOptions),
      fetch("https://flow.goalfy.com.br/automations/v1/cc37d63a-d1ff-424a-a18d-6b81332b4fe9/hooks/catch/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome:                    trimmed.name,
          email:                   trimmed.email,
          telefone:                trimmed.phone,
          empresa:                 trimmed.company,
          cargo:                   trimmed.role,
          canal_preferido:         channelsFormatted,
          mensagem:                trimmed.message,
          utm_source:              trimmed.utm_source,
          utm_medium:              trimmed.utm_medium,
          utm_campaign:            trimmed.utm_campaign,
          utm_term:                trimmed.utm_term,
          utm_content:             trimmed.utm_content,
          origem:                  trimmed.origem || "site",
        }),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno ao enviar e-mail." },
      { status: 500 }
    );
  }
}