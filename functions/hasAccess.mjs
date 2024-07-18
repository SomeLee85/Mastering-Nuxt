import { getDatabase } from 'firebase-admin/database';
import initFirebase from './firebase.mjs';
import _ from 'lodash';
initFirebase();
/*
 *  This handler grabs the currently logged in user then scans the database to check if there is
 * a user with a matching email and if they are shown as verified with that email.
 */
export default async function (req, context) {
  const userEmail = req.headers.get('userEmail');
  const userId = req.headers.get('userId');
  const email = userEmail;

  // No user is logged in
  if (!userId) {
    console.log('User is not signed in. (user):', userId);
    return new Response(false);
  }

  const db = getDatabase();
  const ref = db.ref('/users');

  const data = await ref.get();
  data.forEach((d) => {
    const val = d.val();
    if (val.userEmail === email && val.verified === true) {
      console.log('User has access.');
      return new Response(true);
    }
  });
}
