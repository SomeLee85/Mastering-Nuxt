// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export default defineNuxtPlugin((nuxtApp) => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAomolTHnxh1HpNsJ9J0ZfCp08nZReZuKs',
    authDomain: 'nuxt-course-54f47.firebaseapp.com',
    databaseURL: 'https://nuxt-course-54f47-default-rtdb.firebaseio.com',
    projectId: 'nuxt-course-54f47',
    storageBucket: 'nuxt-course-54f47.appspot.com',
    messagingSenderId: '401493740312',
    appId: '1:401493740312:web:2a0015c06fbdd439d3ec6d',
    measurementId: 'G-9GZVZVLPJL',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firebase = getDatabase(app);

  return {
    provide: {
      db: firebase,
      auth: auth,
    },
  };
});
