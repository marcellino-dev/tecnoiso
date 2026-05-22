"use client";

import { useRef, useState, useEffect } from "react";

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type MediaType = "image" | "video";

interface EventItem {
  id: number;
  mediaUrl: string;
  mediaType: MediaType;
}

// ─── DADOS DOS EVENTOS ────────────────────────────────────────────────────────
const events: EventItem[] = [
  { id: 1, mediaUrl: "/eventos/evento1.jpg",        mediaType: "image" },
  { id: 2, mediaUrl: "/eventos/agradecimentos.png", mediaType: "image" },
  { id: 3, mediaUrl: "/eventos/evento2.jpg",        mediaType: "image" },
  { id: 4, mediaUrl: "/eventos/evento3.jpg",        mediaType: "image" },
];

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const CARD_W    = 700;
const CARD_GAP  = 40;
const CARD_H    = 480;
const CARD_STEP = CARD_W + CARD_GAP;
const TOTAL     = events.length;
const SET_WIDTH = TOTAL * CARD_STEP;   // largura de 1 set completo
const AUTO_SPEED = 1.2;                // px por frame — aumente para acelerar

// Duplicamos 3x para ter sempre cards visíveis antes e depois
const loopedEvents: EventItem[] = [...events, ...events, ...events];

// ─── CARD ─────────────────────────────────────────────────────────────────────
function EventCard({ event }: { event: EventItem }) {
  return (
    <div
      style={{ width: CARD_W, flexShrink: 0, marginRight: CARD_GAP }}
      className="group cursor-pointer"
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ height: CARD_H }}
      >
        {event.mediaType === "video" ? (
          <video
            src={event.mediaUrl}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={event.mediaUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const EventsSection = () => {
  const trackRef   = useRef<HTMLDivElement>(null);
  const offsetRef  = useRef(0);          // offset acumulado em px (sempre crescente)
  const rafRef     = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tick = () => {
      offsetRef.current += AUTO_SPEED;

      // Quando passamos um set completo, voltamos exatamente 1 set —
      // o visual é idêntico porque os cards se repetem.
      if (offsetRef.current >= SET_WIDTH) {
        offsetRef.current -= SET_WIDTH;
      }

      // Aplica direto no DOM — sem re-render, sem spring, sem salto
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      // Atualiza dot (só setState com frequência baixa para não sobrecarregar)
      const idx = Math.floor(offsetRef.current / CARD_STEP) % TOTAL;
      setActiveIndex(idx);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="py-24 overflow-hidden">

      {/* ── CABEÇALHO ──────────────────────────────────────────────────────── */}
      <div className="px-10 mb-10">
        <span className="text-[hsl(var(--brand-red))] font-semibold text-xs tracking-[0.25em] uppercase mb-2 block">
          Agenda
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
          Eventos &{" "}
          <span className="text-[hsl(var(--brand-red))]">Palestras</span>
        </h2>
      </div>

      {/* ── TRACK ─────────────────────────────────────────────────────────── */}
      <div className="overflow-visible" style={{ paddingLeft: 40 }}>
        <div
          ref={trackRef}
          className="flex"
          style={{ willChange: "transform" }}
        >
          {loopedEvents.map((event, i) => (
            <EventCard key={`${event.id}-${i}`} event={event} />
          ))}
        </div>
      </div>

      {/* ── DOTS ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {events.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 h-1.5 bg-[hsl(var(--brand-red))]"
                : "w-1.5 h-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default EventsSection;