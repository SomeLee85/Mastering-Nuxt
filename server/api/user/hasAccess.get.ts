import { getDatabase } from 'firebase-admin/database';

type User = {
  email: string;
};

/*
 *  This handler grabs the currently logged in user then scans the database to check if there is
 * a user with a matching email and if they are shown as verified with that email.
 */
export default defineEventHandler(async (event) => {
  const user = event.context.user as User;
  const email = event.context.email;

  // No user is logged in
  if (!user) {
    console.log('(hasAccess)User is not signed in. (user):', user);
    return false;
  }

  const db = getDatabase();
  const ref = db.ref('/users');

  const data = await ref.get();
  data.forEach((d) => {
    const val = d.val();
    if (val.userEmail === email && val.verified === 'true') {
      return true;
    }
  });
});
