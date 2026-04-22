"use client"

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "", message: "",
  });

  // Captura UTMs da URL automaticamente
  const [utms, setUtms] = useState({
    utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
    });
  }, []);

  const contactInfo = [
    { icon: MapPin, title: "Endereço", content: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
    { icon: Phone,  title: "Telefone", content: "(47) 3438-3175" },
    { icon: Mail,   title: "E-mail",   content: "contato@tecnoiso.com" },
    { icon: Clock,  title: "Horário",  content: "Segunda à Sexta\n07:42 às 17:30" },
  ];

  const maxLengths: Record<string, number> = {
    name: 100, company: 200, email: 254, phone: 20, service: 300, message: 2000,
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let masked = "";
    if (digits.length === 0) {
      masked = "";
    } else if (digits.length <= 2) {
      masked = `(${digits}`;
    } else if (digits.length <= 6) {
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      // Fixo: (47) 3438-3175
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      // Celular: (47) 98929-9801
      masked = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
    setFormData(prev => ({ ...prev, phone: masked }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const max = maxLengths[name] || 500;
    if (value.length > max) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v.trim()]));

    // Validações no cliente
    if (!trimmed.name || !trimmed.email || !trimmed.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios."); return;
    }
    if (trimmed.name.length < 2) { toast.error("Nome deve ter pelo menos 2 caracteres."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) { toast.error("E-mail inválido."); return; }
    const phoneDigits = trimmed.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) { toast.error("Telefone inválido."); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...trimmed, ...utms }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
        window.location.href = "/obrigado";
      } else {
        throw new Error(data.error || "Erro ao enviar");
      }
    } catch {
      toast.error("Erro ao enviar. Tente novamente ou ligue para nós.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-gradient-to-b from-background to-[hsl(var(--brand-gray))] relative overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-[hsl(var(--brand-red))]/10 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-[hsl(var(--brand-red))]/5 to-transparent rounded-full blur-2xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container mx-auto px-4 relative z-10">

        {/* Título */}
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Entre em{" "}
            <span className="text-transparent bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-light))] bg-clip-text">
              Contato
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para atender suas necessidades em metrologia. Entre em contato e solicite seu orçamento.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* FORMULÁRIO */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="border-0 shadow-[var(--shadow-red-soft)] backdrop-blur-sm bg-gradient-to-br from-card to-[hsl(var(--brand-red))]/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[hsl(var(--brand-red))]/5 to-transparent opacity-50" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold text-foreground">Solicite seu Orçamento</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Nome *</label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Seu nome completo" disabled={isSubmitting} maxLength={100} autoComplete="name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                      <Input name="company" value={formData.company} onChange={handleInputChange} placeholder="Nome da empresa" disabled={isSubmitting} maxLength={200} autoComplete="organization" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">E-mail *</label>
                      <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="seu@email.com" disabled={isSubmitting} maxLength={254} autoComplete="email" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Telefone *</label>
                      <Input name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="(47) 99999-9999" disabled={isSubmitting} maxLength={15} autoComplete="tel" inputMode="numeric" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Serviço de Interesse</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      disabled={isSubmitting}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                    >
                      <option value="">Selecione um serviço...</option>
                      <option value="Calibração">Calibração</option>
                      <option value="Certificação">Certificação</option>
                      <option value="Manutenção">Manutenção</option>
                      <option value="NR13">NR13</option>
                      <option value="Automação">Automação</option>
                      <option value="Treinamentos">Treinamentos</option>
                      <option value="Gerenciamento Metrológico">Gerenciamento Metrológico</option>
                      <option value="Locação">Locação</option>
                      <option value="Suporte Logístico">Suporte Logístico</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Mensagem</label>
                    <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Descreva suas necessidades..." className="min-h-[120px]" disabled={isSubmitting} maxLength={2000} />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] hover:from-[hsl(var(--brand-red-dark))] hover:to-[hsl(var(--brand-red))] text-[hsl(var(--brand-white))] font-semibold transition-all duration-500 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Enviando...</> : "Enviar Mensagem"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* INFO + MAPA */}
          <motion.div
            className="space-y-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeLeft}>
              <h3 className="text-2xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <motion.div variants={staggerFast} className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={fadeLeft}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="flex items-start space-x-4"
                  >
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 bg-[hsl(var(--brand-red))]/10 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <info.icon className="w-6 h-6 text-[hsl(var(--brand-red))]" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeLeft} className="rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] relative">
              <div className="absolute top-4 left-4 z-10 bg-[hsl(var(--card))]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                <p className="text-sm font-medium text-[hsl(var(--foreground))]">📍 Tecnoiso</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.1234567890123!2d-48.83333333333333!3d-26.31666666666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deafe1cfc4c4c1%3A0x1234567890abcdef!2sR.%20Dona%20Emma%2C%201541%20-%20Floresta%2C%20Joinville%20-%20SC%2C%2089211-493!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Localização Tecnoiso"
                className="w-full hover:opacity-90 transition-opacity duration-300"
              />
            </motion.div>

            <motion.div variants={fadeLeft} className="text-center">
              <motion.a
                href="https://maps.google.com/?q=R.+Dona+Emma,+1541+-+Floresta,+Joinville+-+SC,+89211-493"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-[hsl(var(--brand-red))] to-[hsl(var(--brand-red-dark))] text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-[var(--shadow-red)] font-medium"
              >
                <MapPin className="w-5 h-5" />
                <span>Abrir no Google Maps</span>
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;