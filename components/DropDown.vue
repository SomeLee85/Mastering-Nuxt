<template>
  <div>
    <button @click="isOpen = !isOpen" class="block px-3 py-1 rounded hover:bg-slate-600">Course</button>
    <div v-if="isOpen" class="absolute left-35 mt-1 py-2 w-48 rounded-lg shadow-xl bg-slate-600">
      <div class="mt-1 px-1 block py-1 rounded">
        <button @click="opened = !opened" class="hover:underline px-2">1-chapter-1</button>
        <div v-if="opened" class="bg-gray-500">
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3"
            >1-1 Typescript with Vue</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/1-chapter-1/lesson/2-typescript-in-vue-components"
            >1-2 Vue Components</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/1-chapter-1/lesson/3-typing-component-events"
            >1-3 Component Events</a
          >
        </div>
      </div>
      <div class="mt-1 block px-3 py-1 rounded hover:underline">2-chapter-2</div>
      <div class="mt-1 block px-3 py-1 rounded hover:underline">3-chapter-3</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false,
      opened: false,
    };
  },
};
</script>
