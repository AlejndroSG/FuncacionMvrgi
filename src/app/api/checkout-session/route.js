import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Session ID requerido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!stripe) {
      return new Response(JSON.stringify({ error: 'Stripe no configurado' }), { 
        status: 500, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return new Response(JSON.stringify({
      amount: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_email,
      frequency: session.metadata?.frequency || 'one_time',
      donorName: session.metadata?.donorName,
      paymentStatus: session.payment_status,
    }), { 
      status: 200, 
      headers: { 'content-type': 'application/json' } 
    });
  } catch (err) {
    console.error('Error fetching checkout session:', err);
    return new Response(JSON.stringify({ error: 'Error recuperando sesión' }), { 
      status: 500, 
      headers: { 'content-type': 'application/json' } 
    });
  }
}
