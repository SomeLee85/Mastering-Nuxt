import { getDatabase } from 'firebase-admin/database';
import initFirebase from './firebase.mjs';

export default async function () {
  initFirebase();

  const db = getDatabase();
  const chapterRef = db.ref('chapters');
  const titleRef = db.ref('title');
  let course = [];

  await new Promise((resolve) => {
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
  return new Response(course);
}
