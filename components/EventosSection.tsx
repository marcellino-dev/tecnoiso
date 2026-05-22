"use client";

import { useRef, useEffect } from "react";

const images = [
  "/eventos/evento1.jpg",
  "/eventos/agradecimentos.png",
  "/eventos/evento2.jpg",
  "/eventos/evento3.jpg",
];

const CARD_W = 680;
const GAP    = 12;
const STEP   = CARD_W + GAP;
const TOTAL  = images.length;
const SET_W  = TOTAL * STEP;
const SPEED  = 0.6;

const looped = [...images, ...images, ...images];

const EventsSection = () => {
  const trackRef     = useRef<HTMLDivElement>(null);
  const vpRef        = useRef<HTMLDivElement>(null);
  const offsetRef    = useRef(0);
  const pausedRef    = useRef(false);
  const rafRef       = useRef<number | null>(null);
  const pauseTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart    = useRef<number | null>(null);
  const dragOffset   = useRef(0);

  const applyOffset = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
  };

  const normalize = () => {
    if (offsetRef.current >= SET_W) offsetRef.current -= SET_W;
    if (offsetRef.current < 0)      offsetRef.current += SET_W;
  };

  const pauseBriefly = (ms = 1200) => {
    pausedRef.current = true;
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => { pausedRef.current = false; }, ms);
  };

  const jumpBy = (delta: number) => {
    offsetRef.current += delta;
    normalize();
    applyOffset();
    pauseBriefly(1400);
  };

  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += SPEED;
        normalize();
        applyOffset();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  // ── Mouse drag ────────────────────────────────────────────────────────────
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;

    const onMouseDown = (e: MouseEvent) => {
      dragStart.current  = e.clientX;
      dragOffset.current = offsetRef.current;
      pausedRef.current  = true;
      vp.style.cursor    = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (dragStart.current === null) return;
      offsetRef.current = dragOffset.current + (dragStart.current - e.clientX);
      normalize();
      applyOffset();
    };

    const onMouseUp = () => {
      if (dragStart.current === null) return;
      dragStart.current = null;
      vp.style.cursor   = "grab";
      pauseBriefly(800);
    };

    const onTouchStart = (e: TouchEvent) => {
      dragStart.current  = e.touches[0].clientX;
      dragOffset.current = offsetRef.current;
      pausedRef.current  = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (dragStart.current === null) return;
      offsetRef.current = dragOffset.current + (dragStart.current - e.touches[0].clientX);
      normalize();
      applyOffset();
    };

    const onTouchEnd = () => {
      dragStart.current = null;
      pauseBriefly(800);
    };

    vp.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove",  onTouchMove,  { passive: true });
    vp.addEventListener("touchend",   onTouchEnd);

    return () => {
      vp.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove",  onTouchMove);
      vp.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <section className="py-16 overflow-hidden">

      {/* Cabeçalho */}
      <div className="px-8 mb-8 flex items-end justify-between">
        <div>
          <span className="text-[hsl(var(--brand-red))] font-semibold text-[11px] tracking-[0.2em] uppercase mb-1.5 block">
            Agenda
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Eventos &{" "}
            <span className="text-[hsl(var(--brand-red))]">Palestras</span>
          </h2>
        </div>

        {/* Botões de navegação */}
        <div className="flex gap-2">
          <button
            onClick={() => jumpBy(-STEP)}
            aria-label="Anterior"
            className="w-9 h-9 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors duration-150 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => jumpBy(STEP)}
            aria-label="Próximo"
            className="w-9 h-9 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors duration-150 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Viewport + Track */}
      <div
        ref={vpRef}
        className="overflow-hidden cursor-grab select-none"
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ paddingLeft: 32, gap: GAP, willChange: "transform" }}
        >
          {looped.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-xl overflow-hidden bg-muted"
              style={{ width: CARD_W, height: 460 }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default EventsSection;