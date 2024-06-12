<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { query } = useRoute();

watch(
  user,
  () => {
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
