"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const EventsSection = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const events = [
    {
      id: 1,
      title: "Workshop de Calibração Avançada",
      description: "Evento demonstrando técnicas modernas de calibração com equipamentos de alta precisão.",
      mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&crop=center",
      mediaType: "image" as const,
      date: "2026",
      location: "São Paulo, SP",
      category: "Workshop",
    },
    {
      id: 2,
      title: "Palestra Normas ISO 17025",
      description: "Apresentação sobre implementação e manutenção de sistemas de qualidade em laboratórios.",
      mediaUrl: "https://res.cloudinary.com/dvqhv29io/video/upload/video_1_xtfruk.mp4",
      mediaType: "video" as const,
      date: "2026",
      location: "Rio de Janeiro, RJ",
      category: "Palestra",
    },
    {
      id: 3,
      title: "Seminário Metrologia Industrial",
      description: "Discussão sobre as últimas tendências e tecnologias em metrologia para a indústria.",
      mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=500&fit=crop&crop=center",
      mediaType: "image" as const,
      date: "2026",
      location: "Belo Horizonte, MG",
      category: "Seminário",
    },
    {
      id: 4,
      title: "Treinamento Instrumentos de Medição",
      description: "Capacitação prática em uso e manutenção de instrumentos de precisão.",
      mediaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&crop=center",
      mediaType: "image" as const,
      date: "2026",
      location: "Curitiba, PR",
      category: "Treinamento",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentEvent((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, events.length]);

  const current = events[currentEvent];
  const goNext = () => setCurrentEvent((prev) => (prev + 1) % events.length);
  const goPrev = () => setCurrentEvent((prev) => (prev - 1 + events.length) % events.length);

  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[hsl(var(--brand-red))] font-semibold text-sm tracking-widest uppercase mb-3 block">Agenda</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Eventos & <span className="text-[hsl(var(--brand-red))]">Palestras</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Acompanhe nossos workshops, palestras e treinamentos sobre metrologia, calibração e normas técnicas.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg">
            <div className="absolute inset-0 transition-opacity duration-500">
              {current.mediaType === "video" ? (
                <video src={current.mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
              ) : (
                <img src={current.mediaUrl} alt={current.title} className="w-full h-full object-cover" loading="lazy" />
              )}
            </div>

            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 bg-[hsl(var(--brand-red))] text-[hsl(var(--brand-white))] text-xs font-bold uppercase tracking-wider rounded-full">
                {current.category}
              </span>
            </div>

            <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors">
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
              <div className="flex items-center gap-4 text-white/70 text-sm mb-2">
                <span className="flex items-center gap-1.5"><Calendar size={14} />{current.date}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} />{current.location}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{current.title}</h3>
              <p className="text-white/70 text-sm max-w-xl hidden md:block">{current.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setIsPlaying(!isPlaying)} className="text-muted-foreground hover:text-foreground transition-colors">
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEvent(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentEvent ? "w-10 bg-[hsl(var(--brand-red))]" : "w-4 bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {events.map((event, index) => (
              <button
                key={event.id}
                onClick={() => setCurrentEvent(index)}
                className={`text-left p-4 rounded-xl transition-all duration-300 border ${
                  index === currentEvent
                    ? "border-[hsl(var(--brand-red))]/40 bg-[hsl(var(--brand-red))]/5 shadow-sm"
                    : "border-border bg-background hover:border-[hsl(var(--brand-red))]/20 hover:bg-muted/50"
                }`}
              >
                <span className={`text-xs font-semibold uppercase tracking-wider ${index === currentEvent ? "text-[hsl(var(--brand-red))]" : "text-muted-foreground"}`}>
                  {event.category}
                </span>
                <h4 className={`text-sm font-medium mt-1 leading-snug ${index === currentEvent ? "text-foreground" : "text-muted-foreground"}`}>
                  {event.title}
                </h4>
                <span className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <MapPin size={10} />{event.location}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;