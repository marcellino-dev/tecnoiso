"use client"
import { motion } from "framer-motion";
import {
  Gauge,
  Award,
  Wrench,
  ShieldCheck,
  Cpu,
  GraduationCap,
  BarChart3,
  ShoppingCart,
  Package,
  Truck,
} from "lucide-react";
const services = [
  {
    icon: Gauge,
    title: "Calibração",
    desc: "Calibração de instrumentos com rastreabilidade e alta precisão, seguindo normas nacionais e internacionais.",
  },
  {
    icon: Award,
    title: "Certificação",
    desc: "Emissão de certificados de calibração acreditados pelo INMETRO, garantindo conformidade e confiabilidade.",
  },
  {
    icon: Wrench,
    title: "Manutenção",
    desc: "Manutenção preventiva e corretiva de instrumentos de medição, prolongando a vida útil dos seus equipamentos.",
  },
  {
    icon: ShieldCheck,
    title: "NR 13",
    desc: "Inspeção e adequação de vasos de pressão e caldeiras conforme a Norma Regulamentadora NR 13.",
  },
  {
    icon: Cpu,
    title: "Automação",
    desc: "Soluções em automação industrial para otimizar processos e aumentar a eficiência operacional.",
  },
  {
    icon: GraduationCap,
    title: "Treinamentos",
    desc: "Capacitação técnica em metrologia, calibração e uso correto de instrumentos de medição.",
  },
  {
    icon: BarChart3,
    title: "Gerenciamento Metrológico",
    desc: "Gestão completa do parque de instrumentos, com controle de prazos, históricos e indicadores.",
  },
  {
    icon: ShoppingCart,
    title: "Vendas",
    desc: "Comercialização de instrumentos de medição e acessórios das melhores marcas do mercado.",
  },
  {
    icon: Package,
    title: "Locação",
    desc: "Locação de instrumentos de medição calibrados para projetos temporários ou demandas sazonais.",
  },
  {
    icon: Truck,
    title: "Suporte Logístico",
    desc: "Coleta e entrega de instrumentos com logística dedicada, garantindo agilidade e segurança.",
  },
];
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const ServicosSection = () => {
  return (
    <section id="servicos" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em metrologia, calibração e automação industrial com certificação INMETRO.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="group relative bg-card border border-border rounded-lg p-8 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-b-lg group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default ServicosSection;