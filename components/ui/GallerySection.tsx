"use client"

const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      title: "Laboratório de Calibração",
      description: "Nosso laboratório de precisão com equipamentos certificados",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop&crop=center",
      category: "Laboratório"
    },
    {
      id: 2,
      title: "Instrumentos de Medição",
      description: "Instrumentos de alta precisão para calibração",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop&crop=center",
      category: "Equipamentos"
    },
    {
      id: 3,
      title: "Certificação ISO",
      description: "Processo de certificação e auditoria",
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&h=300&fit=crop&crop=center",
      category: "Certificação"
    },
    {
      id: 4,
      title: "Equipe Técnica",
      description: "Profissionais especializados em metrologia",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=300&fit=crop&crop=center",
      category: "Equipe"
    },
    {
      id: 5,
      title: "Controle de Qualidade",
      description: "Processos rigorosos de controle de qualidade",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop&crop=center",
      category: "Qualidade"
    },
    {
      id: 6,
      title: "Tecnologia Avançada",
      description: "Equipamentos de última geração",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop&crop=center",
      category: "Tecnologia"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-bl from-[hsl(var(--brand-red))]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-tr from-[hsl(var(--primary))]/10 to-transparent rounded-3xl transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[hsl(var(--foreground))] to-[hsl(var(--brand-red))] bg-clip-text text-transparent">
              Nossa Galeria
            </span>
          </h2>
          <p className="text-xl text-[hsl(var(--muted-foreground))] max-w-3xl mx-auto">
            Conheça nossos laboratórios, equipamentos e equipe especializada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, index) => (
            <div 
              key={item.id}
              className="group relative bg-[hsl(var(--card))] rounded-2xl overflow-hidden shadow-md hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[hsl(var(--brand-red))] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-2 group-hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-red))]/0 to-[hsl(var(--brand-red))]/0 group-hover:from-[hsl(var(--brand-red))]/5 group-hover:to-transparent transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-[hsl(var(--muted-foreground))] mb-6">
            Essas são imagens de exemplo. Substitua pelas suas imagens reais da Tecnoiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] text-white px-8 py-3 rounded-xl hover:from-[hsl(var(--brand-red-dark))] hover:to-[hsl(var(--brand-red))] transition-all duration-300 hover:scale-105 shadow-[var(--shadow-red)] font-medium">
              Ver Mais Fotos
            </button>
            <button className="border-2 border-[hsl(var(--brand-red))] text-[hsl(var(--brand-red))] px-8 py-3 rounded-xl hover:bg-[hsl(var(--brand-red))] hover:text-white transition-all duration-300 font-medium">
              Agendar Visita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
