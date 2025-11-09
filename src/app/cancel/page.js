export const metadata = {
  title: 'Pago cancelado - Fundación Mvrgi',
};

export default function CancelPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Pago cancelado</h1>
      <p className="text-gray-700">Has cancelado el proceso de pago. Puedes intentarlo de nuevo cuando quieras.</p>
    </div>
  );
}
