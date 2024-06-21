import initFirebase from './firebase';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

export async function createSessionCookie(token: any) {
  initFirebase();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await getAuth().createSessionCookie(
    token,
    { expiresIn }
  );
  return sessionCookie;
}

export async function getUser(idToken: any) {
  initFirebase();
  const user = await getAuth().verifyIdToken(idToken, true);
  return user;
}

export async function getDocument(
  collection: any,
  documentID: any
) {
  initFirebase();
  const doc = await getFirestore()
    .collection(collection)
    .doc(documentID)
    .get();
  return doc.data();
}
