export const metadata = {
  title: 'Gracias por tu donación - Fundación Mvrgi',
};

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">¡Gracias por tu donación!</h1>
      <p className="text-gray-700">Hemos recibido tu contribución. Te hemos enviado un correo con el comprobante.</p>
    </div>
  );
}
