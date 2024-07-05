import { getDatabase } from 'firebase-admin/database';
import initFirebase from '~/server/api/utils/firebase';
import type {
  ChapterProgress,
  CourseProgress,
} from '~/types/course';
import type {
  ChapterOutline,
  LessonOutline,
} from '../course/meta.get';

initFirebase();
const db = getDatabase();

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const progressRef = db.ref(
    'users/' + user?.uid + '/lessonProgress'
  );
  console.log('~ this is user/progress ~');
  let obj = {};
  let progressArr: any = [];
  const data = await progressRef.get();
  data.forEach((snapshot) => {
    progressArr.push({
      chapterSlug: snapshot.key,
    });
    // console.log(
    //   '🚀 ~ data.forEach ~ snapshot.child(snapshot.key).val():',
    //   snapshot.val()
    // );
    snapshot.forEach((d) => {
      progressArr.push({ lessonSlug: d.key }, d.val());
      // console.log('d.val: ', d.val());
    });
  });
  // console.log(progressArr);
  // function calcCourseProgress() {
  //   data.forEach((snapshot) => {
  //     progressArr.push(snapshot.key);
  //     snapshot.forEach((d) => {
  //       // console.log(snapshot.key);
  //       progressArr.push(d.key, d.val());
  //     });
  //   });
  // }
  // calcCourseProgress();
  // console.log('~ progressArr: ', progressArr);

  const progress = progressArr.reduce(
    (
      courseProgress: CourseProgress,
      chapter: ChapterOutline
    ) => {
      // Collect the progress for each chapter in the course
      courseProgress[chapter.slug] =
        chapter.lessons?.reduce(
          (
            chapterProgress: ChapterProgress,
            lesson: LessonOutline
          ) => {
            // Collect the progress for each lesson in the chapter
            chapterProgress[lesson.slug] =
              progressArr.find(
                (progress) =>
                  progress.Lesson.slug === lesson.slug &&
                  progress.Lesson.Chapter.slug ===
                    chapter.slug
              )?.completed || false;

            return chapterProgress;
          },
          {}
        );

      return courseProgress;
    },
    {}
  );

  return progress;
});

// definePageMeta({
//   middleware: user
// })
// import { PrismaClient } from '@prisma/client';
// // import protectRoute from '~/server/utils/protectRoute';
// import course from '../course/meta.get';
// import type {
//   CourseProgress,
//   ChapterProgress,
// } from '~/types/course';
// import { useUserStore } from '~/stores/user';

// // const prisma = new PrismaClient();
// const user = useUserStore;

// export default defineEventHandler(async (event) => {
//   // Throw a 401 if there is no user logged in.
//   // protectRoute(event);
//   console.log('user/progress is being called here.');
//   // Get user email
//   const userEmail = user.email;
//   console.log('~ userEmail ~', userEmail);

// const {
//   user: { email: userEmail },

// } = event.context;

// Get the progress from the DB
// const userProgress = await prisma.lessonProgress.findMany(
//   {
//     where: {
//       userEmail,
//       // We only want to get the progress for the first course right now
//       Lesson: {
//         Chapter: {
//           Course: {
//             id: 1,
//           },
//         },
//       },
//     },
//     select: {
//       completed: true,
//       Lesson: {
//         select: {
//           slug: true,
//           Chapter: {
//             select: {
//               slug: true,
//             },
//           },
//         },
//       },
//     },
//   }
// );

// // Get course outline from meta endpoint
// const courseOutline = await $fetch('/api/course/meta');

// if (!courseOutline) {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Course outline not found',
//   });
// }

// Use the course outline and user progress to create a nested object
// with the progress for each lesson
