"use client";

import { useEffect } from "react";

const SCRIPT_ID = "whatsredirect-script";

export default function WhatsAppScript() {
  useEffect(() => {
    // Evita injeção dupla (React StrictMode roda o useEffect duas vezes em dev)
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://whatsredirect.vercel.app/script";
    script.async = true;

    // Atributos simples: dataset funciona corretamente (sem números no meio do nome)
    script.dataset.webhook =
      "https://flow.goalfy.com.br/automations/v1/f1dac498-eb2c-466e-9a6e-da0c59ce380b/hooks/catch/";
    script.dataset.numero = "5547996644051";
    script.dataset.mensagem =
      "Olá, vim do site e gostaria de falar com um consultor";
    script.dataset.campoIntegradoNome = "nome";
    script.dataset.campoIntegradoTelefone = "telefone";

    // Campos numerados: DEVE usar setAttribute, pois dataset não insere hífen antes
    // de número — "campoPersonalizado1Nome" vira "data-campo-personalizado1-nome" (errado),
    // e o script externo espera "data-campo-personalizado-1-nome" (correto).
    script.setAttribute("data-campo-personalizado-1-nome", "Nome da Empresa");
    script.setAttribute("data-campo-personalizado-1-tipo", "text");
    script.setAttribute("data-campo-personalizado-1-placeholder", "Nome da Empresa");
    script.setAttribute("data-campo-personalizado-1-obrigatorio", "true");

    script.setAttribute("data-campo-personalizado-2-nome", "Serviço de Interesse");
    script.setAttribute("data-campo-personalizado-2-tipo", "select");
    script.setAttribute(
      "data-campo-personalizado-2-opcoes",
      "Calibração,Certificação,Manutenção,NR13,Automação,Treinamentos,Gerenciamento Metrológico,Locação,Suporte Logístico"
    );
    script.setAttribute("data-campo-personalizado-2-placeholder", "");
    script.setAttribute("data-campo-personalizado-2-obrigatorio", "true");

    // Dispara DOMContentLoaded para o widget inicializar após o script carregar
    script.onload = () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
    };

    document.body.appendChild(script);

    // Sem cleanup: o widget já está montado no DOM — removê-lo causaria bugs.
  }, []);

  return null;
}