<template>
  <div>
    <div
      class="mb-4 flex justify-between items-center w-full"
    >
      <h1 class="text-3xl">
        <span class="font-medium text-green-800">
          <span class="font-bold">{{ title }}</span>
        </span>
      </h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3>Chapters</h3>
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="(chapter, index) in chapters"
          :key="chapters[index].slug"
        >
          <h4 class="flex justify-between items-center">
            {{ chapters[index].title }}
            <span
              v-if="percentageCompleted"
              class="text-emerald-500 text-sm"
            >
              {{ percentageCompleted.chapters[index] }}%
            </span>
          </h4>
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="chapter.lessons[index].slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :to="chapter.lessons[index].path"
            :class="{
              'text-blue-500':
                chapter.lessons[index].path ===
                $route.fullPath,
              'text-gray-600':
                chapter.lessons[index].path !==
                $route.fullPath,
            }"
          >
            <span class="text-gray-500"
              >{{ index + 1 }}.</span
            >
            <span>{{ chapter.lessons[index].title }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="percentageCompleted"
          class="mt-8 text-sm font-medium text-gray-500 flex justify-between items-center"
        >
          Course completion:
          <span> {{ percentageCompleted.course }}% </span>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[65ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getDatabase,
  ref,
  onValue,
  get,
} from 'firebase/database';
import { useCourseProgress } from '~/stores/courseProgress';

// Get chapter completion percentages

const db = getDatabase();
const titleRef = ref(db, 'title');
const chapterRef = ref(db, 'chapters');

let title: any;
let chapters: any[] = [];
onValue(titleRef, (snapshot) => {
  title = snapshot.val();
});

await get(chapterRef).then((snapshot) => {
  snapshot.forEach((data) => {
    if (data.val() != null) {
      chapters.push(data.val());
    }
  });
});

const { percentageCompleted } = storeToRefs(
  useCourseProgress()
);

const resetError = async (error: { value: null }) => {
  await navigateTo(
    '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'
  );
  error.value = null;
};
</script>
