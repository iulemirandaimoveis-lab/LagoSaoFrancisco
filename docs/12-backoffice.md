# Capítulo 12 — Backoffice (Painel Administrativo)

> A plataforma mais linda do mundo fracassa se o cliente não consegue operá-la. O Backoffice é onde a Fazenda **administra tudo sem depender de desenvolvedor**. É o produto interno — e ele precisa da mesma qualidade de UX do produto externo, porque a equipe usa todo dia. Um backoffice ruim gera preço desatualizado, overbooking, conteúdo velho e frustração — e mata o ROI de tudo.

## 12.1 Princípios

1. **Autonomia total do cliente:** preços, disponibilidade, conteúdo, promoções — tudo editável sem código. Dev não pode ser gargalo da operação diária.
2. **À prova de erro:** confirmações em ações destrutivas, validações, *preview* antes de publicar, histórico/undo. A recepcionista não pode derrubar o site sem querer.
3. **Papéis e permissões:** cada função vê e faz só o que lhe cabe (RBAC).
4. **Auditoria:** quem mudou o quê, quando. Essencial para preço, reservas e finanças.
5. **Mobile-friendly:** a operação acontece em movimento (recepção, campo, salão) — as ações críticas funcionam no celular/tablet.

## 12.2 Papéis (RBAC) e permissões

| Papel | Escopo | Exemplos de permissão |
|-------|--------|------------------------|
| **Super Admin / Proprietário** | Tudo | Configuração global, papéis, financeiro, todos os módulos |
| **Gerente Geral** | Operação completa | Todos os módulos operacionais, relatórios, sem config de sistema |
| **Revenue Manager** | Tarifas & inventário | RM, calendário, regras, bloqueios, dashboards de receita |
| **Recepção / Reservas** | Reservas & hóspedes | Criar/editar reservas, check-in/out, folio, sem alterar regras de preço |
| **Restaurante (Dom Dina)** | Restaurante | Cardápio, reservas de mesa, experiências do chef, capacidade |
| **Eventos / Casamentos** | Módulo eventos | Leads, propostas, agenda, contratos, fornecedores |
| **Conteúdo / Marketing** | CMS & mídia | Páginas editoriais, blog, galeria, SEO, promoções (sem furar floor de RM) |
| **Operação de Passeios** | Experiências | Agenda, capacidade, lista diária, bloqueios por clima/manutenção |
| **Museu** | Acervo | Obras, artistas, exposições, áudio-guia, agenda de visitas |

Permissões granulares (ver/criar/editar/excluir/publicar/aprovar) por módulo. Princípio do menor privilégio.

## 12.3 Módulos do Backoffice

### 12.3.1 Dashboard (home do admin)
Visão do dia e do negócio: chegadas/saídas de hoje, ocupação atual e futura, receita do dia/mês, pace vs. ano anterior, leads de casamento quentes, alertas de RM, reservas de mesa do dia, experiências agendadas. **Personalizado por papel** (o revenue vê pace; a recepção vê chegadas).

### 12.3.2 Hospedagem & Reservas
- Grade de disponibilidade (tape chart) por unidade/data; arrastar para bloquear/mover.
- Criar/editar/cancelar reserva; walk-in; alterar datas (recalcula); folio; check-in/out.
- Gestão de unidades (status: limpa/suja/manutenção — integra housekeeping).
- Bloqueios (manutenção, evento privado).

### 12.3.3 Revenue Management (cap. 05)
- Calendário de tarifas (12 meses, preço + ocupação por dia).
- Editor de temporadas, eventos, fatores, floor/ceiling; simulador; publicação com preview.
- Rate plans, promoções, cupons (criação e regras).
- Dashboards: ADR, RevPAR, TRevPAR, pace, canal, anexo.

### 12.3.4 Restaurante Dom Dina (cap. 07)
- CMS do cardápio: pratos (foto, vídeo, ingredientes, harmonização, alergênicos, preço, esgotado), menus sazonais, ativar/desativar.
- Reservas de mesa: agenda por turno, capacidade, no-show.
- Experiências do chef e eventos gastronômicos.

### 12.3.5 Experiências / Passeios (cap. 08)
- CRUD de experiências, horários, capacidade, preço, política de clima.
- Lista de operação diária (para guias); validação de voucher/QR.
- Bloqueios (equipamento, guia, clima).

### 12.3.6 Casamentos & Eventos (cap. 09)
- **CRM de leads:** funil (novo → qualificado → visita → proposta → contrato → ganho/perdido), atribuição, follow-up, SLA de resposta.
- Agenda de datas (privatizações que afetam RM de hospedagem).
- Propostas, contratos (assinatura eletrônica), cronograma de pagamentos.
- Fornecedores (curadoria, comissão).

### 12.3.7 Museu (cap. 10)
- CMS do acervo (obras, artistas, coleções), exposições, áudio-guias, agenda de visitas guiadas.

### 12.3.8 Conteúdo / CMS
- Páginas editoriais, blog (`/diario`), galerias, home (ordem/ativação de seções do scrollytelling dentro de limites seguros), SEO por página (título, meta, OG, schema — cap. 15).
- **Biblioteca de mídia** (imagens/vídeos) com upload para R2, versões responsivas automáticas, alt text obrigatório.

### 12.3.9 Hóspedes / CRM
- Perfis unificados (CDP), histórico, preferências, segmentos, consentimentos LGPD.
- Fidelidade: pontos, tiers, ajustes manuais, campanhas.

### 12.3.10 Financeiro
- Conciliação de pagamentos (gateway), reembolsos, relatórios de receita por fonte, comissões, exportação contábil.

### 12.3.11 Configuração & Auditoria
- Papéis/usuários, integrações (chaves), políticas (cancelamento, crianças, pet), logs de auditoria, feature flags.

## 12.4 KPIs e relatórios (o que o negócio precisa ver)

**Operacional:** ocupação, chegadas/saídas, tape chart, housekeeping, reservas de mesa/experiências do dia.
**Comercial/Receita:** ADR, RevPAR, TRevPAR, pace, pickup, receita por canal (direto vs. OTA), anexo de experiências, receita por segmento (hospedagem/F&B/passeios/eventos/museu).
**Marketing/Digital:** conversão do funil (cap. 16), CAC, LTV, origem de reservas, desempenho de campanhas, leads de casamento.
**Relacionamento:** NPS, repeat guest rate, adesão à fidelidade, uso do concierge.

Relatórios exportáveis (PDF/CSV), agendáveis por e-mail, com comparativos temporais.

## 12.5 Arquitetura do Backoffice

- **App separado/rota isolada** (`/admin`), autenticação forte (2FA obrigatório para admin), sessões curtas, IP allowlist opcional.
- **Mesma base de dados** que o site (Supabase/Postgres), com **RLS e políticas por papel** — o backoffice não é um "banco paralelo" (evita dessincronização, principal causa de overbooking e preço errado).
- **Realtime** onde importa (uma reserva nova aparece na recepção sem refresh — Supabase Realtime).
- Auditoria imutável (append-only) para ações sensíveis.

## 12.6 Anti-padrões a evitar (cap. 19)

- Backoffice "de dev" (só técnico entende) → cliente não usa → dados velhos → produto morre.
- Planilha paralela como fonte de verdade → dessincronização → overbooking.
- Sem preview/undo → medo de mexer → estagnação.
- Sem papéis → todo mundo pode tudo → erro e risco.

Seguir para o **[Capítulo 13 — Arquitetura Técnica](13-arquitetura-tecnica.md)**.
