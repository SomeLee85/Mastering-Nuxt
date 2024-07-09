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
    apiKey: 'AIzaSyBv9y4-ubSZKPN5mfC3_RyrgIUznz5sVB8',
    authDomain: 'mastering-nuxt-3-9e7fb.firebaseapp.com',
    databaseURL:
      'https://mastering-nuxt-3-9e7fb-default-rtdb.firebaseio.com',
    projectId: 'mastering-nuxt-3-9e7fb',
    storageBucket: 'mastering-nuxt-3-9e7fb.appspot.com',
    messagingSenderId: '228070056250',
    appId: '1:228070056250:web:6ef0c9b13e4d95fb57f003',
    measurementId: 'G-9FH6GDER3Y',
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
