import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Tecnoiso coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="min-h-screen bg-white">

      {/* Botão voltar */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 bg-white border border-[#e5e5e5] text-[#111] text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Voltar para Home
        </Link>
      </div>

      {/* Cabeçalho igual ao documento */}
      <section className="bg-[#111] pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white font-bold text-lg md:text-xl tracking-wide mb-1">
            TECNOISO TECNOLOGIA E SOLUÇÕES INDUSTRIAIS LTDA
          </p>
          <p className="text-white/60 text-sm mb-1">CNPJ: 17.459.428/0001-08</p>
          <p className="text-white/60 text-sm mb-1">
            R. Dona Emma, 1541 - Floresta, Joinville/SC, CEP 89211-493
          </p>
          <div className="my-4 border-t border-[#dc2626]/60" />
          <p className="text-white/50 text-sm">
            contato@tecnoiso.com &nbsp;|&nbsp; (47) 3438-3175 &nbsp;|&nbsp; www.tecnoiso.com
          </p>

          <h1 className="text-white text-2xl md:text-3xl font-bold mt-8 mb-2 tracking-wide">
            POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS
          </h1>
          <p className="text-white/50 text-sm">Vigência: 22 de maio de 2026</p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-4xl mx-auto px-6 py-14 text-[#2c2c2c]">

        <Section number="1" title="INTRODUÇÃO">
          <P>
            A Tecnoiso Tecnologia e Soluções Industriais Ltda, inscrita no CNPJ{" "}
            <strong>17.459.428/0001-08</strong>, com sede na R. Dona Emma, 1541 - Floresta,
            Joinville/SC, CEP 89211-493, doravante denominada simplesmente "Tecnoiso", é um
            laboratório acreditado pelo INMETRO especializado em metrologia, calibração,
            certificação e consultoria industrial.
          </P>
          <P>
            Esta Política de Privacidade tem por objetivo informar de forma clara e transparente
            como a Tecnoiso coleta, utiliza, armazena, compartilha e protege os dados pessoais
            dos usuários do site <strong>www.tecnoiso.com</strong>, em conformidade com a Lei
            n.º 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD) e demais normas
            aplicáveis.
          </P>
          <P>
            Ao utilizar nosso site e fornecer seus dados, você declara ter lido, compreendido e
            concordado com os termos desta Política de Privacidade.
          </P>
        </Section>

        <Section number="2" title="DADOS PESSOAIS COLETADOS">
          <SubTitle>2.1 Dados fornecidos diretamente por você</SubTitle>
          <P>Ao preencher o formulário de contato em nosso site, coletamos as seguintes informações:</P>
          <BulletList items={[
            "Nome completo",
            "Endereço de e-mail",
            "Número de telefone/WhatsApp",
            "Nome da empresa",
            "Serviço de interesse",
            "Canal preferido de atendimento",
            "Mensagem/descrição das necessidades",
          ]} />

          <SubTitle>2.2 Dados coletados automaticamente</SubTitle>
          <P>
            Ao navegar em nosso site, coletamos automaticamente dados técnicos por meio de
            cookies e tecnologias similares, incluindo:
          </P>
          <BulletList items={[
            "Endereço IP",
            "Tipo e versão do navegador",
            "Páginas visitadas e tempo de permanência",
            "Origem do acesso (mecanismo de busca, link direto, redes sociais)",
            "Dados de geolocalização aproximada",
            "Interações com o conteúdo do site",
          ]} />
        </Section>

        <Section number="3" title="COOKIES E TECNOLOGIAS DE RASTREAMENTO">
          <SubTitle>3.1 O que são cookies</SubTitle>
          <P>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo ao acessar um
            site. Eles permitem reconhecer o navegador e salvar determinadas informações para
            melhorar a experiência de navegação.
          </P>

          <SubTitle>3.2 Tipos de cookies utilizados</SubTitle>
          <P>Nosso site utiliza os seguintes tipos de cookies:</P>
          <BulletList items={[
            "Cookies essenciais: necessários para o funcionamento básico do site. Não podem ser desativados.",
            "Cookies de desempenho e analytics: utilizamos o Google Analytics (Google LLC) para analisar o comportamento dos usuários no site, identificar páginas mais acessadas e aprimorar a experiência de navegação. Esses cookies coletam dados de forma anonimizada e agregada.",
            "Cookies de marketing e comunicação: utilizados para registrar interações via WhatsApp por meio da plataforma Goalfy, facilitando o atendimento ao cliente.",
          ]} />

          <SubTitle>3.3 Google Analytics</SubTitle>
          <P>
            Utilizamos o Google Analytics, serviço fornecido pela Google LLC, para coletar e
            analisar dados de acesso ao site. O Google Analytics pode utilizar cookies para
            rastrear as suas interações. Os dados coletados são transmitidos e armazenados em
            servidores do Google nos Estados Unidos.
          </P>
          <P>
            Para mais informações sobre como o Google trata os dados, acesse:{" "}
            <ExternalLink href="https://policies.google.com/privacy">
              https://policies.google.com/privacy
            </ExternalLink>
          </P>
          <P>
            Você pode optar por não participar do rastreamento do Google Analytics instalando o
            complemento de desativação disponível em:{" "}
            <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
              https://tools.google.com/dlpage/gaoptout
            </ExternalLink>
          </P>

          <SubTitle>3.4 Gerenciamento de cookies</SubTitle>
          <P>
            Ao acessar nosso site pela primeira vez, você será informado sobre o uso de cookies
            por meio de um banner de consentimento. Você pode aceitar ou recusar cookies não
            essenciais.
          </P>
          <P>
            Além disso, você pode configurar seu navegador para bloquear ou excluir cookies a
            qualquer momento. Observe que a desativação de cookies pode impactar algumas
            funcionalidades do site.
          </P>
        </Section>

        <Section number="4" title="FINALIDADES DO TRATAMENTO DE DADOS">
          <P>Os dados pessoais coletados são utilizados para as seguintes finalidades:</P>
          <BulletList items={[
            "Responder às solicitações, dúvidas e pedidos de orçamento enviados pelo formulário de contato ou WhatsApp",
            "Realizar atendimento comercial e consultivo por meio dos canais indicados pelo usuário",
            "Analisar o tráfego e comportamento de navegação para melhorar o site e a experiência do usuário (Google Analytics)",
            "Cumprir obrigações legais e regulatórias",
            "Enviar comunicações relacionadas aos serviços solicitados",
            "Gerenciar e aprimorar nossos processos internos de atendimento",
          ]} />
        </Section>

        <Section number="5" title="BASES LEGAIS PARA O TRATAMENTO">
          <P>
            O tratamento dos seus dados pessoais é realizado com fundamento nas seguintes bases
            legais previstas na LGPD:
          </P>
          <BulletList items={[
            "Consentimento (art. 7º, I): para o uso de cookies de analytics e marketing, mediante sua aceitação no banner de consentimento.",
            "Execução de contrato ou procedimentos preliminares (art. 7º, V): para responder às suas solicitações e fornecer os serviços requeridos.",
            "Legítimo interesse (art. 7º, IX): para análise de tráfego do site e melhoria contínua dos serviços, desde que não prevaleçam seus direitos e liberdades fundamentais.",
            "Cumprimento de obrigação legal (art. 7º, II): para atender requisitos legais e regulatórios aplicáveis.",
          ]} />
        </Section>

        <Section number="6" title="COMPARTILHAMENTO DE DADOS">
          <P>
            A Tecnoiso não vende, aluga ou cede seus dados pessoais a terceiros para fins
            comerciais. Os dados poderão ser compartilhados apenas nas seguintes situações:
          </P>
          <BulletList items={[
            "Google LLC: dados de navegação coletados pelo Google Analytics para análise de tráfego do site.",
            "Goalfy: plataforma utilizada para gerenciamento do atendimento via WhatsApp.",
            "Autoridades públicas: quando exigido por lei, ordem judicial ou regulamentação aplicável.",
            "Prestadores de serviços essenciais: empresas que auxiliam na operação do site e dos sistemas de tecnologia, sob obrigação contratual de confidencialidade.",
          ]} />
          <P>
            Todos os terceiros com quem compartilhamos dados estão sujeitos a obrigações de
            proteção de dados compatíveis com esta Política e com a LGPD.
          </P>
        </Section>

        <Section number="7" title="TRANSFERÊNCIA INTERNACIONAL DE DADOS">
          <P>
            Alguns dos serviços utilizados, como o Google Analytics (Google LLC), envolvem a
            transferência de dados para servidores localizados fora do Brasil, incluindo os
            Estados Unidos da América.
          </P>
          <P>
            Essas transferências ocorrem com base nas salvaguardas adequadas previstas na LGPD,
            incluindo cláusulas contratuais padrão e certificações reconhecidas
            internacionalmente.
          </P>
        </Section>

        <Section number="8" title="ARMAZENAMENTO E SEGURANÇA DOS DADOS">
          <P>
            Os dados pessoais coletados são armazenados em ambientes seguros, com acesso
            restrito a colaboradores autorizados, e pelo tempo necessário ao cumprimento das
            finalidades descritas nesta Política ou ao atendimento de obrigações legais.
          </P>
          <P>
            A Tecnoiso adota medidas técnicas e administrativas adequadas para proteger os dados
            pessoais contra acesso não autorizado, perda, alteração, divulgação ou destruição,
            incluindo:
          </P>
          <BulletList items={[
            "Controle de acesso com autenticação",
            "Criptografia de dados em trânsito (HTTPS)",
            "Monitoramento de segurança dos sistemas",
            "Treinamento de colaboradores sobre proteção de dados",
          ]} />
        </Section>

        <Section number="9" title="PRAZO DE RETENÇÃO DOS DADOS">
          <P>
            Os dados pessoais serão mantidos pelo período necessário para atingir as finalidades
            para as quais foram coletados, observados os seguintes critérios:
          </P>
          <BulletList items={[
            "Dados de contato e solicitações: mantidos pelo prazo de até 5 (cinco) anos após o encerramento do relacionamento comercial, conforme obrigações legais e fiscais.",
            "Dados de navegação e cookies: retidos de acordo com as políticas de retenção do Google Analytics (até 26 meses por padrão).",
            "Dados de atendimento via WhatsApp: mantidos conforme as políticas da plataforma Goalfy e por prazo necessário ao atendimento.",
          ]} />
          <P>
            Após o término do prazo de retenção, os dados serão eliminados de forma segura ou
            anonimizados, salvo quando sua manutenção for exigida por lei.
          </P>
        </Section>

        <Section number="10" title="DIREITOS DO TITULAR DOS DADOS">
          <P>
            Em conformidade com a LGPD (art. 18), você possui os seguintes direitos em relação
            aos seus dados pessoais:
          </P>
          <BulletList items={[
            "Confirmação: confirmar se realizamos o tratamento dos seus dados.",
            "Acesso: acessar os dados que temos sobre você.",
            "Correção: solicitar a correção de dados incompletos, inexatos ou desatualizados.",
            "Anonimização, bloqueio ou eliminação: solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.",
            "Portabilidade: solicitar a portabilidade dos seus dados a outro fornecedor de serviço ou produto.",
            "Eliminação: solicitar a eliminação dos dados tratados com base no seu consentimento.",
            "Informação: obter informações sobre as entidades com as quais compartilhamos seus dados.",
            "Revogação do consentimento: revogar o consentimento a qualquer momento, sem prejuízo da licitude do tratamento realizado anteriormente.",
            "Oposição: opor-se ao tratamento realizado com base em outras bases legais, em caso de descumprimento da LGPD.",
          ]} />
          <P>
            Para exercer qualquer um desses direitos, entre em contato com o nosso Encarregado
            de Proteção de Dados (DPO) por meio dos canais indicados na seção 12 desta Política.
          </P>
        </Section>

        <Section number="11" title="LINKS PARA SITES EXTERNOS">
          <P>
            Nosso site pode conter links para sites de terceiros (como Google Maps, Instagram,
            Facebook e LinkedIn). Esta Política de Privacidade se aplica exclusivamente ao site
            www.tecnoiso.com. Não nos responsabilizamos pelas práticas de privacidade ou pelo
            conteúdo de sites externos.
          </P>
        </Section>

        <Section number="12" title="ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)">
          <P>
            Em conformidade com o art. 41 da LGPD, a Tecnoiso designou como Encarregado de
            Proteção de Dados (DPO) o seguinte responsável:
          </P>
          <div className="mt-4 space-y-2">
            <InfoRow label="Nome" value="Leonardo Rosa Junior" />
            <InfoRow label="Cargo" value="CEO & Fundador" />
            <InfoRow label="E-mail" value="contato@tecnoiso.com" isEmail />
            <InfoRow label="Telefone" value="(47) 3438-3175" />
            <InfoRow label="Endereço" value="R. Dona Emma, 1541 - Floresta, Joinville/SC, CEP 89211-493" />
          </div>
          <P className="mt-4">
            O Encarregado está disponível para receber comunicações dos titulares de dados e da
            Autoridade Nacional de Proteção de Dados (ANPD).
          </P>
        </Section>

        <Section number="13" title="ALTERAÇÕES DESTA POLÍTICA">
          <P>
            Esta Política de Privacidade pode ser atualizada periodicamente para refletir
            mudanças em nossas práticas de dados, em nossos serviços ou em requisitos legais.
            Recomendamos que você a revise regularmente.
          </P>
          <P>
            Em caso de alterações significativas, notificaremos os usuários por meio de aviso em
            destaque no site ou por outros meios adequados. A data de vigência indicada no início
            deste documento será atualizada a cada revisão.
          </P>
        </Section>

        <Section number="14" title="LEI APLICÁVEL E FORO">
          <P>
            Esta Política de Privacidade é regida pelas leis da República Federativa do Brasil,
            em especial pela Lei n.º 13.709/2018 (LGPD). Para dirimir quaisquer controvérsias
            decorrentes deste documento, fica eleito o foro da Comarca de Joinville, Estado de
            Santa Catarina.
          </P>
        </Section>

        {/* Rodapé igual ao documento */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] text-center space-y-1">
          <p className="text-[#444] text-sm">Joinville/SC, 22 de maio de 2026</p>
          <p className="text-[#111] font-bold text-sm">
            Tecnoiso Tecnologia e Soluções Industriais Ltda
          </p>
          <p className="text-[#999] text-sm">
            CNPJ: 17.459.428/0001-08 &nbsp;|&nbsp; www.tecnoiso.com
          </p>
        </div>

        {/* Botão voltar inferior */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#b91c1c] transition-colors duration-200 shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Voltar para Home
          </Link>
        </div>

      </section>
    </main>
  );
}

/* ── Componentes auxiliares ── */

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-[#111] text-xl font-bold mb-4 flex items-start gap-3 border-b border-[#f0f0f0] pb-2">
        <span className="text-[#dc2626] font-bold shrink-0">{number}.</span>
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#111] text-base font-semibold mt-6 mb-2">{children}</h3>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[#444] text-[15px] leading-relaxed mb-3 ${className}`}>{children}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4 ml-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[#444] text-[15px] leading-relaxed">
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoRow({ label, value, isEmail }: { label: string; value: string; isEmail?: boolean }) {
  return (
    <p className="text-[15px]">
      <strong className="text-[#111]">{label}: </strong>
      {isEmail ? (
        <a href={`mailto:${value}`} className="text-[#dc2626] underline underline-offset-2">{value}</a>
      ) : (
        <span className="text-[#444]">{value}</span>
      )}
    </p>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c] transition-colors break-all">
      {children}
    </a>
  );
}