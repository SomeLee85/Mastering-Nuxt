import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type User = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const user = event.context.user as User;
  // console.log('🚀 ~ hasAccess EventHandler ~ user:', user);

  // No user is logged in
  if (!user) {
    console.log(
      '(hasAccess)User is not signed in. (user):',
      user
    );
    return false;
  }
  // console.log(
  //   '(hasAccess)This is the current user: ',
  //   user.email
  // );
  const coursePurchases =
    await prisma.coursePurchase.findMany({
      where: {
        userEmail: user.email,
        verified: true,
        // Hard coded course ID
        courseId: 1,
      },
    });
  // console.log(
  //   '🚀 ~ defineEventHandler ~ coursePurchases:',
  //   coursePurchases
  // );

  // This user has purchased the course
  return coursePurchases.length > 0;
});
