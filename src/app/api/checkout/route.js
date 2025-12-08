import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { amount, currency, frequency = 'once', donorName, donorEmail } = await req.json();
    const amountInt = Math.floor(Number(amount));
    if (!Number.isFinite(amountInt) || amountInt < 1 || amountInt > 100000) {
      return new Response(JSON.stringify({ error: 'Cantidad inválida' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    if (!['once', 'monthly'].includes(frequency)) {
      return new Response(JSON.stringify({ error: 'Frecuencia inválida' }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const metadata = {
      source: 'web',
      donorName: donorName || '',
      donorEmail: donorEmail || '',
      frequency,
    };

    const isMonthly = frequency === 'monthly';

    const sessionPayload = {
      mode: isMonthly ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [],
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel`,
      metadata,
    };

    if (isMonthly) {
      const product = await stripe.products.create({ name: 'Donación mensual a Fundación Mvrgi' });
      const price = await stripe.prices.create({
        currency: currency || 'eur',
        unit_amount: amountInt * 100,
        recurring: { interval: 'month' },
        product: product.id,
      });

      sessionPayload.line_items.push({ price: price.id, quantity: 1 });
    } else {
      sessionPayload.line_items.push({
        price_data: {
          currency: currency || 'eur',
          product_data: { name: 'Donación a Fundación Mvrgi' },
          unit_amount: amountInt * 100,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return new Response(JSON.stringify({ id: session.id }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    console.error('Stripe checkout error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
