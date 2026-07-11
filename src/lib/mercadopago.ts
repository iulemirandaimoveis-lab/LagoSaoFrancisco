const MP_API = "https://api.mercadopago.com";

export type MercadoPagoOrderItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

export type MercadoPagoBuyer = {
  name: string;
  email: string;
  areaCode?: string;
  phoneNumber?: string;
};

type CreatePreferenceInput = {
  reference: string;
  items: MercadoPagoOrderItem[];
  buyer: MercadoPagoBuyer;
  backUrls: { success: string; pending: string; failure: string };
  notificationUrl: string;
  statementDescriptor?: string;
};

type MercadoPagoResult<T> = { ok: true; data: T } | { ok: false; error: string };

function accessToken() {
  return process.env.MERCADOPAGO_ACCESS_TOKEN;
}

export function isMercadoPagoConfigured() {
  return Boolean(accessToken());
}

/**
 * Cria uma preferência de pagamento no Mercado Pago (Checkout Pro).
 * O comprador é redirecionado ao checkout hospedado da MP — cartão, Pix e boleto
 * nunca tocam nosso servidor, então não há escopo de PCI-DSS para nós (cap. 13).
 */
export async function createEventPreference(
  input: CreatePreferenceInput,
): Promise<MercadoPagoResult<{ initPoint: string; preferenceId: string }>> {
  const token = accessToken();
  if (!token) {
    return { ok: false, error: "MERCADOPAGO_NOT_CONFIGURED" };
  }

  const [firstName, ...restName] = input.buyer.name.trim().split(/\s+/);

  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: input.items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "BRL",
      })),
      payer: {
        name: firstName,
        surname: restName.join(" ") || undefined,
        email: input.buyer.email,
        phone: input.buyer.areaCode && input.buyer.phoneNumber
          ? { area_code: input.buyer.areaCode, number: input.buyer.phoneNumber }
          : undefined,
      },
      external_reference: input.reference,
      back_urls: input.backUrls,
      auto_return: "approved",
      notification_url: input.notificationUrl,
      statement_descriptor: input.statementDescriptor?.slice(0, 22),
      payment_methods: {
        installments: 12,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `MERCADOPAGO_API_ERROR: ${res.status} ${body}` };
  }

  const data = (await res.json()) as { id: string; init_point: string; sandbox_init_point?: string };
  return { ok: true, data: { initPoint: data.init_point, preferenceId: data.id } };
}

export type MercadoPagoPayment = {
  id: number;
  status: string;
  status_detail: string;
  external_reference: string | null;
  transaction_amount: number;
  payer?: { email?: string };
};

/**
 * Busca o pagamento diretamente na API da MP a partir do webhook — nunca confiamos
 * apenas no payload recebido (pode ser forjado); a fonte de verdade é sempre a API.
 */
export async function getMercadoPagoPayment(paymentId: string): Promise<MercadoPagoPayment | null> {
  const token = accessToken();
  if (!token) return null;

  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as MercadoPagoPayment;
}
