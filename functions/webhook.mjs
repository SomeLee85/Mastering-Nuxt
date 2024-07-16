import { getDatabase } from 'firebase-admin/database';
import initFirebase from './firebase.mjs';

export default async function (req, context) {
  const rawBody = JSON.parse(await req.text());

  const payment_intent = rawBody.data.object.id;

  //if-else checks for payment success from stripes webhook data
  if (rawBody.type === 'payment_intent.succeeded' && payment_intent != undefined) {
    console.log('~ also paymentIntent ~', payment_intent);
    await handlePaymentIntentSucceeded(payment_intent, rawBody.data.object.receipt_email);
  } else if (rawBody.type === 'payment_intent.payment_failed') {
    await handlePaymentIntentFailed(payment_intent, rawBody.data.object.receipt_email);
  }

  return new Response(200);
}

async function handlePaymentIntentSucceeded(paymentIntent, email) {
  console.log('🚀 ~ handlePaymentIntentSucceeded ~ paymentIntent:', paymentIntent, email);
  // Verify the related course purchase
  initFirebase();
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
      paymentId: paymentIntent,
      verified: true,
    });
  } catch (error) {
    console.error('Invalid signature', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent, email) {
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
  }
}
