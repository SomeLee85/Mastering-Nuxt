<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">Lesson {{ chapter?.number }} - {{ lesson?.number }}</p>
    <h2 class="my-0">{{ lesson?.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson?.sourceUrl"
        class="font-normal text-md text-gray-500 hover:text-blue-600 hover:underline"
        :to="lesson?.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <!--Provides video download link if there is one-->
      <NuxtLink
        v-if="lesson?.downloadUrl"
        class="font-normal text-md text-gray-500 hover:text-blue-600 hover:underline"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson?.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <div class="py-8">
      <LessonCompleteButton v-if="user" :model-value="isCompleted" @update:model-value="toggleComplete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseProgress } from '~/stores/courseProgress';
import { getDatabase, ref as dbRef, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
const store = useCourseProgress();
const { initialize, toggleComplete } = store;
initialize();
const auth = getAuth();
const user = auth.currentUser;

const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;

definePageMeta({
  middleware: ['auth'],
});

const db = getDatabase();
const titleRef = dbRef(db, 'title');
const chapterRef = dbRef(db, 'chapters');
const lessonsRef = dbRef(db, 'lessons');
// console.log('🚀 ~ user?.uid:', user?.uid);

let title: any;
let lesson: any;
let lessons: any[] = [];
let chapters: any[] = [];
let progress: any[] = [];

await get(chapterRef).then((snapshot) => {
  let index = 0;
  snapshot.forEach((data) => {
    if (data.val() != null) {
      chapters.push(data.val());
    }
    for (let i = 0; i < chapters[index].lessons.length; i++) {
      if (chapters[index].lessons[i].slug === lessonSlug) {
        lesson = chapters[index].lessons[i];
      }
    }
    index++;
  });
});

onValue(titleRef, (snapshot) => {
  title = snapshot.val();
});

onValue(lessonsRef, (snapshot) => {
  snapshot.forEach((data) => {
    if (data.val() != null) {
      lessons.push(data.val());
    }
  });
});

// Check if the current lesson is completed
const isCompleted = computed(() => {
  return (
    //@ts-ignore
    store.progress?.[chapterSlug]?.[lessonSlug]
  );
});

const chapter = computed(() => {
  return chapters.find((chapter) => chapter.slug === route.params.chapterSlug);
});

useHead({
  title,
});
</script>
