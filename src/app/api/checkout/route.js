// import { stripe } from '@/lib/stripe';

// export const runtime = 'nodejs';

// export async function POST(req) {
//   try {
//     const { amount, currency } = await req.json();
//     const amountInt = Math.floor(Number(amount));
//     if (!amountInt || amountInt < 1 || amountInt > 100000) {
//       return new Response(JSON.stringify({ error: 'Cantidad inválida' }), { status: 400, headers: { 'content-type': 'application/json' } });
//     }

//     const domain = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

//     const session = await stripe.checkout.sessions.create({
//       mode: 'payment',
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: currency || 'eur',
//             product_data: { name: 'Donación a Fundación Mvrgi' },
//             unit_amount: amountInt * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${domain}/cancel`,
//       metadata: { source: 'web' },
//     });

//     return new Response(JSON.stringify({ id: session.id }), { status: 200, headers: { 'content-type': 'application/json' } });
//   } catch (err) {
//     console.error('Stripe checkout error', err);
//     return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'content-type': 'application/json' } });
//   }
// }
