import { getDatabase } from 'firebase-admin/database';
import initFirebase from './firebase.mjs';
import _ from 'lodash';
initFirebase();

const db = getDatabase();
export default async function (req, context) {
  const userId = req.headers.get('uid');

  const progressRef = db.ref('users/' + userId + '/lessonProgress');

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
  return new Response(JSON.stringify(obj));
}
