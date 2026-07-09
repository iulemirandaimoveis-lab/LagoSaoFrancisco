# Capítulo 07 — Restaurante Dom Dina

> O restaurante não é uma "comodidade do hotel". É um **produto digital autônomo** — um site dentro do site — capaz de atrair quem nem vai se hospedar (day-use gastronômico, Persona 4). Um restaurante-destino é o segundo maior diferenciador da marca depois do lago. Aqui, digitalizamos o desejo pela mesa.

## 7.1 Tese: o restaurante como imã e como âncora de valor

- **Imã de aquisição:** buscas como "melhor restaurante em Garanhuns", "restaurante com vista para o lago" trazem público que talvez volte para se hospedar. O restaurante é topo de funil.
- **Âncora de valor da hospedagem:** ter um restaurante autoral eleva a percepção de todo o resort — justifica ADR mais alto (cap. 05).
- **Motor de TRevPAR:** F&B é receita direta e de alta margem; digitalizar reservas e experiências do chef aumenta a captura.

## 7.2 Estrutura de `/restaurante`

1. **Hero cinematográfico:** vídeo — fogo, panela, mãos do chef empratando, taça de vinho, o lago desfocado ao fundo. Som opcional. Nome "Dom Dina" com tipografia editorial. Uma linha de alma ("A cozinha que traduz o Agreste em sabor").
2. **A filosofia / o chef:** storytelling — quem é o chef, de onde vêm os ingredientes (produtores locais, horta própria?), a relação com o território. Isso é **branding gastronômico**: comida com origem vende mais que "comida boa".
3. **O cardápio digital interativo** (peça central — 7.3).
4. **Experiências do chef** (7.5).
5. **Reserva de mesa** (7.4).
6. **Ambiente & vista:** galeria do salão, varanda, mesa ao pôr do sol.
7. **Eventos gastronômicos** (jantares harmonizados, festival) com agenda e reserva.
8. **Prova social:** avaliações, menções.

## 7.3 Cardápio digital interativo (o coração)

**Não é um PDF.** É uma experiência navegável, e é o **destino do QR Code das mesas** (7.6).

**Cada prato é uma ficha rica:**
- **Foto profissional** (direção de arte consistente — luz, fundo, prato).
- **Vídeo curto** opcional (15s) — o prato sendo finalizado/servido (desejo em movimento).
- **Descrição sensorial** + **ingredientes** (com destaque a produtos locais/da horta).
- **Harmonização** sugerida (vinho/drink) — venda cruzada e sofisticação.
- **Tempo de preparo** (gerencia expectativa; útil no local).
- **Alergênicos e restrições** (glúten, lactose, frutos do mar, vegetariano/vegano) — ícones claros.
- **Preço**.
- **CTA contextual:** "Reservar mesa" (no site) / adicionar à intenção de pedido (no local, se houver integração de pedido).

**Filtros e organização:**
- Por **momento** (café, almoço, jantar, harmonizado, sobremesas, drinks).
- Por **restrição** (vegetariano, sem glúten, sem lactose) — inclusão + conveniência.
- Por **destaque do chef** / sazonais.
- Busca por ingrediente.

**Menu sazonal/versionado:** o cardápio muda; o CMS permite ativar/desativar pratos, marcar "esgotado", agendar menus sazonais. **(T):** conteúdo em CMS estruturado, renderizado estático + revalidação (bom para SEO — cada prato pode ter URL/rich snippet de `Menu`/`MenuItem` schema.org, cap. 15).

## 7.4 Reserva de mesa

Fluxo próprio, mais leve que o de hospedagem:
```
Data → horário (turnos com capacidade) → nº de pessoas → ocasião (aniversário, romântico, negócios)
   → mesa/área (interno, varanda com vista — pode ter prêmio) → dados/contato → confirmação → lembrete (WhatsApp/e-mail)
```
- **Gestão de capacidade por turno** (não overbookar o salão) — mesma disciplina de inventário do BE, escala menor.
- **Ocasião especial** dispara oportunidade (decoração, bolo, mesa com vista) — anexo de receita.
- **Depósito/no-show:** para datas de pico, pequena garantia ou política de no-show (reduz mesa vazia reservada).
- **Integração:** reserva de mesa aparece no backoffice e, se o hóspede está hospedado, no folio/área do hóspede.

## 7.5 Experiências do chef (produtos premium)

Transformar a cozinha em experiência vendável:
- **Menu-degustação harmonizado** (noites específicas, lugares limitados).
- **Chef's table** / cozinha ao vivo.
- **Aula/vivência** (harmonização, preparo de um prato regional).
- **Jantar romântico privativo** à beira do lago (liga a casamentos/pedidos de casamento).
- **Café da manhã na varanda** como add-on de hospedagem.

Cada uma é um **produto reservável com data, capacidade e preço** (mesma engine de experiências, cap. 08) — não um "fale conosco".

## 7.6 QR Code nas mesas (a ponte físico-digital)

- QR na mesa → abre `/restaurante/cardapio` **otimizado para uso no local** (mobile-first, rápido, modo claro legível sob luz de restaurante, sem hero pesado — detecta origem via parâmetro `?src=mesa`).
- Vantagens: cardápio sempre atualizado (preço/esgotado em tempo real), fotos/harmonização à mão, acessível (fonte ajustável, leitor de tela — melhor que menu impresso para PCD/baixa visão), e **coleta de sinal** (o que as pessoas mais olham → inteligência de menu).
- **Evolução (V2/V3):** pedido pela mesa, chamar garçom, dividir conta, pagar pelo celular — integração com sistema de PDV/comanda. **Cuidado:** manter o toque humano do serviço premium; a tecnologia assiste, não substitui o garçom (cap. 19).
- **SEO/UX:** o QR não exige app; é web. Sempre com fallback (número da mesa + garçom).

## 7.7 Eventos gastronômicos

Módulo de agenda: jantar harmonizado com produtor de vinho, festival gastronômico, menu de São João/Natal. Cada evento é uma **landing** (como eventos, cap. 09/02) com ingressos/reserva, capacidade, e cross-link com hospedagem (pacote "venha para o festival e durma aqui").

## 7.8 Métricas do restaurante

- Reservas de mesa (site vs. telefone), taxa de no-show, ocupação por turno, receita por experiência do chef, pratos mais visualizados vs. mais pedidos (gap = oportunidade de menu engineering), conversão QR→reserva, day-use que converte em hospedagem depois.

## 7.9 Acessibilidade e performance

- Cardápio totalmente navegável por teclado/leitor de tela; ícones de alergênicos com texto; contraste alto na versão-mesa.
- Vídeos de prato: leves, lazy, com poster; nunca autoplay com som.
- A versão-mesa prioriza velocidade brutal (usuário com fome, dados móveis, ambiente escuro).

Seguir para o **[Capítulo 08 — Passeios & Atividades](08-passeios.md)**.
