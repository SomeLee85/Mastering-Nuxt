<template>
  <NavBar />
  <Section class="space-y-12 flex flex-col items-center">
    <h1 class="text-7xl font-black text-blue-500 m-0 p-0">
      {{ title }}
    </h1>
    <img
      :src="screenshots[2]"
      class="w-full rounded-lg shadow-lg border-2 border-slate-200"
    />
    <div class="text-2xl font-medium">
      Learn how to use TypeScript in your Vue projects to
      supercharge your IDE's error detection and
      autocompletion, as well as provide type safe code
      that's easier to reason about and refactor.
    </div>
    <button
      class="bg-yellow-300 hover:bg-yellow-400 transition px-9 py-4 w-80 text-xl font-bold rounded-lg"
      @click="showPayment = !showPayment"
    >
      Buy Now
    </button>
    <p
      class="text-lg font-bold"
      style="margin-top: 20px; margin-bottom: -20px"
    >
      or
    </p>
    <GitHubLogin />
    <a
      class="hover:text-blue-500 hover:underline"
      :href="'/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3'"
    >
      View the First Chapter for free!</a
    >
  </Section>

  <Section title="What You'll Learn">
    <ul class="text-2xl font-medium space-y-6">
      <li
        v-for="outcome in learningOutcomes"
        :key="outcome"
        class="relative"
      >
        <Badge />
        {{ outcome }}
      </li>
    </ul>
  </Section>
  <Section title="Screenshots">
    <div class="flex flex-row flex-wrap relative my-12">
      <img
        v-for="image in screenshots"
        :src="image"
        class="w-1/2 rounded-xl shadow-xl border-4 border-slate-200 even:rotate-2 even:hover:-rotate-2 odd:-rotate-2 odd:hover:rotate-2 transition"
      />
    </div>
  </Section>
  <Section title="Course Outline">
    <!-- Get course outline from database  -->
    <ul class="text-2xl font-medium space-y-16">
      <li v-for="(chapter, index) in chapters">
        <Badge>
          {{ index + 1 }}
        </Badge>
        <h1 class="underline">
          {{ chapters[index].title }}
        </h1>

        <ul class="mt-4 space-y-2">
          <li
            v-for="lesson in chapters[index].lessons"
            :key="`${chapters[index].slug}-${lesson.slug}`"
            class="left-8 relative flex items-center space-y-2"
          >
            <Badge color="bg-blue-400">
              {{ lesson.number }}
            </Badge>
            <span class="text-xl opacity-80">{{
              lesson.title
            }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Section>
  <LazyPayment
    v-if="showPayment"
    @close="showPayment = false"
  />
</template>

<script setup lang="ts">
import screen1 from '~/assets/images/screen1.png';
import screen2 from '~/assets/images/screen2.png';
import screen3 from '~/assets/images/screen3.png';
import screen4 from '~/assets/images/screen4.png';
import screen5 from '~/assets/images/screen5.png';

import {
  getDatabase,
  get,
  ref as fbRef,
} from 'firebase/database';

const db = getDatabase();
const titleRef = fbRef(db, 'title');
const chapterRef = fbRef(db, 'chapters');

const title = await get(titleRef).then((snapshot) =>
  snapshot.val()
);
const chapters = await get(chapterRef).then((snapshot) => {
  let _chapters: any[] = [];
  snapshot.forEach((data) => {
    if (data.val() != null) {
      _chapters.push(data.val());
    }
  });
  return _chapters;
});

const learningOutcomes = [
  'Hands-On Experience with the Benefits of TypeScript',
  'How to make the most out of your IDE',
  'How to use TypeScript with the Composition API',
  'How to use TypeScript with the Options API',
  'How to type reactive data, refs, props, custom events, event handlers, DOM elements, template refs, data from provide/inject, and more',
];
const screenshots = [
  screen1,
  screen2,
  screen3,
  screen4,
  screen5,
];
definePageMeta({
  layout: false,
});

const showPayment = ref(false);
</script>
