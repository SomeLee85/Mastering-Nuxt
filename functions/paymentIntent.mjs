import initFirebase from './firebase.mjs';
import { getDatabase } from 'firebase-admin/database';
import _ from 'lodash';

export default async function (req, context) {
  initFirebase();
  const userEmail = req.headers.get('userEmail');
  const userId = req.headers.get('uId');

  console.log('~ userEmail ~', userEmail, userId);
  // const { email } = await readBody(event);
  // const userId = getHeader(event, 'Cookie');
  // We only have one course for now, so we have the price hard-coded
  //sets the price that will be charged through stripe
  const stripe = require('stripe')(
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
  // Create a course purchase record
  //If nothing is being printed it may be looking for userId when there isnt one.
  // try {
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
