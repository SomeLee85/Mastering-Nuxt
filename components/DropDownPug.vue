<template>
  <div>
    <button @click="courseIsOpen = !courseIsOpen" class="px-1 py-1 rounded">
      Course
      <p class="float-right" style="transform: translate(10px, -4px)">⌄</p>
    </button>
    <div v-if="courseIsOpen" class="absolute items-center mt-1 px-2 py-2 rounded-lg shadow-xl bg-sky-800">
      <div class="mt-1 block py-2 rounded">
        <button @click="chOneOpened = !chOneOpened" class="hover:underline px-3 text-lg rounded">
          1-chapter-1
          <p v-if="!chOneOpened" class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
          <p v-else class="float-right text-xl" style="transform: translate(6px, 4px)">˅</p>
        </button>
        <div v-if="chOneOpened">
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
      <div v-if="user.paid">
        <button @click="chTwoOpened = !chTwoOpened" class="hover:underline px-3 text-lg rounded">
          2-chapter-2
          <p v-if="!chTwoOpened" class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
          <p v-else class="float-right text-xl" style="transform: translate(6px, 4px)">˅</p>
        </button>
        <div v-if="chTwoOpened">
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/2-chapter-2/lesson/1-using-typescript-with-the-options-api-in-components"
            >2-1 Typescript With Options Api</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/2-chapter-2/lesson/2-declaring-and-typing-component-props"
            >2-2 Component Props</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/2-chapter-2/lesson/3-typescript-in-vue-components"
            >2-3 Typescript in Components</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/2-chapter-2/lesson/4-typing-component-events"
            >2-4 Component Events</a
          >
        </div>
        <button @click="chThreeOpened = !chThreeOpened" class="mt-1 block px-3 py-2 rounded hover:underline text-lg">
          3-chapter-3
          <p v-if="!chThreeOpened" class="float-right text-xs" style="transform: translate(5px, 7px)">﹥</p>
          <p v-else class="float-right text-xl" style="transform: translate(6px, 4px)">˅</p>
        </button>
        <div v-if="chThreeOpened">
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/3-chapter-3/lesson/1-using-typescript-with-the-options-api-in-components"
            >3-1 Typescript With Options Api</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/3-chapter-3/lesson/2-declaring-and-typing-component-props"
            >3-2 Component Props</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/3-chapter-3/lesson/3-typescript-in-vue-components"
            >3-3 Typescript in Components</a
          >
          <a
            class="mt-1 block px-4 py-1 rounded hover:bg-teal-600 text-sm"
            href="/course/chapter/3-chapter-3/lesson/4-typing-component-events"
            >3-4 Component Events</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

var courseIsOpen = ref(false);
var chOneOpened = ref(false);
var chTwoOpened = ref(false);
var chThreeOpened = ref(false);

const user = useUserStore();
</script>
