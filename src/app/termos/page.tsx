import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso e política de cancelamento da Fazenda Lago São Francisco.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Institucional</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">Termos de Uso</h1>
        <p className="mt-4 text-sm text-ink-soft">Última atualização: {new Date().getFullYear()}.</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
          <p className="rounded-lg border border-gold-500/30 bg-gold-500/10 p-4 text-ink">
            Este documento é um modelo base e deve ser revisado por assessoria jurídica antes de ser tratado
            como versão final e vinculante, incluindo a política de cancelamento aplicável a cada temporada.
          </p>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">1. Objeto</h2>
            <p className="mt-2">
              Estes termos regem o uso do site e do motor de reservas da {siteConfig.name}, incluindo
              hospedagem, restaurante, experiências e eventos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">2. Reservas e pagamento</h2>
            <p className="mt-2">
              Solicitações de reserva feitas pelo site são confirmadas pela nossa equipe mediante
              disponibilidade. O pagamento é processado por meio de link seguro enviado após a confirmação;
              nenhum valor é debitado automaticamente no momento da solicitação.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">3. Política de cancelamento</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Cancelamento com mais de 7 dias de antecedência: reembolso integral;</li>
              <li>Entre 3 e 7 dias: reembolso de 50%;</li>
              <li>Menos de 72 horas: retenção da primeira diária;</li>
              <li>Datas de alta temporada e feriados podem seguir política estendida, informada no momento da reserva.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">4. Responsabilidades do hóspede</h2>
            <p className="mt-2">
              O hóspede é responsável por informações precisas na reserva, pelo cumprimento das normas de
              conduta e segurança da propriedade e por eventuais danos causados a instalações durante a
              estadia.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">5. Propriedade intelectual</h2>
            <p className="mt-2">
              Conteúdos, marca e materiais audiovisuais do site pertencem à {siteConfig.name} e não podem ser
              reproduzidos sem autorização.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-semibold text-ink">6. Foro</h2>
            <p className="mt-2">Fica eleito o foro da comarca de Garanhuns, Pernambuco, para dirimir eventuais controvérsias.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
