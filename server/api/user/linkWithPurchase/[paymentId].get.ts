// import { PrismaClient } from '@prisma/client';
import { getDatabase } from 'firebase-admin/database';
import auth from '~/middleware/auth';
import { getUser } from '../../utils/firebase-helper';
import { getAuth } from 'firebase-admin/auth';
import { get } from '@vueuse/core';
import user from '~/server/middleware/user';
import { getIdToken } from 'firebase/auth';
// import { getAuth, onIdTokenChanged } from 'firebase/auth';
// import initFirebase from '../../utils/firebase';

// const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get PaymentIntent ID from route
  // initFirebase();
  // const auth = getAuth();
  // console.log('🚀 ~ defineEventHandler ~ auth:', auth);
  // onIdTokenChanged(auth, async (user) => {

  // console.log('~ event.context.user ~', event.context.user);
  //@ts-ignore
  const { paymentId } = event.context.params;
  // const user = getHeader(event, 'user');
  // console.log('🚀 ~ //onIdTokenChanged ~ user:', user);
  const body = await readBody(event).catch(() => {});
  // console.log('body:', body);

  // Update course purchase record
  try {
    // async function writeUserData() {
    // const gotAuth = get;
    // console.log('~ getAuth ~', gotAuth);
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
    // }
    // writeUserData();

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
  // });
  return 200;
});
