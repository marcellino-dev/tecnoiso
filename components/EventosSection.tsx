"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EventsSection — Carrossel Infinito com Parallax de Scroll
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Desenvolvi essa seção inspirado no site ready.so. A ideia principal é que
 * o scroll da página seja 100% LIVRE — sem travamentos — e os cards se movam
 * horizontalmente como um efeito de parallax enquanto a página rola.
 *
 * Para o loop INFINITO, tripliquei a lista de eventos [A | B | C].
 * Começo sempre na cópia do meio (B). Quando o scroll empurra os cards
 * além da cópia C, faço um "reset silencioso" de volta para a cópia B —
 * o usuário não percebe o salto porque o conteúdo é idêntico.
 *
 * Dependências necessárias:
 *   - framer-motion  → animação com spring physics
 *   - lucide-react   → ícones de calendário e localização
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── DADOS DOS EVENTOS ────────────────────────────────────────────────────────
// Aqui eu cadastro os eventos. Posso adicionar ou remover livremente —
// o carrossel se adapta automaticamente ao número de itens.
const events = [
  {
    id: 1,
    title: "Workshop de Calibração Avançada",
    description:
      "Técnicas modernas de calibração com equipamentos de alta precisão. Ideal para profissionais que buscam atualização técnica e melhores práticas do setor.",
    mediaUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&crop=center",
    mediaType: "image" as const,
    date: "Mar 2026",
    location: "São Paulo, SP",
    category: "Workshop",
    index: "01",
  },
  {
    id: 2,
    title: "Palestra Normas ISO 17025",
    description:
      "Implementação e manutenção de sistemas de qualidade em laboratórios, abordando os requisitos da norma e cases de sucesso.",
    mediaUrl:
      "https://res.cloudinary.com/dvqhv29io/video/upload/video_1_xtfruk.mp4",
    mediaType: "video" as const,
    date: "Mai 2026",
    location: "Rio de Janeiro, RJ",
    category: "Palestra",
    index: "02",
  },
  {
    id: 3,
    title: "Seminário Metrologia Industrial",
    description:
      "Últimas tendências e tecnologias em metrologia para a indústria, com participação de especialistas renomados do setor.",
    mediaUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=500&fit=crop&crop=center",
    mediaType: "image" as const,
    date: "Jul 2026",
    location: "Belo Horizonte, MG",
    category: "Seminário",
    index: "03",
  },
  {
    id: 4,
    title: "Treinamento Instrumentos de Medição",
    description:
      "Capacitação prática em uso e manutenção de instrumentos de precisão, com abordagem hands-on e certificação ao final.",
    mediaUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&crop=center",
    mediaType: "image" as const,
    date: "Set 2026",
    location: "Curitiba, PR",
    category: "Treinamento",
    index: "04",
  },
];

// ─── CONSTANTES DE LAYOUT ─────────────────────────────────────────────────────
// Defini tudo em px para ser consistente em qualquer resolução.
// Se quiser ajustar o tamanho dos cards, basta mudar CARD_W e CARD_H.

const CARD_W    = 700; // largura de cada card em px
const CARD_GAP  = 40;  // espaço entre os cards em px
const CARD_H    = 480; // altura da imagem/vídeo dentro do card em px
const CARD_STEP = CARD_W + CARD_GAP; // distância de um card ao próximo

const TOTAL = events.length; // total de eventos originais (sem as cópias)

// Largura total de UMA cópia do carrossel.
// Uso esse valor para saber quando chegou ao fim de uma cópia e preciso resetar.
const SET_WIDTH = TOTAL * CARD_STEP;

// ─── LÓGICA DO CARROSSEL INFINITO ─────────────────────────────────────────────
// Triplicar os eventos cria a ilusão de loop infinito.
// Estrutura: [ cópia A | cópia B | cópia C ]
// Eu sempre navego dentro da cópia B. Quando sair dela, reseto silenciosamente.
const infiniteEvents = [...events, ...events, ...events];

