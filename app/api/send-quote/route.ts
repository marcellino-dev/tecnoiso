import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Tipos
interface QuoteRequestBody {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  // UTMs de rastreamento
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Validações
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

export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequestBody = await req.json();

    // Sanitiza os campos
    const trimmed: QuoteRequestBody = {
      name: body.name?.trim(),
      company: body.company?.trim() || "",
      email: body.email?.trim().toLowerCase(),
      phone: body.phone?.trim(),
      service: body.service?.trim() || "",
      message: body.message?.trim() || "",
      utm_source: body.utm_source?.trim() || "",
      utm_medium: body.utm_medium?.trim() || "",
      utm_campaign: body.utm_campaign?.trim() || "",
      utm_term: body.utm_term?.trim() || "",
      utm_content: body.utm_content?.trim() || "",
    };

    // Valida
    const validationError = validateBody(trimmed);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    // Configura o transporter Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_EMAIL,       // seu Gmail
        pass: process.env.SMTP_APP_PASSWORD, // senha de app do Google
      },
    });

    // E-mail enviado para a empresa (notificação interna)
    const internalMailOptions = {
      from: `"Formulário do Site" <${process.env.SMTP_EMAIL}>`,
      to: `${process.env.RECIPIENT_EMAIL}, maristela@tecnoiso.com.br`, // e-mails que vão receber os orçamentos
      replyTo: trimmed.email,     // responder já vai direto pro cliente
      subject: `📋 Novo orçamento de ${trimmed.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #c0392b, #e74c3c); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nova Solicitação de Orçamento</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Recebido pelo site tecnoiso.com.br</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #eee;">
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; width: 140px;">
                  <strong style="color: #555;">👤 Nome</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">
                  ${trimmed.name}
                </td>
              </tr>
              ${trimmed.company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">🏢 Empresa</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">
                  ${trimmed.company}
                </td>
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
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">
                  <a href="tel:${trimmed.phone.replace(/\D/g, "")}" style="color: #c0392b;">${trimmed.phone}</a>
                </td>
              </tr>
              ${trimmed.service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                  <strong style="color: #555;">🔧 Serviço</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #222;">
                  ${trimmed.service}
                </td>
              </tr>` : ""}
            </table>

            ${trimmed.message ? `
            <div style="margin-top: 20px;">
              <strong style="color: #555;">💬 Mensagem:</strong>
              <div style="background: white; border-left: 4px solid #c0392b; padding: 16px; margin-top: 10px; border-radius: 4px; color: #333; line-height: 1.6;">
                ${trimmed.message.replace(/\n/g, "<br>")}
              </div>
            </div>` : ""}

            <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-radius: 6px; border: 1px solid #ffc107;">
              <p style="margin: 0; font-size: 13px; color: #856404;">
                💡 <strong>Dica:</strong> Para responder diretamente ao cliente, basta clicar em "Responder" no seu e-mail.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // E-mail de confirmação para o cliente
    const clientMailOptions = {
      from: `"Tecnoiso" <${process.env.SMTP_EMAIL}>`,
      to: trimmed.email,
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
              Recebemos sua solicitação de orçamento e entraremos em contato em breve. 
              Nossa equipe responde em até <strong>1 dia útil</strong>.
            </p>

            <div style="background: white; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #c0392b; margin: 0 0 16px;">Resumo do seu contato:</h3>
              <p style="margin: 6px 0; color: #555;"><strong>Nome:</strong> ${trimmed.name}</p>
              ${trimmed.company ? `<p style="margin: 6px 0; color: #555;"><strong>Empresa:</strong> ${trimmed.company}</p>` : ""}
              <p style="margin: 6px 0; color: #555;"><strong>E-mail:</strong> ${trimmed.email}</p>
              <p style="margin: 6px 0; color: #555;"><strong>Telefone:</strong> ${trimmed.phone}</p>
              ${trimmed.service ? `<p style="margin: 6px 0; color: #555;"><strong>Serviço:</strong> ${trimmed.service}</p>` : ""}
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

    // Envia e-mails + webhook Goalfy em paralelo
    await Promise.all([
      transporter.sendMail(internalMailOptions),
      transporter.sendMail(clientMailOptions),
      fetch("https://flow.goalfy.com.br/automations/v1/cc37d63a-d1ff-424a-a18d-6b81332b4fe9/hooks/catch/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: trimmed.name,
          email: trimmed.email,
          telefone: trimmed.phone,
          empresa: trimmed.company,
          "Serviço de Interesse": trimmed.service,
          mensagem: trimmed.message,
          utm_source: trimmed.utm_source,
          utm_medium: trimmed.utm_medium,
          utm_campaign: trimmed.utm_campaign,
          utm_term: trimmed.utm_term,
          utm_content: trimmed.utm_content,
          origem: "site",
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