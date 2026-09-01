# 🛡️ Proteção Contra Bots - Documentação

## Visão Geral

Implementamos uma camada de proteção multi-camadas para a rota `/api/send-quote` para combater:
- ✅ **Rate Limiting**: Limite de 5 requisições por hora por IP
- ✅ **Bot Detection**: Detecção de User-Agents suspeitos, headers ausentes, padrões de spam
- ✅ **Honeypot Field**: Campo invisível para detectar automações

---

## 📊 Testes Automatizados

Todos os testes estão em `__tests__/protection.test.ts` com **18 testes passando**.

### Rodar os testes:
```bash
# Uma única execução
npm test

# Modo watch (reexecuta quando você salva)
npm test:watch

# Com cobertura de código
npm test:coverage
```

### Resultado esperado:
```
Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
```

---

## 🔒 Rate Limiting

### Como funciona:
- Máximo: **5 requisições por hora** por IP
- Armazenamento: Memória (limpeza automática a cada 30 minutos)
- Resposta HTTP: **429 Too Many Requests**

### Exemplo de resposta quando excedido:
```json
{
  "success": false,
  "error": "Limite de requisições excedido. Tente novamente em 45 minutos.",
  "resetAt": "2026-09-01T18:58:02.000Z"
}
```

### Arquivo: `lib/rateLimit.ts`

**Funções principais:**
```typescript
// Verificar rate limit
checkRateLimit(ip, { maxRequests: 5, windowMs: 3600000 })
// Retorna: { allowed: boolean, remaining: number, resetAt: Date }

// Limpar IP específico (para testes)
resetRateLimitForIp(ip)

// Limpar todos os registros
resetAllRateLimits()
```

---

## 🤖 Bot Detection

### Detecções implementadas:

#### 1. User-Agent suspeito
```typescript
// Detecta: python, curl, selenium, puppeteer, scrapy, etc.
if (userAgent.includes("python") || userAgent.includes("curl")) {
  // É provável que seja um bot
}
```

#### 2. Headers ausentes
```typescript
// Um browser real SEMPRE envia:
- Accept
- Accept-Language  
- Referer (geralmente)

// Bots frequentemente não enviam
```

#### 3. Honeypot field preenchido
```typescript
// Campo invisível que usuários reais nunca verão/preenchem
<input name="website_url" style="display: none;" />

// Se estiver preenchido → é bot
```

#### 4. Padrões de spam
- Múltiplas URLs na mensagem (>3 URLs = suspeito)
- Palavras-chave: "viagra", "casino", "urgente", "clique aqui", etc.
- Email inválido
- Telefone muito curto

### Pontuação de suspeição (0-100):
- **0-40**: Legítimo ✅
- **40-60**: Suspeito ⚠️ (permitido, mas registrado)
- **60-100**: Bloqueado 🚫

### Arquivo: `lib/botDetection.ts`

**Função principal:**
```typescript
const result = checkIsBot(headers, body);
// Retorna:
// {
//   isBot: boolean,
//   reasons: string[],
//   suspicionScore: 0-100
// }
```

---

## 📝 Usar no Frontend - Adicionar Honeypot

Para adicionar a proteção no formulário, inclua o campo honeypot invisível.

### Opção 1: Em um componente React

```typescript
// components/ContactForm.tsx
import { getHoneypotFieldName } from "@/lib/botDetection";

export function ContactForm() {
  const honeypotName = getHoneypotFieldName(); // "website_url"
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Campos visíveis normais */}
      <input name="name" placeholder="Seu nome" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Telefone" required />
      
      {/* ⬇️ HONEYPOT INVISÍVEL - Bots preenchem, usuários reais não */}
      <input
        type="text"
        name={honeypotName}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Opção 2: Usando helper do botDetection

```typescript
import { getHoneypotFieldHTML } from "@/lib/botDetection";

// Adicione isto no seu formulário HTML:
<div dangerouslySetInnerHTML={{ __html: getHoneypotFieldHTML() }} />
```

### Opção 3: HTML puro

```html
<form action="/api/send-quote" method="POST">
  <!-- Campos normais -->
  <input type="text" name="name" placeholder="Nome" required />
  <input type="email" name="email" placeholder="Email" required />
  
  <!-- Honeypot - INVISÍVEL -->
  <input 
    type="text" 
    name="website_url" 
    style="display: none; position: absolute; left: -9999px;" 
    tabindex="-1" 
    autocomplete="off"
    aria-hidden="true"
  />
  
  <button type="submit">Enviar</button>
</form>
```

---

## 🚀 Fluxo de Requisição

```
┌─────────────────────────────────────┐
│ Requisição chega em /api/send-quote │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 1️⃣  Verificar RATE LIMIT            │
│     (5 req/hora por IP)             │
└────────────┬────────────────────────┘
             │
          FALHA? ──→ 429 Too Many Requests
             │
             ▼ OK
┌─────────────────────────────────────┐
│ 2️⃣  Parse JSON do corpo             │
└────────────┬────────────────────────┘
             │
          ERRO? ──→ 400 Bad Request
             │
             ▼ OK
