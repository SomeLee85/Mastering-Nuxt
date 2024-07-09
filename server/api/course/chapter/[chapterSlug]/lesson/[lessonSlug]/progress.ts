// import { PrismaClient } from '@prisma/client';
// import { useUserStore } from '~/stores/user';
// // import protectRoute from '~/server/utils/protectRoute';
// const prisma = new PrismaClient();
// import { getDatabase } from 'firebase-admin/database';
// import initFirebase from '~/server/api/utils/firebase';
// import { onValue } from 'firebase/database';
// initFirebase();
// const db = getDatabase();

// // Endpoint that updates the progress of a lesson
// export default defineEventHandler(async (event) => {
//   // Only allow PUT, PATCH, or POST requests
// assertMethod(event, ['PUT', 'PATCH', 'POST']);
// const user = event.context.user;
// const usersRef = db.ref('users/' + user?.uid);
//   // Throw a 401 if there is no user logged in.
//   // protectRoute(event);

//   // Get the route params
//   //@ts-ignore
//   const { chapterSlug, lessonSlug } = event.context.params;

//   const lessonRef = db.ref('/lessonProgress');

//   lessonRef.once('value', function (snapshot) {
//     console.log('lessonRef data value: ', snapshot.val());
//   });

//   // Get the lesson from the DB
//   const lesson = await prisma.lesson.findFirst({
//     where: {
//       slug: lessonSlug,
//       Chapter: {
//         slug: chapterSlug,
//       },
//     },
//   });

//   // If the lesson doesn't exist, throw a 404
//   if (!lesson) {
//     throw createError({
//       statusCode: 404,
//       statusMessage: 'Lesson not found',
//     });
//   }

//   // Get the completed value from the request body and update progress in DB
//   // Select based on the chapter and lesson slugs
//   const { completed } = await readBody(event);
//   // const user = useUserStore();
//   const userEmail: any = user.user.email;

//   // return prisma.lessonProgress.upsert({
//   //   where: {
//   //     lessonId_userEmail: {
//   //       lessonId: lesson.id,
//   //       userEmail,
//   //     },
//   //   },
//   //   update: {
//   //     completed,
//   //   },
//   //   create: {
//   //     completed,
//   //     userEmail,
//   //     Lesson: {
//   //       connect: {
//   //         id: lesson.id,
//   //       },
//   //     },
//   //   },
//   // });
// });
