<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500" @click="logout">
        Sign out
      </button>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  color: #008bff;
}
</style>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

//logout method that returns user to login page and handles errors
const logout = async () => {
  const { error } = await auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
  await navigateTo("/login");
};

//creates constants for username and user pfp
const name = computed(() => user.value?.user_metadata.full_name);
const profile = computed(() => user.value?.user_metadata.avatar_url);
</script>
