import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

export async function POST(req: Request) {
  const { items } = await req.json();
  const reqUrl = new URL(req.url);
  const origin = `${reqUrl.protocol}//${reqUrl.host}`;

  const totalNok = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const fraktNok = totalNok >= 499 ? 0 : 99;

  const lineItems = [
    ...items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'nok',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    ...(fraktNok > 0 ? [{
      price_data: {
        currency: 'nok',
        product_data: { name: 'Frakt' },
        unit_amount: fraktNok * 100,
      },
      quantity: 1,
    }] : []),
  ];

  const session = await stripe.checkout.sessions.create({
    phone_number_collection: { enabled: true },
    line_items: lineItems,
    metadata: {
      cj_items: JSON.stringify(items.map((item: any) => ({
        vid: item.variantId,
        qty: item.quantity,
        name: item.name,
      }))),
    },
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ([
        'AC','AD','AE','AG','AL','AM','AO','AR','AT','AU','AW','AZ',
        'BA','BB','BD','BE','BF','BG','BH','BI','BJ','BM','BN','BO','BR','BS','BT','BW','BY','BZ',
        'CA','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CV','CW','CY','CZ',
        'DE','DJ','DK','DM','DO','DZ',
        'EC','EE','EG','ES','ET',
        'FI','FJ','FK','FO','FR',
        'GA','GB','GD','GE','GH','GI','GL','GM','GN','GQ','GR','GT','GW','GY',
        'HK','HN','HR','HT','HU',
        'ID','IE','IL','IN','IQ','IS','IT',
        'JM','JO','JP',
        'KE','KG','KH','KI','KM','KN','KR','KW','KY','KZ',
        'LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY',
        'MA','MC','MD','ME','MG','MK','ML','MM','MN','MO','MR','MS','MT','MU','MV','MW','MX','MY','MZ',
        'NA','NC','NE','NG','NI','NL','NO','NP','NR','NZ',
        'OM',
        'PA','PE','PF','PG','PH','PK','PL','PR','PS','PT','PW','PY',
        'QA',
        'RO','RS','RW',
        'SA','SB','SC','SE','SG','SI','SK','SL','SM','SN','SR','ST','SV','SX','SZ',
        'TC','TD','TG','TH','TJ','TL','TM','TN','TO','TR','TT','TV','TW','TZ',
        'UA','UG','US','UY','UZ',
        'VC','VE','VN','VU',
        'WS',
        'XK',
        'YE',
        'ZA','ZM','ZW',
      ] as any),
    },
    success_url: `${origin}/takk`,
    cancel_url: origin,
  });

  return Response.json({ url: session.url });
}


