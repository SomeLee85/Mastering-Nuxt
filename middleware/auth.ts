import { useUserStore } from '@/stores/user';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  let user2: any = useUserStore();

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      //User is signed in
      user2.isLoggedIn = true;
      user2.user = user;
      /**!!!!!!! 
      // Need to change the fetch url when deploying to netlify
      !!!!!!!!!!!!!*/
      const hasAccess = await usePugFetch('https://mastering-nuxt-netlify.netlify.app/.netlify/functions/hasAccess', {
        headers: { userEmail: user2.user.email, userId: user2.user.uid },
        mode: 'no-cors',
      });
      if (hasAccess) {
        return;
      } else if (user2.value && !hasAccess && !['/', ''].includes(to.path)) {
        // Prevent logging in with Github if user has not purchased course
        return navigateTo('/');
      }
    } else if (to.params.chapterSlug === '1-chapter-1') {
      return;
    } else if (!['/', ''].includes(to.path)) {
      //User is signed out
      user2.isLoggedIn = false;

      return navigateTo(`/?redirectTo=${to.path}`, {
        external: true,
      });
    }
  });
});
