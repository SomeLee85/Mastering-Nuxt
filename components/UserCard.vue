<template>
  <div
    v-if="user.isLoggedIn"
    class="rounded p-3 flex items-center space-x-3 bg-gray-100"
  >
    <img
      class="rounded-full h-9 border-2 border-blue-400"
      :src="profile"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button
        class="text-sm underline text-slate-500 hover:text-blue-500"
        @click="logout"
        @input="
          () => $emit('update:modelValue', !modelValue)
        "
      >
        Log out
      </button>
    </div>
  </div>
  <div
    v-else
    class="rounded p-2 flex items-center space-x-3 bg-white"
  >
    <div class="text-right">
      <button
        class="text-sm underline text-slate-500 hover:text-blue-500"
        @click="login"
        @input="
          () => $emit('update:modelValue', !modelValue)
        "
      >
        Log in
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore();
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
    options: {
      redirectTo: window.location.href,
    },
  });
  if (error) {
    console.error(error);
  }
};

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

const name = computed(
  () => user?.user?.user_metadata?.full_name
);
const profile = computed(
  () => user?.user?.user_metadata?.avatar_url
);
</script>
