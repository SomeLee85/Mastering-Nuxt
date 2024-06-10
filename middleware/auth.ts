export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  //should check if user is signed in or in first chapter and allows access to those routes
  if (user.value || to.params.chapterSlug === "1-chapter-1") {
    return;
  }

  //if user is not logged in or in the first chapter redirect to login page
  //and store previous route for redirection after login
  return navigateTo(`/login?redirectTo=${to.path}`);
});
