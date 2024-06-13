<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white"
  >
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button
        class="text-sm underline text-slate-500 hover:text-blue-500"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
  <div
    v-else
    class="rounded p-3 flex items-center space-x-3 bg-white"
  >
    <div class="text-right">
      <button
        class="text-sm underline text-slate-500 hover:text-blue-500"
        @click="login"
      >
        Login with GitHub
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
};

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  if (error) {
    console.error(error);
  }
  console.log(useState);
};

supabase.auth.onAuthStateChange((_, _session) => {
  if (_session?.access_token) {
    const accessToken = useCookie('sb-access-token');
    const refreshToken = useCookie('sb-refresh-token');
    accessToken.value = _session?.access_token ?? null;
    refreshToken.value = _session?.refresh_token ?? null;
  }
  console.log(_session);
});

const name = computed(
  () => user.value?.user_metadata.full_name
);
const profile = computed(
  () => user.value?.user_metadata.avatar_url
);
</script>
