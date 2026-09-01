/**
 * Exemplo de componente de formulário com proteção contra bots
 * Use este como referência para implementar a proteção nos seus formulários
 */

"use client";

import React, { useState } from "react";
import { getHoneypotFieldName } from "@/lib/botDetection";

interface FormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  [key: string]: string | undefined; // Para honeypot
}

export default function ExampleContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    [getHoneypotFieldName()]: "", // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Tratar diferentes status codes
        if (response.status === 429) {
          setError(
            `Você fez muitas requisições. ${data.error || "Tente novamente em alguns minutos."}`
          );
        } else if (response.status === 403) {
          setError(
            "Sua requisição foi bloqueada. Se você é um usuário real, verifique o formulário."
          );
        } else {
          setError(data.error || "Erro ao enviar o formulário");
        }
        return;
      }

      setSuccess(true);
      // Limpar formulário
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        [getHoneypotFieldName()]: "",
      });

      // Redirecionar ou mostrar mensagem de sucesso
      setTimeout(() => {
        window.location.href = "/obrigado";
      }, 2000);
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const honeypotFieldName = getHoneypotFieldName();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Entre em Contato</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          ✅ Formulário enviado com sucesso! Você será redirecionado...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo de Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Seu nome completo"
          />
        </div>

        {/* Campo de Empresa */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1">
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome da sua empresa"
          />
        </div>

        {/* Campo de Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu.email@empresa.com"
          />
        </div>

        {/* Campo de Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Telefone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(47) 3438-3175"
          />
        </div>

        {/* Campo de Serviço */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Serviço de Interesse *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um serviço</option>
            <option value="manutencao">Manutenção & Calibração</option>
            <option value="certificacao">Certificação</option>
            <option value="treinamento">Treinamentos</option>
            <option value="nr13">Inspeção NR-13</option>
          </select>
        </div>

        {/* Campo de Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva sua necessidade..."
          />
        </div>

        {/* 🚨 HONEYPOT FIELD - INVISÍVEL - BOTS PREENCHEM, USUÁRIOS NÃO */}
        <input
          type="text"
          name={honeypotFieldName}
          value={formData[honeypotFieldName] || ""}
          onChange={handleChange}
          style={{
            display: "none",
            position: "absolute",
            left: "-9999px",
          }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </button>

        <p className="text-sm text-gray-500 text-center">
          * Campos obrigatórios. Responderemos em até 1 dia útil.
        </p>
      </form>

      {/* Informações adicionais de segurança */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>🔒 Segurança:</strong> Este formulário possui proteção contra
          bots. Limit de requisições: 5 por hora. Se receber um erro de limite,
          aguarde antes de reenviar.
        </p>
      </div>
    </div>
  );
}
