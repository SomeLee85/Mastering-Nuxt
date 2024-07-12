import { getDatabase } from 'firebase-admin/database';
import initFirebase from '~/functions/firebase.mjs';

import _ from 'lodash';
initFirebase();
const db = getDatabase();

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const progressRef = db.ref('users/' + user?.uid + '/lessonProgress');

  let obj = {};

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
