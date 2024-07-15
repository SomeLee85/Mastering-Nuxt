<template>
  <div>
    <button @click="isOpen = !isOpen" class="px-1 py-1 rounded hover:bg-slate-600">Course</button>
    <div v-if="isOpen" class="absolute left-21 mt-1 px-2 py-2 rounded-lg shadow-xl bg-slate-600">
      <div class="mt-1 block py-2 rounded">
        <button @click="opened = !opened" class="hover:underline px-3 text-lg rounded">1-chapter-1</button>
        <div v-if="opened" class="bg-gray-500 rounded">
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
      <div class="mt-1 block px-3 py-2 rounded hover:underline text-lg">2-chapter-2</div>
      <div class="mt-1 block px-3 py-2 rounded hover:underline text-lg">3-chapter-3</div>
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
