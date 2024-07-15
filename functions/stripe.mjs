import stripe from 'stripe';
import { defineEventHandler } from 'h3';
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const Stripe = stripe(config.stripeSecret);

  return Stripe;
});
