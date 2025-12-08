import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { cart, shippingData, total } = await req.json();

    // Validaciones
    if (!cart || cart.length === 0) {
      return new Response(JSON.stringify({ error: 'Carrito vacío' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!shippingData || !shippingData.name || !shippingData.email || !shippingData.address) {
      return new Response(JSON.stringify({ error: 'Datos de envío incompletos' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!stripe) {
      // Modo demo sin Stripe
      return new Response(JSON.stringify({ 
        checkoutUrl: `/success?demo=1&type=order&total=${total}` 
      }), { 
        status: 200, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Crear line items para Stripe
    const lineItems = cart.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: item.description || '',
          images: [item.image]
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Añadir envío si aplica
    const shippingCost = total - cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Gastos de envío',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Crear sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: shippingData.email,
      line_items: lineItems,
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}&type=order`,
      cancel_url: `${domain}/checkout?cancelled=1`,
      shipping_address_collection: {
        allowed_countries: ['ES', 'PT', 'FR', 'IT', 'DE'],
      },
      metadata: {
        type: 'souvenir_order',
        customerName: shippingData.name,
        customerPhone: shippingData.phone,
        shippingAddress: `${shippingData.address}, ${shippingData.city}, ${shippingData.postalCode}, ${shippingData.country}`,
      },
    });

    // TODO: Guardar pedido en base de datos
    console.log('📦 Nuevo pedido:', {
      cart,
      shippingData,
      total,
      sessionId: session.id
    });

    return new Response(JSON.stringify({ 
      checkoutUrl: session.url 
    }), { 
      status: 200, 
      headers: { 'content-type': 'application/json' } 
    });

  } catch (err) {
    console.error('Error procesando pedido:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { 
      status: 500, 
      headers: { 'content-type': 'application/json' } 
    });
  }
}
