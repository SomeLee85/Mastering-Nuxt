<template>
  <div
    v-if="user.isLoggedIn && profile != null"
    class="rounded p-3 flex items-center space-x-3 bg-gray-100"
  >
    <img
      class="rounded-full h-8 border-2 border-blue-400"
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
// const supabase = useSupabaseClient();

import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
const db = getDatabase();
const auth = getAuth();
const provider = new GithubAuthProvider();

const logout = async () => {
  signOut(auth);
};

const login = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential =
        GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential =
        GithubAuthProvider.credentialFromError(error);
    });
};

//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//     options: {
//       redirectTo: window.location.href,
//     },
//   });
//   if (error) {
//     console.error(error);
//   }
// };
const user2 = auth.currentUser;
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

const name = computed(() => user2?.displayName);

const profile = computed(() => user2?.photoURL);
</script>
