import { serverSupabaseUser } from '#supabase/server';
//creates cookies for user to allow user to refresh page
//and still have access to the same route and database
export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  // Errors with "invalid claim: missing sub claim"
  // See https://github.com/nuxt-modules/supabase/issues/238
  if (
    cookies['sb-access-token'] &&
    cookies['sb-refresh-token']
  ) {
    const user = await serverSupabaseUser(event);
    event.context.user = user;
  }
});
