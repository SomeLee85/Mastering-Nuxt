import { useUserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();
  let user2: any = useUserStore();
  const hasAccess = await $fetch('/api/user/hasAccess', {
    headers: useRequestHeaders(['cookie']),
  });

  const supabase = useSupabaseClient();
  const { data } = supabase.auth.onAuthStateChange(
    (event, session) => {
      // console.log(event, session);

      if (session) {
        user2.user = session.user;
        user2.isLoggedIn = true;
      } else {
        user2.user = null;
        user2.isLoggedIn = false;
      }

      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        location.reload;
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        location.reload();
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    }
  );

  if (
    hasAccess ||
    to.params.chapterSlug === '1-chapter-1'
  ) {
    return;
  } else if (user.value && !hasAccess) {
    // Prevent logging in with Github if user has not purchased course
    const client = useSupabaseClient();
    await client.auth.signOut();
  }

  return navigateTo(`/?redirectTo=${to.path}`);
});
