import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get PaymentIntent ID from route
  //@ts-ignore
  const { paymentId } = event.context.params;
  const user = event.context.user;

  // Update course purchase record
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId,
      },
      data: {
        userEmail: user.email,
      },
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
