"use client"

import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--brand-black))] text-[hsl(var(--brand-white))] py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <p className="text-gray-300 mb-6 max-w-md">
              A Tecnoiso conta com toda estrutura para atender as necessidades dos clientes, com laboratórios próprios e metodologia certificada pelo INMETRO.
              Um dos laboratórios é geral e o outro é físico-químico, bem como um laboratório móvel que vai até a sua empresa para realizar serviços de calibração e manutenção.
              Tudo com a mesma qualidade e garantia.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/tecnoiso/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--brand-red))]/80 transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/tecnoiso/?locale=pt_BR" 
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--brand-red))]/80 transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/tecnoso-tecnologia-e-soluções-industriais-ltda/posts/?feedView=all" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[hsl(var(--brand-red))]/80 transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Calibração
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Certificação
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Manutenção
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Consultoria
                </a>
              </li>
              <li>
                <a href="#servicos" className="text-gray-300 hover:text-[hsl(var(--brand-red))] transition-colors duration-300">
                  Treinamentos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[hsl(var(--brand-red))] mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  R. Dona Emma, 1541 - Floresta<br />
                  Joinville - SC, 89211-493
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[hsl(var(--brand-red))] flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  (47) 3438-3175
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[hsl(var(--brand-red))] flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  contato@tecnoiso.com.br
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA.
            | CNPJ: 17.459.428/0001-08
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[hsl(var(--brand-red))] text-sm transition-colors duration-300">
              Política de Qualidade
            </a>
            <a href="#" className="text-gray-400 hover:text-[hsl(var(--brand-red))] text-sm transition-colors duration-300">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
