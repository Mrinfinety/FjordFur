import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'nok',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/takk',
    cancel_url: 'http://localhost:3000',
  });

  return Response.json({ url: session.url });
}


