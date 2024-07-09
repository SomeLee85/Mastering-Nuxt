export type LessonOutline = {
  title: string;
  slug: string;
  number: number;
  path: string;
};

export type ChapterOutline = {
  title: string;
  slug: string;
  number: number;
  lessons: LessonOutline[];
};

export type CourseOutline = {
  title: string;
  chapters: ChapterOutline[];
};
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
  let obj;
  const courseData = await new Promise((resolve) => {
    titleRef.on('value', (snapshot) => {
      const title = snapshot.val();
      let temp = {
        title: title,
      };
      Object.assign(obj, temp);
      // console.log('~ object: ', JSON.stringify(obj));
      course.push(temp);
    });
    chapterRef.orderByValue().on('value', (snapshot) => {
      Object.assign(obj.child, snapshot.key);
      snapshot.forEach((data) => {
        Object.assign(obj.child, data.key, data.val());
        let tmp = {
          id: data.key,
          ...data.val(),
        };
        course.push(tmp);
      });
      resolve(course);
    });

    // console.log(
    //   '~ object stringified value: ',
    //   JSON.stringify(obj)
    // );
  });
  return course;
});
