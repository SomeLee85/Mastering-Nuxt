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
    apiKey: 'AIzaSyDPhNiYW-HHsfhli3ikONHyW8JHrI_i7mo',
    authDomain: 'adam-s-nuxt-course.firebaseapp.com',
    databaseURL: 'https://adam-s-nuxt-course-default-rtdb.firebaseio.com',
    projectId: 'adam-s-nuxt-course',
    storageBucket: 'adam-s-nuxt-course.appspot.com',
    messagingSenderId: '492838168468',
    appId: '1:492838168468:web:a127979b538a94bc219181',
    measurementId: 'G-3R73D76P20',
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
