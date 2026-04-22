"use client"

import { motion, Variants } from "framer-motion";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const fadeX: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--brand-black))] text-[hsl(var(--brand-white))] py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Coluna 1 */}
          <motion.div variants={fadeUp}>
            <p className="text-gray-300 text-sm leading-relaxed">
              A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios próprios e metodologia certificada pelo INMETRO.
              Um dos laboratórios é geral e o outro é físico-químico, bem como um laboratório móvel que vai até a sua empresa.
              Tudo com a mesma qualidade e garantia.
            </p>
          </motion.div>

          {/* Coluna 2 */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-bold mb-6">Serviços</h3>
            <motion.ul variants={staggerFast} className="space-y-3">
              {["Calibração", "Certificação", "Manutenção", "Consultoria", "Treinamentos"].map((s) => (
                <motion.li key={s} variants={fadeX}>
                  <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                    {s}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Coluna 3 */}
          <motion.div variants={fadeUp}>
            <h3 className="text-lg font-bold mb-6">Contato</h3>
            <motion.div variants={staggerFast} className="space-y-4">
              {[
                { icon: MapPin, text: "R. Dona Emma, 1541 - Floresta\nJoinville - SC, 89211-493" },
                { icon: Phone,  text: "(47) 3438-3175" },
                { icon: Mail,   text: "contato@tecnoiso.com" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div key={i} variants={fadeX} className="flex items-start space-x-3">
                  <Icon className="w-5 h-5 text-[hsl(var(--brand-red))] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm whitespace-pre-line">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Coluna 4 — CEO */}
          <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
            <motion.img
              src="/ceo/Leonardo Rosa Junior.jpg"
              alt="Leonardo Rosa Junior"
              className="w-28 h-28 rounded-full object-cover object-top border-2 border-[hsl(var(--brand-red))] mb-4"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-white font-semibold text-sm">Leonardo Rosa Junior</p>
            <p className="text-[hsl(var(--brand-red))] text-xs mt-1 mb-4">CEO & Fundador</p>
            <div className="flex space-x-3">
              {[
                { href: "https://www.instagram.com/leorosajr/", icon: Instagram },
                { href: "https://br.linkedin.com/in/leonardo-rosa-junior-8b68264b", icon: Linkedin },
              ].map(({ href, icon: Icon }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--brand-red))]/80 transition-colors duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Rodapé inferior */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            © 2026 TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA. | CNPJ: 17.459.428/0001-08
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Política de Qualidade", "Termos de Uso"].map((label) => (
              <a key={label} href="#" className="text-gray-400 hover:text-[hsl(var(--brand-red))] text-sm transition-colors duration-300">
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;