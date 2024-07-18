<template>
  <div v-if="user.isLoggedIn && profile != null" class="rounded p-1 flex items-center space-x-2 bg-gray-100">
    <img class="rounded-full h-11 border-2 border-blue-400" :src="profile" />
    <div class="text-right">
      <div class="text-medium text-slate-600">Welcome, {{ name }}</div>
      <button
        class="text-sm underline text-slate-500 hover:text-blue-700"
        @click="logout"
        @input="() => $emit('update:modelValue', !modelValue)"
      >
        Log out
      </button>
    </div>
  </div>
  <div v-else class="rounded p-2 flex items-center space-x-3 bg-white">
    <div class="text-right">
      <button
        class="text-sm underline text-slate-500 hover:text-blue-500"
        @click="login"
        @input="() => $emit('update:modelValue', !modelValue)"
      >
        Log in
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore();
import { getDatabase, ref as fbRef, get } from 'firebase/database';
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const db = getDatabase();
const auth = getAuth();
const provider = new GithubAuthProvider();

const logout = async () => {
  signOut(auth);
  window.location.reload();
};

const login = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      window.location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
};

user.user = auth.currentUser;

onMounted(async () => {
  if (user.isLoggedIn) {
    const paidRef = fbRef(db, 'users/' + user.user.uid);
    user.paid = await get(paidRef).then((snapshot) => snapshot.val().verified);
  }
});
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

const name = computed(() => user.user.reloadUserInfo.screenName);

const profile = computed(() => user.user.photoURL);
</script>
