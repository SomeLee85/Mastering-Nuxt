import { getDatabase } from 'firebase-admin/database';
import user from '~/functions/user.mjs';

export default defineEventHandler(async (event) => {
  // Get PaymentIntent ID from route
  //@ts-ignore
  const { paymentId } = event.context.params;

  // Update course purchase record
  try {
    const db = getDatabase();
    const ref = db.ref('/users');
    var username = '';
    const data = await ref.get();
    data.forEach((d) => {
      const val = d.val();
      if (val.paymentId === paymentId) {
        username = d.key;
        const userRef = db.ref('/users/' + username);

        userRef.update({
          userEmail: user,
        });
      }
    });
  } catch (error) {
    console.error('Invalid signature', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error linking course purchase',
    });
  }
  return 200;
});
