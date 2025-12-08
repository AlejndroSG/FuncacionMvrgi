This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Configuración de pagos en modo prueba

### Stripe (pruebas)

1. En tu panel de Stripe, ve a **Developers → API keys** y copia las llaves de prueba.
2. Añade las variables a `.env.local` en la raíz del proyecto:

   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx
   ```

   Reinicia el servidor si ya estaba corriendo para que Next.js recargue la configuración.
3. Ejecuta el proyecto en local con `npm run dev` y realiza un pago de prueba usando la tarjeta de test `4242 4242 4242 4242`, cualquier fecha futura y CVC. Stripe mostrará el pago como exitoso sin cargos reales.
4. Verifica el webhook de Stripe (por ejemplo con `stripe listen --forward-to localhost:3000/api/stripe/webhook`) y confirma que la solicitud llegue y devuelva una respuesta `200`. Revisa la consola y los logs de tu endpoint para validar los eventos.
5. Revisa el correo de recibo asociado a tu cuenta de pruebas. Stripe envía recibos de test a los correos configurados; confirma que el mensaje incluye el monto y el identificador del pago.

### PayPal (sandbox)

Si habilitas pagos con PayPal, configura primero las credenciales sandbox desde el [Dashboard de PayPal Developer](https://developer.paypal.com/developer/accounts/):

1. Crea o usa una **Sandbox Business Account** y obtén el **Client ID** y **Secret** desde **Sandbox → Accounts → API credentials**.
2. Declara las variables de entorno en `.env.local` (ajusta los nombres a los que use tu integración):

   ```bash
   PAYPAL_SANDBOX_CLIENT_ID=your_client_id
   PAYPAL_SANDBOX_SECRET=your_client_secret
   ```

3. Ejecuta el flujo de pago con usuarios sandbox (comprador y vendedor). Confirma que el pago aparece como **COMPLETED** en el dashboard sandbox.
4. Si tu integración usa webhooks de PayPal, registra un webhook de sandbox y valida que el endpoint reciba los eventos esperados (estado `200`).
5. Confirma que los correos de recibo sandbox llegan a las cuentas de prueba asociadas.
