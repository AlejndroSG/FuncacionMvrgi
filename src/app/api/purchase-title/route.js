import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { titleId, titleName, price, buyerName, buyerEmail } = await req.json();

    // Validaciones
    if (!titleId || !titleName || !price) {
      return new Response(JSON.stringify({ error: 'Datos del título inválidos' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!buyerName || buyerName.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Nombre inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!buyerEmail || !buyerEmail.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    const priceInt = Math.floor(Number(price));
    if (!priceInt || priceInt < 1) {
      return new Response(JSON.stringify({ error: 'Precio inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!stripe) {
      // Modo demo sin Stripe
      return new Response(JSON.stringify({ 
        checkoutUrl: `/success?demo=1&title=${encodeURIComponent(titleName)}&amount=${priceInt}` 
      }), { 
        status: 200, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Crear sesión de Stripe para producto digital
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: buyerEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { 
              name: `Título Honorífico: ${titleName}`,
              description: `Certificado digital personalizado a nombre de ${buyerName}`,
              images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80']
            },
            unit_amount: priceInt * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}&type=title`,
      cancel_url: `${domain}/titulos?cancelled=1`,
      metadata: { 
        type: 'honorary_title',
        titleId,
        titleName,
        buyerName,
        buyerEmail
      },
    });

    return new Response(JSON.stringify({ 
      checkoutUrl: session.url 
    }), { 
      status: 200, 
      headers: { 'content-type': 'application/json' } 
    });

  } catch (err) {
    console.error('Error procesando compra de título:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { 
      status: 500, 
      headers: { 'content-type': 'application/json' } 
    });
  }
}
