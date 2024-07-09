import { getDatabase } from 'firebase-admin/database';
import initFirebase from '~/server/api/utils/firebase';

import _ from 'lodash';
initFirebase();
const db = getDatabase();

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const progressRef = db.ref('users/' + user?.uid + '/lessonProgress');
  // console.log('~ this is user/progress ~');
  let obj = {};
  // let progressArr: any = [];
  const data = await progressRef.get();
  data.forEach((snapshot) => {
    snapshot.forEach((d) => {
      let chapterSlug = snapshot.key;

      if (!obj[chapterSlug] || !_.isObject(obj[chapterSlug])) {
        obj[chapterSlug] = {};
      }

      if (!_.isObject(obj[chapterSlug][d.key]) || !obj[chapterSlug][d.key]) {
        obj[chapterSlug][d.key] = d.val();
      }
    });
  });
  return obj;
});
