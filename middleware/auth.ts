import { useUserStore } from '@/stores/user';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export default defineNuxtRouteMiddleware(async (to) => {
  let user2: any = useUserStore();

  const auth = getAuth();
  // const completed = false;
  // const db = getDatabase();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // console.log('🚀 ~ onAuthStateChanged ~ user:', user);
      //User is signed in
      user2.isLoggedIn = true;
      const hasAccess = await usePugFetch(
        '/api/user/hasAccess'
      );
      if (hasAccess) {
        return;
      } else if (user2.value && !hasAccess) {
        // Prevent logging in with Github if user has not purchased course
        return navigateTo('/');
      }
    } else if (to.params.chapterSlug === '1-chapter-1') {
      console.log('This should be the gate');
      return;
    } else {
      //User is signed out
      user2.isLoggedIn = false;
      console.log('This is what is redirecting');
      return navigateTo(`/?redirectTo=${to.path}`);
    }
  });
});

// export default defineNuxtRouteMiddleware(async (to) => {
// const user = useSupabaseUser();
// let user2: any = useUserStore();
// const hasAccess = await $fetch('/api/user/hasAccess', {
//   headers: useRequestHeaders(['cookie']),
// });

// const supabase = useSupabaseClient();
// const { data } = supabase.auth.onAuthStateChange(
//   (event, session) => {
//     // console.log(event, session);

//     if (session) {
//       user2.user = session.user;
//       user2.isLoggedIn = true;
//     } else {
//       user2.user = null;
//       user2.isLoggedIn = false;
//     }

//     if (event === 'INITIAL_SESSION') {
//       // handle initial session
//     } else if (event === 'SIGNED_IN') {
//       // handle sign in event
//       location.reload;
//     } else if (event === 'SIGNED_OUT') {
//       // handle sign out event
//       location.reload();
//     } else if (event === 'PASSWORD_RECOVERY') {
//       // handle password recovery event
//     } else if (event === 'TOKEN_REFRESHED') {
//       // handle token refreshed event
//     } else if (event === 'USER_UPDATED') {
//       // handle user updated event
//     }
//   }
// );
