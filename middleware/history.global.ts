export default defineNuxtRouteMiddleware((to, from) => {
  console.log('CS: GMiddleware called.');
  const navigationHistory = useLocalStorage(
    'history',
    [] as string[]
  );
  navigationHistory.value.push(to.path);
});
