"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Loader2, Lock, MessageCircle, Mic, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

// ─── Tokens ────────────────────────────────────────────────────────────────
const RED        = "#F22020";
const RED_DARK   = "#a01010";
const BLUR_BG    = "rgba(255,255,255,0.06)";
const BORDER     = "rgba(255,255,255,0.10)";
const BORDER_FOC = RED;
const TEXT       = "#fff";
const PLACEHOLDER= "rgba(255,255,255,0.35)";
const LABEL_CLR  = "rgba(255,255,255,0.55)";

// ─── Shared styles ──────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  background: BLUR_BG,
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  color: TEXT,
  fontSize: 14,
  padding: "12px 14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const labelBase: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: LABEL_CLR,
  marginBottom: 6,
};

// ─── Types ──────────────────────────────────────────────────────────────────
const maxLengths: Record<string, number> = {
  name: 100, company: 200, role: 100,
  email: 254, phone: 20, message: 2000,
};

type Channel = "whatsapp_text" | "whatsapp_voice" | "email" | "phone_call";

type FormData = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  channels: Channel[];
  message: string;
};

type Utms = {
  utm_source: string; utm_medium: string;
  utm_campaign: string; utm_term: string; utm_content: string;
};

// ─── Channel options ────────────────────────────────────────────────────────
const CHANNELS: { id: Channel; label: string; Icon: React.ElementType }[] = [
  { id: "whatsapp_text",  label: "WhatsApp mensagem", Icon: MessageCircle },
  { id: "whatsapp_voice", label: "WhatsApp voz",      Icon: Mic          },
  { id: "email",          label: "E-mail",             Icon: Mail         },
  { id: "phone_call",     label: "Ligação telefônica", Icon: Phone        },
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", role: "", email: "",
    phone: "", channels: [], message: "",
  });
  const [utms, setUtms] = useState<Utms>({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtms({
      utm_source:   p.get("utm_source")   || "",
      utm_medium:   p.get("utm_medium")   || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_term:     p.get("utm_term")     || "",
      utm_content:  p.get("utm_content")  || "",
    });
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value.length > (maxLengths[name] || 500)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let masked = "";
    if (digits.length === 0)      masked = "";
    else if (digits.length <= 2)  masked = `(${digits}`;
    else if (digits.length <= 6)  masked = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
    else if (digits.length <= 10) masked = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    else                          masked = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
    setFormData(prev => ({ ...prev, phone: masked }));
  };

  const toggleChannel = (id: Channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(id)
        ? prev.channels.filter(c => c !== id)
        : [...prev.channels, id],
    }));
  };

  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = BORDER_FOC),
    onBlur:  (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = BORDER),
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = {
      name:     formData.name.trim(),
      company:  formData.company.trim(),
      role:     formData.role.trim(),
      email:    formData.email.trim(),
      phone:    formData.phone.trim(),
      channels: formData.channels.join(", "),
      message:  formData.message.trim(),
    };

    if (!t.name || !t.email || !t.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios."); return;
    }
    if (t.name.length < 2) { toast.error("Nome deve ter pelo menos 2 caracteres."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.email)) { toast.error("E-mail inválido."); return; }
    const phoneDigits = t.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      toast.error("Telefone inválido."); return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...t, ...utms }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData({ name: "", company: "", role: "", email: "", phone: "", channels: [], message: "" });
        window.location.href = "/obrigado";
      } else {
        throw new Error(data.error || "Erro ao enviar");
      }
    } catch {
      toast.error("Erro ao enviar. Tente novamente ou ligue para nós.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Nome */}
      <div>
        <label style={labelBase}>
          Nome <span style={{ color: RED }}>*</span>
        </label>
        <input
          name="name" value={formData.name} onChange={handleChange}
          placeholder="Seu nome completo" disabled={isSubmitting}
          maxLength={100} autoComplete="name"
          style={inputBase} {...focusProps}
        />
      </div>

      {/* Empresa */}
      <div>
        <label style={labelBase}>Empresa</label>
        <input
          name="company" value={formData.company} onChange={handleChange}
          placeholder="Nome da empresa" disabled={isSubmitting}
          maxLength={200} autoComplete="organization"
          style={inputBase} {...focusProps}
        />
      </div>

      {/* Cargo */}
      <div>
        <label style={labelBase}>Cargo</label>
        <input
          name="role" value={formData.role} onChange={handleChange}
          placeholder="Seu cargo" disabled={isSubmitting}
          maxLength={100} autoComplete="organization-title"
          style={inputBase} {...focusProps}
        />
      </div>

      {/* Telefone / E-mail */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelBase}>
            Telefone <span style={{ color: RED }}>*</span>
          </label>
          <input
            name="phone" value={formData.phone} onChange={handlePhoneChange}
            placeholder="(47) 99999-9999" disabled={isSubmitting}
            maxLength={15} autoComplete="tel" inputMode="numeric"
            style={inputBase} {...focusProps}
          />
        </div>
        <div>
          <label style={labelBase}>
            E-mail <span style={{ color: RED }}>*</span>
          </label>
          <input
            type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="seu@email.com" disabled={isSubmitting}
            maxLength={254} autoComplete="email"
            style={inputBase} {...focusProps}
          />
        </div>
      </div>

      {/* Canal preferido */}
      <div>
        <label style={labelBase}>Canal Preferido de Atendimento</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {CHANNELS.map(({ id, label, Icon }) => {
            const selected = formData.channels.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleChannel(id)}
                disabled={isSubmitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  background: selected ? "rgba(242,32,32,0.12)" : BLUR_BG,
                  border: `1px solid ${selected ? RED : BORDER}`,
                  borderRadius: 8,
                  color: selected ? RED : "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s",
                  fontFamily: "inherit",
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <label style={labelBase}>Como Podemos Ajudar?</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange}
          placeholder="Ex: Preciso de 3 termômetros digitais para processo de injeção plástica, faixa -10 a 150ºC..."
          disabled={isSubmitting} maxLength={2000} rows={4}
          style={{ ...inputBase, resize: "none", minHeight: 100 }}
          {...focusProps}
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: isSubmitting ? RED_DARK : RED,
            color: "#fff", fontWeight: 700, fontSize: 13,
            padding: "14px 28px", borderRadius: 8, border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            letterSpacing: "0.06em", textTransform: "uppercase",
            transition: "background 0.2s",
            opacity: isSubmitting ? 0.75 : 1,
            fontFamily: "inherit",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
              Enviando...
            </>
          ) : (
            <>
              Falar com Especialista
              <ArrowRight style={{ width: 16, height: 16 }} />
            </>
          )}
        </button>

        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
          <Lock style={{ width: 12, height: 12 }} />
          Seus dados estão seguros
        </span>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: ${PLACEHOLDER}; }
        select option { background: #1a1a1a; }
      `}</style>
    </form>
  );
}