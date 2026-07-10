import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade e tratamento de dados pessoais da Fazenda Lago São Francisco, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadePage() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Institucional</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-ink-soft">Última atualização: {new Date().getFullYear()}.</p>

        <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
          <p className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-4 text-ink">
            Este documento é um modelo base, alinhado à Lei Geral de Proteção de Dados (Lei 13.709/2018), e
            deve ser revisado por assessoria jurídica antes de ser tratado como versão final e vinculante.
          </p>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">1. Quem somos</h2>
            <p className="mt-2">
              A {siteConfig.name} ({siteConfig.location.address}) é a controladora dos dados pessoais
              coletados por meio deste site e dos canais de reserva, contato e eventos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">2. Dados que coletamos</h2>
            <p className="mt-2">
              Coletamos dados fornecidos diretamente por você — nome, e-mail, telefone, datas de interesse,
              número de hóspedes — ao preencher formulários de reserva, contato, simulação de orçamento de
              casamento e cadastro de newsletter. Também coletamos dados de navegação (cookies e analytics)
              para entender o uso do site e melhorar a experiência.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">3. Finalidade do tratamento</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Processar solicitações de reserva de hospedagem, mesa e experiências;</li>
              <li>Responder contatos e solicitações de orçamento de casamentos e eventos;</li>
              <li>Enviar comunicações transacionais (confirmações, lembretes) e, mediante consentimento, newsletter;</li>
              <li>Cumprir obrigações legais e regulatórias aplicáveis à atividade hoteleira;</li>
              <li>Melhorar a plataforma por meio de analytics agregados.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">4. Compartilhamento de dados</h2>
            <p className="mt-2">
              Dados podem ser compartilhados com fornecedores estritamente necessários à operação (processador
              de pagamentos, serviço de e-mail transacional, hospedagem em nuvem), sempre sob contrato e
              obrigação de confidencialidade. Não vendemos dados pessoais a terceiros.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">5. Seus direitos</h2>
            <p className="mt-2">
              Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção,
              anonimização, portabilidade ou eliminação dos seus dados, além de revogar consentimentos a
              qualquer momento. Solicitações podem ser feitas por {siteConfig.contact.email}.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">6. Retenção e segurança</h2>
            <p className="mt-2">
              Dados são mantidos pelo prazo necessário às finalidades descritas e às obrigações legais,
              protegidos por medidas técnicas e organizacionais de segurança. Em caso de incidente de
              segurança relevante, comunicaremos os titulares e a autoridade competente conforme exigido em lei.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">7. Cookies</h2>
            <p className="mt-2">
              Utilizamos cookies essenciais ao funcionamento do site e, mediante consentimento, cookies de
              analytics para entender o comportamento de navegação de forma agregada.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">8. Contato do encarregado (DPO)</h2>
            <p className="mt-2">
              Dúvidas sobre esta política podem ser enviadas para {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
