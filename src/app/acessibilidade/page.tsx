import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Acessibilidade",
  description: "Compromisso de acessibilidade digital da Fazenda Lago São Francisco.",
  alternates: { canonical: "/acessibilidade" },
};

export default function AcessibilidadePage() {
  return (
    <section className="bg-paper py-28 md:py-36">
      <Container className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Institucional</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">Compromisso de acessibilidade</h1>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            A plataforma da {siteConfig.name} é construída com o padrão <strong className="text-ink">WCAG 2.2 nível AA</strong>{" "}
            como piso mínimo. Isso inclui:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Navegação completa por teclado, com atalho para pular direto ao conteúdo principal;</li>
            <li>Contraste de cor adequado entre texto e fundo em todas as seções;</li>
            <li>Estrutura semântica de landmarks e hierarquia correta de títulos;</li>
            <li>Alternativa estática e acessível para toda animação e composição visual imersiva;</li>
            <li>Respeito à preferência do sistema por movimento reduzido (<code>prefers-reduced-motion</code>);</li>
            <li>Formulários com rótulos associados e mensagens de erro claras.</li>
          </ul>
          <p>
            Se você encontrar qualquer barreira de acessibilidade neste site, entre em contato em{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="underline">
              {siteConfig.contact.email}
            </a>{" "}
            — priorizamos a correção de problemas reportados.
          </p>
        </div>
      </Container>
    </section>
  );
}
