import type { Metadata } from "next";

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
      {/* Hero */}
      <section className="bg-[#111] pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#dc2626] text-sm font-semibold tracking-widest uppercase mb-3">
            Transparência &amp; Conformidade LGPD
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-white/50 text-base">
            Vigência: 22 de maio de 2026
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-[#2c2c2c]">

        {/* 1 */}
        <Section id="introducao" number="01" title="Introdução">
          <P>
            A Tecnoiso Tecnologia e Soluções Industriais Ltda, inscrita no CNPJ{" "}
            <strong>17.459.428/0001-08</strong>, com sede na R. Dona Emma, 1541
            – Floresta, Joinville/SC, CEP 89211-493, doravante denominada
            simplesmente "Tecnoiso", é um laboratório acreditado pelo INMETRO
            especializado em metrologia, calibração, certificação e consultoria
            industrial.
          </P>
          <P>
            Esta Política de Privacidade tem por objetivo informar de forma
            clara e transparente como a Tecnoiso coleta, utiliza, armazena,
            compartilha e protege os dados pessoais dos usuários do site{" "}
            <strong>www.tecnoiso.com</strong>, em conformidade com a Lei n.º
            13.709/2018 (Lei Geral de Proteção de Dados Pessoais – LGPD) e
            demais normas aplicáveis.
          </P>
          <P>
            Ao utilizar nosso site e fornecer seus dados, você declara ter lido,
            compreendido e concordado com os termos desta Política.
          </P>
        </Section>

        {/* 2 */}
        <Section id="dados-coletados" number="02" title="Dados Pessoais Coletados">
          <SubTitle>2.1 Dados fornecidos diretamente por você</SubTitle>
          <P>
            Ao preencher o formulário de contato em nosso site, coletamos as
            seguintes informações:
          </P>
          <BulletList items={[
            "Nome completo",
            "Endereço de e-mail",
            "Número de telefone / WhatsApp",
            "Nome da empresa",
            "Serviço de interesse",
            "Canal preferido de atendimento",
            "Mensagem / descrição das necessidades",
          ]} />

          <SubTitle>2.2 Dados coletados automaticamente</SubTitle>
          <P>
            Ao navegar em nosso site, coletamos automaticamente dados técnicos
            por meio de cookies e tecnologias similares, incluindo:
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

        {/* 3 */}
        <Section id="cookies" number="03" title="Cookies e Tecnologias de Rastreamento">
          <SubTitle>3.1 O que são cookies</SubTitle>
          <P>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo
            ao acessar um site. Eles permitem reconhecer o navegador e salvar
            determinadas informações para melhorar a experiência de navegação.
          </P>

          <SubTitle>3.2 Tipos de cookies utilizados</SubTitle>
          <BulletList items={[
            "Cookies essenciais: necessários para o funcionamento básico do site. Não podem ser desativados.",
            "Cookies de desempenho e analytics: utilizamos o Google Analytics (Google LLC) para analisar o comportamento dos usuários no site, identificar páginas mais acessadas e aprimorar a experiência de navegação. Esses cookies coletam dados de forma anonimizada e agregada.",
            "Cookies de marketing e comunicação: utilizados para registrar interações via WhatsApp por meio da plataforma Goalfy, facilitando o atendimento ao cliente.",
          ]} />

          <SubTitle>3.3 Google Analytics</SubTitle>
          <P>
            Utilizamos o Google Analytics, serviço fornecido pela Google LLC,
            para coletar e analisar dados de acesso ao site. Os dados são
            transmitidos e armazenados em servidores do Google nos Estados
            Unidos.
          </P>
          <P>
            Para mais informações:{" "}
            <ExternalLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </ExternalLink>
            . Para recusar o rastreamento:{" "}
            <ExternalLink href="https://tools.google.com/dlpage/gaoptout">
              tools.google.com/dlpage/gaoptout
            </ExternalLink>
            .
          </P>

          <SubTitle>3.4 Gerenciamento de cookies</SubTitle>
          <P>
            Ao acessar nosso site pela primeira vez, você será informado sobre o
            uso de cookies por meio de um banner de consentimento. Você pode
            aceitar ou recusar cookies não essenciais a qualquer momento, bem
            como configurar seu navegador para bloqueá-los ou excluí-los.
          </P>
        </Section>

        {/* 4 */}
        <Section id="finalidades" number="04" title="Finalidades do Tratamento">
          <BulletList items={[
            "Responder às solicitações, dúvidas e pedidos de orçamento enviados pelo formulário de contato ou WhatsApp",
            "Realizar atendimento comercial e consultivo pelos canais indicados pelo usuário",
            "Analisar o tráfego e comportamento de navegação para melhorar o site (Google Analytics)",
            "Cumprir obrigações legais e regulatórias",
            "Enviar comunicações relacionadas aos serviços solicitados",
            "Gerenciar e aprimorar nossos processos internos de atendimento",
          ]} />
        </Section>

        {/* 5 */}
        <Section id="bases-legais" number="05" title="Bases Legais para o Tratamento">
          <BulletList items={[
            "Consentimento (art. 7º, I): para o uso de cookies de analytics e marketing, mediante sua aceitação no banner de consentimento.",
            "Execução de contrato ou procedimentos preliminares (art. 7º, V): para responder às suas solicitações e fornecer os serviços requeridos.",
            "Legítimo interesse (art. 7º, IX): para análise de tráfego do site e melhoria contínua dos serviços.",
            "Cumprimento de obrigação legal (art. 7º, II): para atender requisitos legais e regulatórios aplicáveis.",
          ]} />
        </Section>

        {/* 6 */}
        <Section id="compartilhamento" number="06" title="Compartilhamento de Dados">
          <P>
            A Tecnoiso não vende, aluga ou cede seus dados pessoais a terceiros
            para fins comerciais. Os dados poderão ser compartilhados apenas
            nas seguintes situações:
          </P>
          <BulletList items={[
            "Google LLC: dados de navegação coletados pelo Google Analytics para análise de tráfego do site.",
            "Goalfy: plataforma utilizada para gerenciamento do atendimento via WhatsApp.",
            "Autoridades públicas: quando exigido por lei, ordem judicial ou regulamentação aplicável.",
            "Prestadores de serviços essenciais: empresas que auxiliam na operação do site e dos sistemas de tecnologia, sob obrigação contratual de confidencialidade.",
          ]} />
        </Section>

        {/* 7 */}
        <Section id="transferencia" number="07" title="Transferência Internacional de Dados">
          <P>
            Alguns dos serviços utilizados, como o Google Analytics (Google
            LLC), envolvem a transferência de dados para servidores localizados
            fora do Brasil, incluindo os Estados Unidos da América. Essas
            transferências ocorrem com base nas salvaguardas adequadas previstas
            na LGPD.
          </P>
        </Section>

        {/* 8 */}
        <Section id="seguranca" number="08" title="Armazenamento e Segurança">
          <P>
            Os dados pessoais coletados são armazenados em ambientes seguros,
            com acesso restrito a colaboradores autorizados, e pelo tempo
            necessário ao cumprimento das finalidades descritas nesta Política.
            Adotamos as seguintes medidas de proteção:
          </P>
          <BulletList items={[
            "Controle de acesso com autenticação",
            "Criptografia de dados em trânsito (HTTPS)",
            "Monitoramento de segurança dos sistemas",
            "Treinamento de colaboradores sobre proteção de dados",
          ]} />
        </Section>

        {/* 9 */}
        <Section id="retencao" number="09" title="Prazo de Retenção dos Dados">
          <BulletList items={[
            "Dados de contato e solicitações: mantidos por até 5 (cinco) anos após o encerramento do relacionamento comercial, conforme obrigações legais e fiscais.",
            "Dados de navegação e cookies: retidos de acordo com as políticas do Google Analytics (até 26 meses por padrão).",
            "Dados de atendimento via WhatsApp: mantidos conforme as políticas da plataforma Goalfy e por prazo necessário ao atendimento.",
          ]} />
          <P>
            Após o término do prazo de retenção, os dados serão eliminados de
            forma segura ou anonimizados, salvo quando sua manutenção for
            exigida por lei.
          </P>
        </Section>

        {/* 10 */}
        <Section id="direitos" number="10" title="Direitos do Titular dos Dados">
          <P>
            Em conformidade com a LGPD (art. 18), você possui os seguintes
            direitos:
          </P>
          <BulletList items={[
            "Confirmação: confirmar se realizamos o tratamento dos seus dados.",
            "Acesso: acessar os dados que temos sobre você.",
            "Correção: solicitar a correção de dados incompletos, inexatos ou desatualizados.",
            "Anonimização, bloqueio ou eliminação: de dados desnecessários ou tratados em desconformidade com a LGPD.",
            "Portabilidade: solicitar a portabilidade dos seus dados a outro fornecedor.",
            "Eliminação: solicitar a eliminação dos dados tratados com base no seu consentimento.",
            "Informação: obter informações sobre as entidades com as quais compartilhamos seus dados.",
            "Revogação do consentimento: revogar o consentimento a qualquer momento.",
            "Oposição: opor-se ao tratamento realizado em caso de descumprimento da LGPD.",
          ]} />
          <P>
            Para exercer qualquer um desses direitos, entre em contato com
            nosso Encarregado de Proteção de Dados (seção 12).
          </P>
        </Section>

        {/* 11 */}
        <Section id="links-externos" number="11" title="Links para Sites Externos">
          <P>
            Nosso site pode conter links para sites de terceiros (como Google
            Maps, Instagram, Facebook e LinkedIn). Esta Política se aplica
            exclusivamente ao site www.tecnoiso.com. Não nos responsabilizamos
            pelas práticas de privacidade de sites externos.
          </P>
        </Section>

        {/* 12 */}
        <Section id="dpo" number="12" title="Encarregado de Proteção de Dados (DPO)">
          <P>
            Em conformidade com o art. 41 da LGPD, a Tecnoiso designou como
            Encarregado de Proteção de Dados (DPO):
          </P>
          <div className="mt-4 p-6 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl space-y-2">
            <InfoRow label="Nome" value="Leonardo Rosa Junior" />
            <InfoRow label="Cargo" value="CEO &amp; Fundador" />
            <InfoRow label="E-mail" value="contato@tecnoiso.com" isEmail />
            <InfoRow label="Telefone" value="(47) 3438-3175" />
            <InfoRow label="Endereço" value="R. Dona Emma, 1541 – Floresta, Joinville/SC, CEP 89211-493" />
          </div>
          <P className="mt-4">
            O Encarregado está disponível para receber comunicações dos
            titulares de dados e da Autoridade Nacional de Proteção de Dados
            (ANPD).
          </P>
        </Section>

        {/* 13 */}
        <Section id="alteracoes" number="13" title="Alterações desta Política">
          <P>
            Esta Política pode ser atualizada periodicamente. Em caso de
            alterações significativas, notificaremos os usuários por meio de
            aviso em destaque no site. A data de vigência indicada no início
            deste documento será atualizada a cada revisão.
          </P>
        </Section>

        {/* 14 */}
        <Section id="foro" number="14" title="Lei Aplicável e Foro">
          <P>
            Esta Política é regida pelas leis da República Federativa do
            Brasil, em especial pela Lei n.º 13.709/2018 (LGPD). Para dirimir
            quaisquer controvérsias, fica eleito o foro da Comarca de
            Joinville, Estado de Santa Catarina.
          </P>
        </Section>

        {/* Rodapé da página */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e5] text-center text-sm text-[#999]">
          <p>
            <strong className="text-[#dc2626]">Tecnoiso</strong> Tecnologia e
            Soluções Industriais Ltda — CNPJ: 17.459.428/0001-08
          </p>
          <p className="mt-1">Joinville/SC &bull; 22 de maio de 2026</p>
        </div>
      </section>
    </main>
  );
}

/* ── Componentes auxiliares ── */

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <div className="flex items-start gap-4 mb-4">
        <span className="text-[#dc2626] text-xs font-bold tracking-widest mt-1 shrink-0">
          {number}
        </span>
        <h2 className="text-[#111] text-2xl font-bold leading-snug">{title}</h2>
      </div>
      <div className="pl-9">{children}</div>
    </section>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#111] text-base font-semibold mt-6 mb-2">{children}</h3>
  );
}

function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-[#444] text-[15px] leading-relaxed mb-3 ${className}`}>
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-[#444] text-[15px] leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoRow({
  label,
  value,
  isEmail,
}: {
  label: string;
  value: string;
  isEmail?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1 text-[15px]">
      <span className="font-semibold text-[#111] min-w-[80px]">{label}:</span>
      {isEmail ? (
        <a href={`mailto:${value}`} className="text-[#dc2626] underline underline-offset-2">
          {value}
        </a>
      ) : (
        <span className="text-[#444]" dangerouslySetInnerHTML={{ __html: value }} />
      )}
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#dc2626] underline underline-offset-2 hover:text-[#b91c1c] transition-colors"
    >
      {children}
    </a>
  );
}