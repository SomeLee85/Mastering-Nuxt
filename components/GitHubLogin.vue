<template>
  <span>
    <button
      id="button"
      class="rounded-lg hover:bg-green-700"
      style="float: left"
      @click="login"
    >
      Log in with Github
    </button>
  </span>
</template>

<style scoped>
button {
  width: 230px;
  height: 60px;
  padding: 5px;
  line-height: 10px;
  text-align: left;
  text-indent: 10px;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
  color: white;
  background-color: rgb(0, 160, 0);
  background-image: url('/assets/images/ghub-logo2.png');
  background-size: 27%;
  background-repeat: no-repeat;
  background-position: right;
  cursor: pointer;
  margin: -10px;
}
</style>

<script setup lang="ts">
const course = await useCourse();
const { query } = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

//Checks if a user is logged in and redirects route to query
watchEffect(async () => {
  if (user.value) {
    await navigateTo(query.redirectTo as string, {
      replace: true,
    });
  }
});

const login = async () => {
  const queryParams =
    query.redirectTo !== undefined
      ? `?redirectTo=${query.redirectTo}`
      : '';
  const redirectTo = `${window.location.origin}/confirm${queryParams}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  });

  if (error) {
    console.error(error);
  }
};
</script>
