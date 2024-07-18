import initFirebase from './firebase.mjs';
import { getDatabase } from 'firebase-admin/database';
import _ from 'lodash';
import Stripe from 'stripe';

export default async function (req, context) {
  initFirebase();
  const userEmail = req.headers.get('userEmail');
  const userId = req.headers.get('uId');

  console.log('~ userEmail ~', userEmail, userId);

  const stripe = Stripe(
    'sk_test_51PQBMnRrMsBQdyzaYrNmmFHi6d8hwKgPCCgD0Nz1s1caCORjgQTOQ2cOY9nxFzAmPdL0kMXsjYwNKvIycsx9y7DU00hc2xctor'
  );
  let paymentIntent = { id: null, client_secret: null };
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: 7489,
      currency: 'usd',
      metadata: {
        userEmail,
      },
    });
  } catch (error) {
    console.error(error);
  }

  function writeUserData() {
    const db = getDatabase();
    const ref = db.ref('/users');
    const userRef = ref.child('/' + userId);
    userRef.set({
      createdAt: Date(),
      userId: userId,
      userEmail: userEmail,
    });
  }
  writeUserData();
  // Only return the secret
  return new Response(paymentIntent.client_secret);
}
