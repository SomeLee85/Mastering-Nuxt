import { getDatabase } from 'firebase-admin/database';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

type User = {
  email: string;
};

/*
 *  This handler grabs the currently logged in user then scans the database to check if there is
 * a user with a matching email and if they are shown as verified with that email.
 */
export default defineEventHandler(async (event) => {
  const user = event.context.user as User;
  const email = event.context.email;
  // const dbRef = ref(getDatabase());

  // console.log('🚀 ~ hasAccess EventHandler ~ user:', user);

  // No user is logged in
  if (!user) {
    console.log('(hasAccess)User is not signed in. (user):', user);
    return false;
  }
  // console.log(
  //   '(hasAccess)This is the current user: ',
  //   user.email
  // );

  const db = getDatabase();
  const ref = db.ref('/users');

  const data = await ref.get();
  data.forEach((d) => {
    const val = d.val();
    if (val.userEmail === email && val.verified === 'true') {
      return true;
    }
  });
  //@ts-ignore
  // get(child(dbRef, `users/${userId}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log('No data available');
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // const coursePurchases =
  //   await prisma.coursePurchase.findMany({
  //     where: {
  //       userEmail: user.email,
  //       verified: true,
  //       // Hard coded course ID
  //       courseId: 1,
  //     },
  //   });
  // console.log(
  //   '🚀 ~ defineEventHandler ~ coursePurchases:',
  //   coursePurchases
  // );

  // This user has purchased the course
  // return coursePurchases.length > 0;
});
