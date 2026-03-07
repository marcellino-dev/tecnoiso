'use client';

import { useEffect, useRef, useState } from 'react';

export default function IntroAnimation() {
  const [phase, setPhase] = useState<'loading' | 'lifting' | 'done'>('loading');
  const topRef = useRef<(HTMLSpanElement | null)[]>([]);
  const botRef = useRef<(HTMLSpanElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const doneRef = useRef(false);

  const word = 'TECNOISO';
  const revealAt = word.split('').map((_, i) =>
    Math.round(5 + (i / (word.length - 1)) * 88)
  );

  // ─── Background: Linhas Vivas ─────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let t = 0, raf: number, running = true;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const lines = Array.from({ length: 14 }, (_, i) => ({
      phase: i * 0.52, amp: 18 + Math.random() * 28,
      freq: 0.007 + Math.random() * 0.007, speed: 0.006 + Math.random() * 0.007, y: i / 13,
    }));
    const draw = () => {
      if (!running) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      lines.forEach(line => {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 2) {
          const y = line.y * H + Math.sin(x * line.freq + t * line.speed + line.phase) * line.amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const cd = Math.abs(line.y - 0.5);
        ctx.strokeStyle = `rgba(255,255,255,${0.03 + (1 - cd * 2) * 0.09})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  // ─── Progress + Slice reveal ──────────────────────────────────────────────
  useEffect(() => {
    // Se já viu a intro antes, remove o marginTop imediatamente e encerra
    if (sessionStorage.getItem('tecnoiso_intro_done')) {
      const site = document.getElementById('site-content');
      if (site) site.style.marginTop = '0';
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';

    const revealed = new Set<number>();
    const interval = setInterval(() => {
      if (doneRef.current) return;
      progressRef.current = Math.min(progressRef.current + Math.random() * 2.4 + 0.6, 100);
      const p = Math.floor(progressRef.current);

      word.split('').forEach((_, i) => {
        if (revealed.has(i) || p < revealAt[i]) return;
        revealed.add(i);
        const top = topRef.current[i];
        const bot = botRef.current[i];
        if (!top || !bot) return;
        top.style.transition = 'none';
        bot.style.transition = 'none';
        top.style.opacity = '1';
        bot.style.opacity = '1';
        top.style.transform = 'translateY(-100%)';
        bot.style.transform = 'translateY(100%)';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const delay = `${i * 0.03}s`;
            const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';
            top.style.transition = `transform 0.65s ${ease} ${delay}`;
            bot.style.transition = `transform 0.65s ${ease} ${delay}`;
            top.style.transform = 'translateY(0)';
            bot.style.transform = 'translateY(0)';
          });
        });
      });

      if (p >= 100) {
        doneRef.current = true;
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('tecnoiso_intro_done', '1');
          setPhase('lifting');
        }, 500);
      }
    }, 38);

    return () => clearInterval(interval);
  }, []);

  // ─── Lifting animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'lifting') return;

    const intro = document.getElementById('intro-panel');
    const site  = document.getElementById('site-content');
    if (!intro || !site) return;

    const duration = '1.6s';
    const easing   = 'cubic-bezier(0.65, 0, 0.35, 1)';

    requestAnimationFrame(() => {
      // Intro sobe para fora da tela
      intro.style.transition = `transform ${duration} ${easing}`;
      intro.style.transform  = 'translateY(-100%)';

      // Site sobe removendo o marginTop com animação
      site.style.transition  = `margin-top ${duration} ${easing}`;
      site.style.marginTop   = '0';
    });

    setTimeout(() => {
      document.body.style.overflow = '';
      if (site) site.style.transition = 'none';
      // Esconde o intro-panel imediatamente para não deixar espaço preto
      if (intro) intro.style.display = 'none';
      setPhase('done');
    }, 1700);
  }, [phase]);

  if (phase === 'done') return null;

  const FONT: React.CSSProperties = {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: 'clamp(48px, 10vw, 80px)',
    fontWeight: 700, color: '#fff',
    letterSpacing: '14px', lineHeight: '1',
    whiteSpace: 'nowrap', userSelect: 'none',
  };

  return (
    <div
      id="intro-panel"
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100vh',
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.65) 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex' }}>
        {word.split('').map((l, i) => (
          <div key={i} style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
            <span style={{ ...FONT, visibility: 'hidden', display: 'block' }}>{l}</span>
            <span ref={el => { topRef.current[i] = el; }} style={{
              ...FONT, position: 'absolute', inset: 0, display: 'block',
              clipPath: 'inset(0 0 50% 0)', opacity: 0, transform: 'translateY(-100%)',
            }}>{l}</span>
            <span ref={el => { botRef.current[i] = el; }} style={{
              ...FONT, position: 'absolute', inset: 0, display: 'block',
              clipPath: 'inset(50% 0 0 0)', opacity: 0, transform: 'translateY(100%)',
            }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}