import initFirebase from '../utils/firebase';
import stripe from './stripe';
import { getDatabase } from 'firebase-admin/database';

export default defineEventHandler(async (event) => {
  initFirebase();
  const { email, username } = await readBody(event);
  const userId = getHeader(event, 'Cookie');
  // We only have one course for now, so we have the price hard-coded
  //sets the price that will be charged through stripe
  let paymentIntent: { id: any; client_secret: any };
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
    const userRef = ref.child('/' + username);
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
