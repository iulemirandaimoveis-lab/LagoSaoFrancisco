# Capítulo 11 — Área do Hóspede

> A reserva não é o fim da jornada — é o começo do relacionamento. A Área do Hóspede é o **portal privado** onde o desejo vira pertencimento (cap. 01, etapa 6–7). É também o motor de **retenção e LTV**: um hóspede com conta, favoritos e pontos de fidelidade volta e indica. Estrategicamente, é onde o **dado próprio** (contra a dependência de OTA) se acumula e vira inteligência.

## 11.1 Filosofia: da transação ao relacionamento

Bancos e companhias aéreas provaram que a "área logada" fideliza. Na hotelaria de luxo, o equivalente é o **concierge que te conhece**. A Área do Hóspede digitaliza esse cuidado: lembra suas preferências, guarda seus documentos, antecipa suas necessidades. **Não é um "meu perfil" burocrático — é o mordomo digital da Fazenda.**

## 11.2 Autenticação e acesso (decisão de UX crítica)

- **Guest checkout primeiro, conta depois** (cap. 04): nunca obrigar cadastro antes de reservar. Após a compra, oferecer criar conta com um clique ("salvamos seus dados — crie uma senha ou entre com Google").
- **Métodos:** e-mail + senha, **login social (Google)**, e **magic link / OTP** (sem senha — reduz fricção e esquecimento). Ideal no público brasileiro: OTP por WhatsApp/e-mail.
- **A reserva feita como convidado é "reivindicável"**: ao criar conta com o mesmo e-mail, as reservas anteriores aparecem automaticamente.
- **(T):** Supabase Auth cobre e-mail/senha, OAuth e OTP nativamente; RLS (Row Level Security) garante que cada hóspede só vê seus dados (cap. 13).

## 11.3 Módulos da Área do Hóspede

### 11.3.1 Minhas Reservas
- Próximas, em andamento e passadas. Cada reserva: status, datas, unidade, itens (quarto + experiências + F&B), voucher, política de cancelamento.
- **Ações:** modificar (recalcula RM/disponibilidade), cancelar (aplica política + reembolso), adicionar experiências à estadia futura (upsell pós-reserva!), pré-check-in online.
- **Timeline da estadia:** o roteiro planejado (cap. 08) visível e editável.

### 11.3.2 Pagamentos & Documentos
- Histórico de pagamentos, recibos/notas, folio (consumo durante a estadia).
- **Vouchers** (hospedagem, experiências, presente) com QR para validação no local.
- Documentos: comprovantes, contrato (casamentos/eventos), política.
- Dados fiscais para nota.

### 11.3.3 Fidelidade (programa de relacionamento)
- **Modelo recomendado — tiers + benefícios, não só pontos:** pontos por real gasto (hospedagem, F&B, experiências) e **níveis** (ex.: Visitante → Amigo do Lago → Anfitrião) que destravam **benefícios experienciais** (early check-in, upgrade quando disponível, welcome do chef, experiência-cortesia no aniversário, acesso a datas/eventos antes de todos).
- **Por que benefícios > desconto (E/C):** desconto vira guerra de preço e erode margem/marca; **benefício experiencial** aprofunda a relação com custo marginal baixo e reforça o posicionamento de luxo. Um upgrade "quando disponível" custa quase nada e encanta.
- Indicação (member-get-member): indique e ganhe — aquisição barata e qualificada.

### 11.3.4 Favoritos / Lista de Desejos
- Salvar acomodações, experiências, pratos, datas. Sincroniza entre dispositivos.
- **Uso inteligente:** base para remarketing respeitoso ("a Suíte do Pôr do Sol que você salvou está disponível no feriado") e para o concierge/planejador.

### 11.3.5 Concierge Digital (liga ao cap. 14)
- Canal de conversa (chat) com o **assistente de IA treinado na Fazenda** + escalada para humano.
- Faz: tira dúvidas, sugere e reserva experiências, monta roteiro, registra preferências (aniversário, restrição alimentar, "gosto de acordar cedo"), pedidos especiais (champanhe no quarto, decoração).
- **As preferências viram dados persistentes** que personalizam a próxima estadia — o "ele lembrou de mim" que define luxo.

### 11.3.6 Notificações & Preferências
- Notificações de eventos, promoções segmentadas, status de reserva, agenda.
- **Controle granular** (LGPD): o hóspede escolhe canais (e-mail, WhatsApp, push) e temas. Opt-in explícito, opt-out fácil.
- **Integração com Google Calendar:** adicionar reserva/experiências à agenda pessoal em um clique (reduz no-show, aumenta antecipação).

## 11.4 Pré-estadia: a fase mágica esquecida

Entre a reserva e a chegada há dias de **expectativa** — o momento emocional mais alto e mais ignorado pela hotelaria. A plataforma explora isso:
- E-mails/mensagens em sequência ("faltam 7 dias — que tal reservar o jantar do chef?", "como chegar", "o que levar para o frio do Agreste").
- Check-in online, escolha de experiências, upgrade de última hora.
- **(C):** a pré-estadia é a maior janela de **upsell** e de redução de no-show — e custa quase nada.

## 11.5 PWA (Progressive Web App)

- A Área do Hóspede (e o essencial do site) como **PWA instalável**: ícone na home do celular, funcionamento offline dos dados da reserva/voucher, push notifications, acesso rápido durante a estadia.
- **Por que PWA e não app nativo (T/C):** app nativo (iOS/Android) custa 3–5x mais (duas bases, lojas, aprovação, manutenção) para ganho marginal neste caso; PWA entrega 90% do valor (instalável, offline, push) com uma base de código. **App nativo só se e quando** o volume de hóspedes recorrentes justificar (V3+). Ver cap. 19: não construir app nativo por status.
- Vouchers e roteiro **offline** durante a estadia (sinal de internet no campo é fraco — decisão de produto importante).

## 11.6 CDP — o dado que unifica tudo

Por trás da Área do Hóspede vive um **Customer Data Platform** (perfil unificado): reservas, consumo, preferências, favoritos, interações, origem. Alimenta CRM, RM, IA e marketing. **Governança LGPD** rígida: consentimento, minimização, direito de exclusão, segurança (cap. 13). O dado é ativo — e responsabilidade.

## 11.7 Métricas

Taxa de criação de conta pós-reserva, logins recorrentes, uso do concierge, adesão à fidelidade, taxa de retorno (repeat guest rate), LTV, receita de upsell pré-estadia, indicações, no-show.

## 11.8 Acessibilidade e segurança

- Portal 100% acessível (é uso funcional recorrente — teclado, leitor de tela, contraste).
- Dados sensíveis (documento, pagamento) com segurança máxima (cap. 13): RLS, criptografia, sem armazenar cartão (tokenização), 2FA opcional, auditoria de acesso.

Seguir para o **[Capítulo 12 — Backoffice](12-backoffice.md)**.
