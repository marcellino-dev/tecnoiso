"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── DADOS DOS EVENTOS ────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    mediaUrl: "/eventos/evento1.jpg",
    mediaType: "image" as const,
    index: "01",
  },
  {
    id: 2,
    mediaUrl: "https://res.cloudinary.com/dvqhv29io/video/upload/video_1_xtfruk.mp4",
    mediaType: "video" as const,
    index: "02",
  },
  {
    id: 3,
    mediaUrl: "/eventos/evento2.jpg",
    mediaType: "image" as const,
    index: "03",
  },
  {
    id: 4,
    mediaUrl: "/eventos/evento3.jpg",
    mediaType: "image" as const,
    index: "04",
  },
];

// ─── CONSTANTES DE LAYOUT ─────────────────────────────────────────────────────
const CARD_W    = 700;
const CARD_GAP  = 40;
const CARD_H    = 480;
const CARD_STEP = CARD_W + CARD_GAP;
const TOTAL     = events.length;
const SET_WIDTH = TOTAL * CARD_STEP;

const infiniteEvents = [...events, ...events, ...events];
const INITIAL_X = -SET_WIDTH;

// ─── COMPONENTE DE CARD ───────────────────────────────────────────────────────
function EventCard({ event }: { event: (typeof events)[0] }) {
  return (
    <div style={{ width: CARD_W, flexShrink: 0 }} className="group cursor-pointer">
      <div className="relative rounded-2xl overflow-hidden" style={{ height: CARD_H }}>
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
  const sectionRef = useRef<HTMLDivElement>(null);

  const xRaw = useMotionValue(INITIAL_X);
  const x = useSpring(xRaw, { stiffness: 80, damping: 25, mass: 0.5 });

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect             = el.getBoundingClientRect();
    const sectionH         = el.offsetHeight;
    const vh               = window.innerHeight;
    const scrollableDistance = sectionH + vh;
    const scrolled         = vh - rect.top;
    const progress         = Math.max(0, Math.min(1, scrolled / scrollableDistance));
    const targetX          = INITIAL_X - progress * SET_WIDTH;

    const currentX = xRaw.get();

    if (currentX < -2 * SET_WIDTH) {
      xRaw.set(currentX + SET_WIDTH);
      return;
    }
    if (currentX > 0) {
      xRaw.set(currentX - SET_WIDTH);
      return;
    }

    xRaw.set(targetX);

    const absoluteIndex = Math.round(Math.abs(targetX - INITIAL_X) / CARD_STEP);
    setActiveIndex(absoluteIndex % TOTAL);
  }, [xRaw]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="py-24 overflow-hidden">

      {/* ── CABEÇALHO ──────────────────────────────────────────────────────── */}
      <div className="px-10 mb-10">
        <span className="text-[hsl(var(--brand-red))] font-semibold text-xs tracking-[0.25em] uppercase mb-2 block">
          Agenda
        </span>
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Eventos &{" "}
            <span className="text-[hsl(var(--brand-red))]">Palestras</span>
          </h2>
          
        </div>
      </div>

      {/* ── TRACK HORIZONTAL ─────────────────────────────────────────────── */}
      <div className="overflow-visible">
        <motion.div className="flex" style={{ x, paddingLeft: 40 }}>
          {infiniteEvents.map((event, i) => (
            <div key={`${event.id}-${i}`} style={{ marginRight: CARD_GAP }}>
              <EventCard event={event} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── DOTS INDICADORES ─────────────────────────────────────────────── */}
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