<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
import { getIdToken } from 'firebase/auth';
//@ts-ignore
const user = getIdToken();
const { query } = useRoute();

watch(
  user,
  () => {
    ///@ts-ignore
    if (user.value) {
      const to = (query.redirectTo as string) ?? '/course';
      return navigateTo(to, {
        replace: true,
      });
    }
  },
  { immediate: true }
);
</script>
