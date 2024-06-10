<template>
  <h1 class="text-green-800 text-bold">Quick Links</h1>
  <span>
    <NuxtLink
      class="underline font-medium"
      :href="firstLesson.path"
    >
      Go to first lesson.
    </NuxtLink>
  </span>
</template>

<style scoped>
span:hover {
  color: #008bff;
}
</style>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>
