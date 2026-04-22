"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { inputBase, labelBase } from "./styles";

const FOCUS_COLOR  = "#F22020";
const BLUR_COLOR   = "rgba(255,255,255,0.1)";

const maxLengths: Record<string, number> = {
  name: 100, company: 200, email: 254, phone: 20, service: 300, message: 2000,
};

type FormData = {
  name: string; company: string; email: string;
  phone: string; service: string; message: string;
};

type Utms = {
  utm_source: string; utm_medium: string;
  utm_campaign: string; utm_term: string; utm_content: string;
};

export default function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", email: "", phone: "", service: "Calibração", message: "",
  });
  const [utms, setUtms] = useState<Utms>({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source:   params.get("utm_source")   || "",
      utm_medium:   params.get("utm_medium")   || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term:     params.get("utm_term")     || "",
      utm_content:  params.get("utm_content")  || "",
    });
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let masked = "";
    if (digits.length === 0)       masked = "";
    else if (digits.length <= 2)   masked = `(${digits}`;
    else if (digits.length <= 6)   masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    else if (digits.length <= 10)  masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    else                           masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    setFormData(prev => ({ ...prev, phone: masked }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value.length > (maxLengths[name] || 500)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v.trim()])
    );

    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios."); return;
    }
    if (trimmed.name.length < 2) { toast.error("Nome deve ter pelo menos 2 caracteres."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) { toast.error("E-mail inválido."); return; }
    const phoneDigits = trimmed.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) { toast.error("Telefone inválido."); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, ...utms }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormData({ name: "", company: "", email: "", phone: "", service: "Calibração", message: "" });
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

  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.currentTarget.style.borderColor = FOCUS_COLOR),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      (e.currentTarget.style.borderColor = BLUR_COLOR),
  };

  const textareaStyle: React.CSSProperties = {
    ...inputBase,
    height: "auto",
    minHeight: 100,
    padding: "12px 14px",
    resize: "none",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Row 1 — Nome / Empresa */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelBase}>Nome <span style={{ color: FOCUS_COLOR }}>*</span></label>
          <input
            name="name" value={formData.name} onChange={handleInputChange}
            placeholder="Seu nome completo" disabled={isSubmitting}
            maxLength={100} autoComplete="name"
            style={inputBase} {...focusProps}
          />
        </div>
        <div>
          <label style={labelBase}>Empresa</label>
          <input
            name="company" value={formData.company} onChange={handleInputChange}
            placeholder="Nome da empresa" disabled={isSubmitting}
            maxLength={200} autoComplete="organization"
            style={inputBase} {...focusProps}
          />
        </div>
      </div>

      {/* Row 2 — E-mail / Telefone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelBase}>E-mail <span style={{ color: FOCUS_COLOR }}>*</span></label>
          <input
            type="email" name="email" value={formData.email} onChange={handleInputChange}
            placeholder="seu@email.com" disabled={isSubmitting}
            maxLength={254} autoComplete="email"
            style={inputBase} {...focusProps}
          />
        </div>
        <div>
          <label style={labelBase}>Telefone <span style={{ color: FOCUS_COLOR }}>*</span></label>
          <input
            name="phone" value={formData.phone} onChange={handlePhoneChange}
            placeholder="(47) 99999-9999" disabled={isSubmitting}
            maxLength={15} autoComplete="tel" inputMode="numeric"
            style={inputBase} {...focusProps}
          />
        </div>
      </div>

      {/* Serviço */}
      <div>
        <label style={labelBase}>Serviço de Interesse</label>
        <select
          name="service" value={formData.service}
          onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
          disabled={isSubmitting}
          style={{ ...inputBase, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
          {...focusProps}
        >
          <option value="" style={{ background: "#1a1a1a" }}>Selecione um serviço...</option>
          {[
            "Calibração", "Certificação", "Manutenção", "NR13", "Automação",
            "Treinamentos", "Gerenciamento Metrológico", "Locação", "Suporte Logístico",
          ].map(s => (
            <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>
          ))}
        </select>
      </div>

      {/* Mensagem */}
      <div>
        <label style={labelBase}>Mensagem</label>
        <textarea
          name="message" value={formData.message} onChange={handleInputChange}
          placeholder="Descreva suas necessidades, quantidade de instrumentos ou dúvidas..."
          disabled={isSubmitting} maxLength={2000}
          style={textareaStyle} {...focusProps}
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          type="submit" disabled={isSubmitting}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: isSubmitting ? "#a01010" : FOCUS_COLOR,
            color: "#fff", fontWeight: 700, fontSize: 13,
            padding: "13px 28px", borderRadius: 8, border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            letterSpacing: "0.05em", textTransform: "uppercase",
            transition: "background 0.2s",
            opacity: isSubmitting ? 0.75 : 1,
          }}
        >
          {isSubmitting
            ? <><Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />Enviando...</>
            : <>Solicitar Orçamento <ArrowRight style={{ width: 16, height: 16 }} /></>
          }
        </button>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
          <Lock style={{ width: 12, height: 12 }} />
          Respondemos em até 1 dia útil
        </span>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}