import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { amount, currency, frequency, donorName, donorEmail } = await req.json();
    const amountInt = Math.floor(Number(amount));
    if (!amountInt || amountInt < 1 || amountInt > 100000) {
      return new Response(JSON.stringify({ error: 'Cantidad inválida' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const isMonthly = frequency === 'monthly';

    const sessionConfig = {
      mode: isMonthly ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      customer_email: donorEmail,
      line_items: [
        {
          price_data: {
            currency: currency || 'eur',
            product_data: { 
              name: isMonthly ? 'Donación mensual a Fundación Mvrgi' : 'Donación a Fundación Mvrgi',
              description: `Donación de ${donorName}` 
            },
            unit_amount: amountInt * 100,
            ...(isMonthly && { recurring: { interval: 'month' } })
          },
          quantity: 1,
        },
      ],
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/donate?cancelled=1`,
      metadata: { 
        source: 'web',
        donorName,
        donorEmail,
        frequency: frequency || 'one_time',
        amount: amountInt.toString()
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ id: session.id }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    console.error('Stripe checkout error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
