import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export const runtime = 'nodejs';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!webhookSecret) {
      console.warn('⚠️ Stripe webhook secret no configurado');
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('✅ Checkout session completed:', session.id);
        
        // Extract donation info
        const donationData = {
          sessionId: session.id,
          amount: session.amount_total / 100,
          currency: session.currency,
          customerEmail: session.customer_email,
          donorName: session.metadata?.donorName,
          frequency: session.metadata?.frequency || 'one_time',
          paymentStatus: session.payment_status,
          createdAt: new Date(session.created * 1000).toISOString(),
        };

        // TODO: Save donation to database
        console.log('💾 Donation data:', donationData);

        // TODO: Send receipt email
        await sendReceiptEmail(donationData);
        
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('✅ Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('❌ Payment failed:', paymentIntent.id);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log('🔄 Subscription event:', subscription.id);
        // Handle monthly donation subscription
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(JSON.stringify({ error: 'Webhook handler failed' }), { status: 500 });
  }
}

// Email sending function (placeholder - implement with your email service)
async function sendReceiptEmail(donationData) {
  console.log('📧 Sending receipt email to:', donationData.customerEmail);
  
  // TODO: Implement email sending with services like:
  // - Resend (https://resend.com)
  // - SendGrid
  // - AWS SES
  // - Nodemailer
  
  const emailContent = `
    Hola ${donationData.donorName},
    
    ¡Gracias por tu generosa donación de ${donationData.amount}€!
    
    Detalles de tu donación:
    - Cantidad: ${donationData.amount}€
    - Tipo: ${donationData.frequency === 'monthly' ? 'Donación mensual' : 'Donación única'}
    - Fecha: ${new Date(donationData.createdAt).toLocaleDateString('es-ES')}
    - ID de transacción: ${donationData.sessionId}
    
    Tu contribución ayudará directamente a las familias que más lo necesitan.
    
    Con gratitud,
    Fundación Mvrgi
  `;
  
  console.log('Email content:', emailContent);
  
  // Placeholder: In production, send actual email here
  return true;
}
