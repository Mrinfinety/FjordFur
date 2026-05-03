import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response('Webhook feil', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    const token = await getCJToken();

    await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': token,
      },
      body: JSON.stringify({
        orderNumber: session.id,
        shippingCountry: 'NO',
        shippingCustomerName: session.customer_details?.name,
        shippingPhone: session.customer_details?.phone,
        shippingAddress: session.customer_details?.address?.line1,
        shippingCity: session.customer_details?.address?.city,
        shippingZip: session.customer_details?.address?.postal_code,
      }),
    });
  }

  return new Response('OK', { status: 200 });
}