// import { PrismaClient, Prisma } from '@prisma/client';

// const prisma = new PrismaClient();

// const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
//   select: {
//     title: true,
//     slug: true,
//     number: true,
//   },
// });

// export type LessonOutline = Prisma.LessonGetPayload<
//   typeof lessonSelect
// > & {
//   path: string;
// };

// const chapterSelect =
//   Prisma.validator<Prisma.ChapterArgs>()({
//     select: {
//       title: true,
//       slug: true,
//       number: true,
//       lessons: lessonSelect,
//     },
//   });
// export type ChapterOutline = Omit<
//   Prisma.ChapterGetPayload<typeof chapterSelect>,
//   'lessons'
// > & {
//   lessons: LessonOutline[];
// };

// const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
//   select: {
//     title: true,
//     chapters: chapterSelect,
//   },
// });
// export type CourseOutline = Omit<
//   Prisma.CourseGetPayload<typeof courseSelect>,
//   'chapters'
// > & {
//   chapters: ChapterOutline[];
// };
import { getDatabase } from 'firebase-admin/database';
import initFirebase from '../utils/firebase';

export default defineEventHandler(async () => {
  //   const outline = await prisma.course.findFirst(
  //     courseSelect
  //   );

  initFirebase();

  const db = getDatabase();
  const chapterRef = db.ref('chapters');
  const titleRef = db.ref('title');
  let course: any[] = [];

  const courseData = await new Promise((resolve) => {
    titleRef.on('value', (snapshot) => {
      const title = snapshot.val();
      let temp = {
        title: title,
      };
      course.push(temp);
    });
    chapterRef.orderByValue().on('value', (snapshot) => {
      snapshot.forEach((data) => {
        let tmp = {
          id: data.key,
          ...data.val(),
        };
        course.push(tmp);
      });
      resolve(course);
    });
  });
  console.log('~ courseData ~ ', courseData);
  return courseData;
  // Error if there is no course
  // if (!outline) {
  //   throw createError({
  //     statusCode: 404,
  //     statusMessage: 'Course not found',
  //   });
  // }

  // Map the outline so we can add a path to each lesson
  // const chapters = outline.chapters.map((chapter) => ({
  //   ...chapter,
  //   lessons: chapter.lessons.map((lesson) => ({
  //     ...lesson,
  //     path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
  //   })),
  // }));

  // return {
  //   ...outline,
  //   chapters,
  // };
});
