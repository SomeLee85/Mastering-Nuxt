<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
    <span>
      <button
        id="button"
        onmouseover="style='blue'"
        class="bg-green-800 text-white font-bold py-2 px-4 rounded"
        @click="login"
      >
        Log in with Github
      </button>
    </span>
  </div>
</template>

<style scoped>
button:hover {
  border: 2px solid green;
  border-radius: 10px;
}
button:active {
  border: 3px ridge green;
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
