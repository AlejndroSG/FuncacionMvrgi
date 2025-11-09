import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
export const stripe = key ? new Stripe(key, { apiVersion: '2023-10-16' }) : null;
export const hasStripe = !!key;

// import Stripe from 'stripe';

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('Missing STRIPE_SECRET_KEY');
// }

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