// O carrossel começa na cópia B, que está exatamente em -SET_WIDTH.
// Sem isso ele mostraria a cópia A primeiro, quebrando o loop ao voltar.
const INITIAL_X = -SET_WIDTH;


// ─── COMPONENTE DE CARD ───────────────────────────────────────────────────────
// Separei o card em um componente próprio para manter o código organizado.
// Ele aceita um evento e renderiza imagem/vídeo + informações.
function EventCard({ event }: { event: (typeof events)[0] }) {
  return (
    <div style={{ width: CARD_W, flexShrink: 0 }} className="group cursor-pointer">

      {/* Container da mídia — uso flexShrink:0 para o card nunca encolher dentro do flex */}
      <div className="relative rounded-2xl overflow-hidden mb-4" style={{ height: CARD_H }}>

        {/* Renderizo vídeo ou imagem dependendo do mediaType do evento */}
        {event.mediaType === "video" ? (
          <video
            src={event.mediaUrl}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={event.mediaUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Gradiente escuro na base — sem isso o texto ficaria ilegível */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge da categoria (Workshop, Palestra, etc.) */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[hsl(var(--brand-red))] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
          {event.category}
        </span>

        {/* Número decorativo no canto — bem translúcido, só para dar profundidade visual */}
        <span className="absolute bottom-3 right-4 text-white/10 font-black text-6xl leading-none select-none">
          {event.index}
        </span>
      </div>

      {/* Data e localização do evento */}
      <div className="flex items-center gap-3 text-muted-foreground text-xs mb-2">
        <span className="flex items-center gap-1"><Calendar size={11} />{event.date}</span>
        <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>
      </div>

      {/* Título — muda para vermelho no hover via Tailwind group */}
      <h3 className="text-foreground font-semibold text-base leading-snug mb-1 group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
        {event.title}
      </h3>

      {/* Descrição resumida em no máximo 2 linhas */}
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
        {event.description}
      </p>

      {/* Linha vermelha animada que aparece no hover — detalhe de interatividade */}
      <div className="mt-4 h-px w-0 group-hover:w-full bg-[hsl(var(--brand-red))]/40 transition-all duration-500" />
    </div>
  );
}


// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const EventsSection = () => {
  // Ref para a section inteira — preciso da posição dela na página para calcular o parallax
  const sectionRef = useRef<HTMLDivElement>(null);

  /**
   * xRaw é o valor bruto da posição X em px (negativo = deslocado à esquerda).
   * Uso useMotionValue porque ele não causa re-render ao atualizar —
   * isso é essencial para não travar o scroll com renders desnecessários.
   *
   * x é a versão "suavizada" com spring physics.
   * O spring dá aquela sensação de inércia e suavidade ao movimento.
   * - stiffness: quão rígida é a mola (mais alto = mais rápido)
   * - damping: quanto a mola freia (mais alto = menos oscilação)
   * - mass: peso simulado (mais alto = mais lento para arrancar e freiar)
   */
  const xRaw = useMotionValue(INITIAL_X);
  const x = useSpring(xRaw, { stiffness: 80, damping: 25, mass: 0.5 });

  // Controlo qual dot fica ativo com base no card visível no momento
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Aqui está o coração da seção.
   * Uso useCallback para não recriar a função a cada render.
   *
   * A lógica funciona assim:
   *  1. Pego a posição da section na viewport via getBoundingClientRect()
   *  2. Calculo um "progress" de 0 a 1 — 0 quando a seção acabou de entrar
   *     na tela, 1 quando ela está saindo pelo topo
   *  3. Mapeio esse progress para a translação horizontal dos cards
   *  4. Verifico se saí dos limites da cópia B do loop infinito —
   *     se sim, faço um reset instantâneo (sem spring) para a cópia equivalente
   */
  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect    = el.getBoundingClientRect(); // posição atual da section
    const sectionH = el.offsetHeight;           // altura total da section
    const vh       = window.innerHeight;        // altura da viewport

    // Distância total que a seção percorre enquanto está na tela (entrada + saída)
    const scrollableDistance = sectionH + vh;

    // Quantos px já foram scrollados desde que a seção entrou pela base da viewport
    const scrolled = vh - rect.top;

    // Normalizo para 0→1 e clamp para não sair dos limites
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    // Translação alvo: começo em INITIAL_X e avanço uma cópia inteira (SET_WIDTH)
    const targetX = INITIAL_X - progress * SET_WIDTH;

    // ── Loop infinito (técnica "clone flip") ──────────────────────────────────
    // Leio o valor atual do xRaw (não o do spring, que tem delay)
    const currentX = xRaw.get();

    // Se passei para a cópia C (muito à esquerda), pulo de volta para a cópia A
    // O salto é imperceptível porque o conteúdo é idêntico
    if (currentX < -2 * SET_WIDTH) {
      xRaw.set(currentX + SET_WIDTH);
      return;
    }
    // Se voltei para antes da cópia A (muito à direita), pulo para a cópia C
    if (currentX > 0) {
      xRaw.set(currentX - SET_WIDTH);
      return;
    }

    // Aplico a posição calculada
    xRaw.set(targetX);

    // Atualizo o dot ativo — calculo qual card original corresponde à posição atual
    const absoluteIndex = Math.round(Math.abs(targetX - INITIAL_X) / CARD_STEP);
    setActiveIndex(absoluteIndex % TOTAL);
  }, [xRaw]);

  useEffect(() => {
    // passive: true é obrigatório aqui — sem isso o scroll seria bloqueado
    // enquanto o handler processa, causando engasgos visíveis
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Rodo uma vez ao montar para garantir o posicionamento correto
    // mesmo que o usuário já esteja no meio da página ao carregar
    handleScroll();

    // Limpo o listener ao desmontar para não vazar memória
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);


  return (
    // overflow-hidden na section para os cards não causarem scroll horizontal na página
    <section ref={sectionRef} className="py-24 overflow-hidden">

      {/* ── CABEÇALHO ─────────────────────────────────────────────────────────
          Esse header rola normalmente com a página — não fica fixo.
          O efeito parallax é só nos cards abaixo.
      ── */}
      <div className="px-10 mb-10">
        <span className="text-[hsl(var(--brand-red))] font-semibold text-xs tracking-[0.25em] uppercase mb-2 block">
          Agenda
        </span>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Eventos &{" "}
            <span className="text-[hsl(var(--brand-red))]">Palestras</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs text-right hidden md:block">
            Role para explorar nossos workshops, palestras e treinamentos.
          </p>
        </div>
      </div>

      {/* ── TRACK HORIZONTAL ──────────────────────────────────────────────────
          overflow-visible aqui é intencional — deixo os cards "vazar" para fora
          do container para criar o efeito de peek do próximo card na borda.
          O motion.div é controlado pelo motion value `x`.
      ── */}
      <div className="overflow-visible">
        <motion.div className="flex" style={{ x, paddingLeft: 40 }}>
          {/*
           * Renderizo os eventos triplicados para o loop infinito.
           * A key combina o id + índice global para evitar conflitos de React
           * entre as três cópias do mesmo evento.
           */}
          {infiniteEvents.map((event, i) => (
            <div
              key={`${event.id}-${i}`}
              style={{ marginRight: CARD_GAP }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── DOTS INDICADORES ──────────────────────────────────────────────────
          Mostro apenas os dots dos eventos ORIGINAIS (não das 3 cópias).
          O activeIndex é calculado com módulo para sempre cair entre 0 e TOTAL-1.
      ── */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {events.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-1.5 bg-[hsl(var(--brand-red))]"  // dot ativo: largo e vermelho
                : "w-1.5 h-1.5 bg-muted-foreground/30"    // dot inativo: pequeno e cinza
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default EventsSection;