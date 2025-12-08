import fs from 'fs/promises';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const emailFrom = process.env.EMAIL_FROM || 'no-reply@mvrgi.org';
const resendApiKey = process.env.RESEND_API_KEY;
const auditFile = 'data/donations.log';

async function logDonation(entry) {
  await fs.mkdir('data', { recursive: true });
  const payload = `${JSON.stringify(entry)}\n`;
  await fs.appendFile(auditFile, payload, 'utf8');
}

async function sendConfirmationEmail({ to, amount, currency, frequency, receiptUrl }) {
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not configured; skipping email send.');
    return;
  }

  const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency || 'EUR',
  });

  const formattedAmount = amount ? formatter.format(amount) : 'tu donación';
  const safeFrequency = frequency === 'recurring' ? 'mensual' : 'puntual';

  const html = `
    <p>Hola,</p>
    <p>Gracias por apoyar a Fundación Mvrgi. Hemos recibido tu donación ${safeFrequency} de <strong>${formattedAmount}</strong>.</p>
    <p>Puedes descargar tu comprobante en el siguiente enlace:</p>
    <p><a href="${receiptUrl}">Descargar recibo</a></p>
    <p>Si tienes dudas, responde a este correo.</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [to],
      subject: 'Recibo de tu donación',
      html,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Email send failed: ${message}`);
  }
}

function formatAmount(amountTotal) {
  if (typeof amountTotal !== 'number') return null;
  return amountTotal / 100;
}

export async function POST(req) {
  if (!stripe || !webhookSecret) {
    return new Response('Stripe no está configurado', { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Falta la firma de Stripe', { status: 400 });
  }

  const body = Buffer.from(await req.arrayBuffer());
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      let email = session.customer_details?.email || session.customer_email;
      const currency = session.currency?.toUpperCase() || 'EUR';
      const frequency = session.metadata?.frequency || 'puntual';
      const amount = formatAmount(session.amount_total);

      let receiptUrl = session.invoice?.hosted_invoice_url;

      if (!receiptUrl && session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent, {
          expand: ['charges'],
        });
        receiptUrl = paymentIntent?.charges?.data?.[0]?.receipt_url;
        if (!email) {
          email = paymentIntent?.charges?.data?.[0]?.billing_details?.email || email;
        }

        if (email && !paymentIntent?.receipt_email) {
          await stripe.paymentIntents.update(session.payment_intent, { receipt_email: email });
        }
      }

      const auditEntry = {
        timestamp: new Date().toISOString(),
        email: email || 'desconocido',
        amount,
        currency,
        frequency,
        sessionId: session.id,
      };

      await logDonation(auditEntry);

      if (email && receiptUrl) {
        await sendConfirmationEmail({
          to: email,
          amount,
          currency,
          frequency,
          receiptUrl,
        });
      } else {
        console.warn('Email or receipt URL missing; skipping confirmation email.');
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    console.error('Stripe webhook handler error', err);
    return new Response('Internal server error', { status: 500 });
  }
}
