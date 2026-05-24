import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

export async function POST(req: Request) {
  const { items } = await req.json();
  const reqUrl = new URL(req.url);
  const origin = `${reqUrl.protocol}//${reqUrl.host}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    phone_number_collection: { enabled: true },
    line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'nok',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    metadata: {
      cj_items: JSON.stringify(items.map((item: any) => ({
        vid: item.variantId,
        qty: item.quantity,
        name: item.name,
      }))),
    },
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['NO'] },
    success_url: `${origin}/takk`,
    cancel_url: origin,
  });

  return Response.json({ url: session.url });
}


