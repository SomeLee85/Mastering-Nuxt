import { PrismaClient } from '@prisma/client';
import { getDatabase } from 'firebase-admin/database';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get PaymentIntent ID from route
  //@ts-ignore
  const { paymentId } = event.context.params;
  const user = event.context.user;
  console.log('🚀 ~ defineEventHandler ~ user:', user);

  // Update course purchase record
  try {
    async function writeUserData() {
      const db = getDatabase();
      const ref = db.ref('/users');
      var username = '';
      const data = await ref.get();
      data.forEach((d) => {
        const val = d.val();
        if (val.paymentId === paymentId) {
          console.log(
            '🚀 ~ data.forEach ~ val.paymentId:',
            val.paymentId
          );
          username = d.key;
          const userRef = ref.child('/' + username);
          console.log(
            '🚀 ~ data.forEach ~ username:',
            username
          );
          userRef.update({
            userEmail: user.email,
          });
          console.log(
            '🚀 ~ data.forEach ~ user.email:',
            user.email
          );
        }
      });
    }
    writeUserData();

    // await prisma.coursePurchase.update({
    //   where: {
    //     paymentId,
    //   },
    //   data: {
    //     userEmail: user.email,
    //   },
    // });
  } catch (error) {
    console.error('Invalid signature', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error linking course purchase',
    });
  }

  return 200;
});
