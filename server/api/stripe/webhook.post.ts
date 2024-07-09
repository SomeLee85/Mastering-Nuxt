// import { PrismaClient } from '@prisma/client';
import { getDatabase } from 'firebase-admin/database';
import stripe from './stripe';

type PaymentIntent = {
  id: string;
};

// const prisma = new PrismaClient();
const STRIPE_WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret;

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, 'stripe-signature');
  const body = await readRawBody(event);
  const rBody = await readBody(event);
  // Verify the webhook signature
  let stripeEvent;
  try {
    stripeEvent = await stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Invalid signature', error);
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid signature',
    });
  }

  //if-else checks for payment success from stripes webhook data
  if (stripeEvent.type === 'payment_intent.succeeded') {
    await handlePaymentIntentSucceeded(stripeEvent.data.object, rBody.data.object.receipt_email);
  } else if (stripeEvent.type === 'payment_intent.payment_failed') {
    await handlePaymentIntentFailed(stripeEvent.data.object, rBody.data.object.receipt_email);
  }

  return 200;
});

async function handlePaymentIntentSucceeded(paymentIntent: PaymentIntent, email: string) {
  // Verify the related course purchase
  try {
    const db = getDatabase();
    var uid = '';
    const ref = db.ref('/users');

    const data = await ref.get();
    data.forEach((d) => {
      const val = d.val();
      if (val.userEmail === email) {
        uid = d.key;
      }
    });

    const userRef = ref.child('/' + uid);
    userRef.update({
      paymentId: paymentIntent.id,
      verified: true,
      lessonProgress: {
        '1-chapter-1': {
          '1-introduction-to-typescript-with-vue-js-3': {
            completed: false,
          },
          '2-typescript-in-vue-components': {
            completed: false,
          },
          '3-typing-component-events': { completed: false },
        },
        '2-chapter-2': {
          '1-using-typescript-with-the-options-api-in-components': { completed: false },
          '2-declaring-and-typing-component-props': {
            completed: false,
          },
          '3-typescript-in-vue-components': {
            completed: false,
          },
          '4-typing-component-events': { completed: false },
        },
        '3-chapter-3': {
          '1-using-typescript-with-the-options-api-in-components': { completed: false },
          '2-declaring-and-typing-component-props': {
            completed: false,
          },
          '3-typescript-in-vue-components': {
            completed: false,
          },
          '4-typing-component-events': { completed: false },
        },
      },
    });
  } catch (error) {
    console.error('Invalid signature', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error verifying purchase',
    });
  }
}

async function handlePaymentIntentFailed(paymentIntent: PaymentIntent, email: string) {
  // Clean up the course purchase
  try {
    const db = getDatabase();
    var username = '';
    const ref = db.ref('/users');

    const data = await ref.get();
    data.forEach((d) => {
      const val = d.val();
      if (val.userEmail === email) {
        username = d.key;
      }
    });

    const userRef = ref.child('/' + username);
    userRef.remove();
  } catch (error) {
    console.error('Invalid signature', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error removing purchase',
    });
  }
}