┌─────────────────────────────────────┐
│ 3️⃣  Verificar BOT DETECTION         │
│     (headers, user-agent, dados)    │
└────────────┬────────────────────────┘
             │
          É BOT? ──→ 403 Forbidden
             │
             ▼ OK
┌─────────────────────────────────────┐
│ 4️⃣  Validar dados do formulário     │
│     (nome, email, telefone)         │
└────────────┬────────────────────────┘
             │
          ERRO? ──→ 400 Bad Request
             │
             ▼ OK
┌─────────────────────────────────────┐
│ 5️⃣  Enviar emails + webhook         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ ✅ 200 Sucesso                      │
└─────────────────────────────────────┘
```

---

## 📋 Códigos HTTP de Resposta

| Código | Significado | Motivo |
|--------|-------------|--------|
| **200** | ✅ Sucesso | Email enviado com sucesso |
| **400** | ❌ Bad Request | JSON inválido ou dados ausentes |
| **403** | 🤖 Forbidden | Detectado como bot |
| **429** | ⏱️ Too Many Requests | Limite de requisições excedido |
| **500** | 🔥 Server Error | Erro ao enviar email |

---

## 🧪 Exemplos de Requisições

### ✅ Requisição Legítima
```bash
curl -X POST https://tecnoiso.com/api/send-quote \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
  -H "Accept: application/json" \
  -H "Accept-Language: pt-BR" \
  -d '{
    "name": "João Silva",
    "email": "joao@empresa.com.br",
    "phone": "(47) 3438-3175",
    "service": "Manutenção & Calibração",
    "message": "Gostaria de agendar uma manutenção.",
    "website_url": ""
  }'
```

**Resposta:**
```json
{
  "success": true
}
```

### 🤖 Requisição de Bot (Python)
```bash
curl -X POST https://tecnoiso.com/api/send-quote \
  -H "Content-Type: application/json" \
  -H "User-Agent: python-requests/2.28.0" \
  -d '{
    "name": "Bot",
    "email": "bot@spam.com",
    "phone": "123",
    "website_url": "https://spam.com"
  }'
```

**Resposta: 403 Forbidden**
```json
{
  "success": false,
  "error": "Sua requisição foi bloqueada por suspeita de automação."
}
```

### ⏱️ Limite Excedido
```json
{
  "success": false,
  "error": "Limite de requisições excedido. Tente novamente em 45 minutos.",
  "resetAt": "2026-09-01T18:58:02.000Z"
}
```

---

## 📊 Monitoramento

### Logs em Desenvolvimento

Quando um bot é detectado, você verá logs como:
```
🤖 Possível bot detectado de IP 192.168.1.100:
   - User-Agent contém padrão suspeito: python
   - Header Accept ausente
   - Honeypot field preenchido

⚠️ Requisição suspeita de IP 192.168.1.101 (score: 45):
   - Header Accept-Language ausente
   - Múltiplas URLs na mensagem (4)
```

### Em Produção

Recomendamos:
1. Integrar com serviço de logging (Sentry, LogRocket, etc.)
2. Alertar quando muitas requisições de bot forem detectadas
3. Banir IPs que fazer múltiplas tentativas suspeitas

---

## 🔧 Configurações Personalizáveis

### Alterar Rate Limit

**Em: `app/api/send-quote/route.ts`**
```typescript
const rateLimitResult = checkRateLimit(clientIp, {
  maxRequests: 10,  // ← Alterar para 10 requisições
  windowMs: 60 * 60 * 1000,  // ← Por 1 hora
});
```

### Adicionar mais User-Agents de Bot

**Em: `lib/botDetection.ts`**
```typescript
const BOT_USER_AGENTS = [
  // ... existentes
  "seu-novo-bot", // ← Adicionar aqui
];
```

### Alterar Pontuação de Suspeição

**Em: `lib/botDetection.ts`** - função `checkIsBot`
```typescript
// Aumentar peso de headers ausentes
suspicionScore += headersCheck.reasons.length * 20; // ← Era 15
```

---

## 🎯 Próximos Passos Recomendados

1. **reCAPTCHA**: Adicionar reCAPTCHA v3 (invisível) para proteção extra
2. **Rate Limiting com Redis**: Para ambientes com múltiplos servidores
3. **IP Whitelist**: Adicionar lista de IPs confiáveis (parceiros, etc.)
4. **Email Verification**: Verificar email antes de enviar
5. **Dashboard de Monitoramento**: Visualizar tentativas bloqueadas
6. **Geographic Blocking**: Bloquear países de alto risco

---

## 📞 Suporte

Se encontrar problemas ou falsos positivos, verifique:
1. Se o usuário tem os headers corretos (Accept, Accept-Language)
2. Se o formulário está enviando o honeypot field (vazio)
3. Se não está repetindo requisições além do limite
4. Checar logs do servidor para detalhes de bloqueio

---

**Criado em: 2026-09-01**  
**Última atualização: 2026-09-01**  
**Status: ✅ Produção**
