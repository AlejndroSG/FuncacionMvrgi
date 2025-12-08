import { stripe } from '@/lib/stripe';

export const metadata = {
  title: 'Gracias por tu donación - Fundación Mvrgi',
};

export const runtime = 'nodejs';

function formatAmount(amount, currency = 'EUR') {
  if (typeof amount !== 'number') return null;
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount);
}

export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams?.session_id;
  let sessionData = null;

  if (sessionId && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent.charges'],
      });

      const amount = typeof session.amount_total === 'number' ? session.amount_total / 100 : null;
      const currency = session.currency?.toUpperCase() || 'EUR';
      const frequency = session.metadata?.frequency || 'puntual';
      const receiptUrl =
        session.invoice?.hosted_invoice_url || session.payment_intent?.charges?.data?.[0]?.receipt_url;
      const email = session.customer_details?.email || session.customer_email || session.customer;

      sessionData = { amount, currency, frequency, receiptUrl, email };
    } catch (err) {
      console.error('Error retrieving checkout session', err);
    }
  }

  const formattedAmount = sessionData ? formatAmount(sessionData.amount, sessionData.currency) : null;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">¡Gracias por tu donación!</h1>
      <p className="text-gray-700">Hemos recibido tu contribución. Te hemos enviado un correo con el comprobante.</p>

      {sessionId && !sessionData && (
        <p className="mt-4 text-sm text-gray-600">No pudimos recuperar los detalles del pago, pero tu donación ya está registrada.</p>
      )}

      {sessionData && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 space-y-2 text-green-900">
          <p className="font-semibold">Resumen del pago</p>
          {formattedAmount && <p>Monto: {formattedAmount}</p>}
          <p>Frecuencia: {sessionData.frequency === 'recurring' ? 'Mensual' : 'Puntual'}</p>
          {sessionData.email && <p>Enviado a: {sessionData.email}</p>}
          {sessionData.receiptUrl && (
            <a className="text-green-700 underline" href={sessionData.receiptUrl} target="_blank" rel="noreferrer">
              Ver recibo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
