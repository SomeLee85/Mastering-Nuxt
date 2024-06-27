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
import {
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
//@ts-ignore
const nuxtApp = useNuxtApp();
const auth = nuxtApp.$auth;
const provider = new GithubAuthProvider();
const { query } = useRoute();
const login = async () => {
  //@ts-ignore
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential =
        GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (query.redirectTo != null) {
        navigateTo(query.redirectTo as string, {
          replace: true,
        });
      } else {
        navigateTo(
          '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'
        );
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential =
        GithubAuthProvider.credentialFromError(error);
    });
};
</script>
