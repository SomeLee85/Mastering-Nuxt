import initFirebase from './firebase.mjs';
import stripe from './stripe.mjs';
import { getDatabase } from 'firebase-admin/database';
import { useUserStore } from '~/stores/user';

export default defineEventHandler(async (event) => {
  initFirebase();
  const { email } = await readBody(event);
  let user = useUserStore();
  const userId = getHeader(event, 'Cookie');
  // We only have one course for now, so we have the price hard-coded
  //sets the price that will be charged through stripe
  let paymentIntent = { id, client_secret };
  try {
    paymentIntent = await stripe.paymentIntents.create({
      amount: 7489,
      currency: 'usd',
      metadata: {
        email,
      },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating payment intent',
    });
  }
  // Create a course purchase record
  //If nothing is being printed it may be looking for userId when there isnt one.
  // try {
  function writeUserData() {
    const db = getDatabase();
    const ref = db.ref('/users');
    const userRef = ref.child('/' + user.user.uid);
    userRef.set({
      createdAt: Date(),
      userId: userId,
      userEmail: email,
    });
  }
  writeUserData();
  // Only return the secret
  return paymentIntent.client_secret;
});
