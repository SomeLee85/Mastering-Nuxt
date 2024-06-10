import stripe from 'stripe';
const config = useRuntimeConfig();
//@ts-ignore
const Stripe = stripe(config.stripeSecret);

export default Stripe;
