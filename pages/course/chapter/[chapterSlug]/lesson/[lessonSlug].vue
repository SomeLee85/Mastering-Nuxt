<template>
  <div>
    <!--Renders faded Lesson title that changes depending on current lesson&chapter num-->
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="font-bold text-green-800">
      <span>{{ lesson.title }}</span>
    </h2>
    <div class="flex space-x-4 mt-2 mb-8 lesson-link-list">
      <!--Provides a source code link if there is one-->
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <!--Provides video download link if there is one-->
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <!--Updates the viedo player using the current lessons videoId-->
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <!--Creates lessoncompletebutton that toggles the state to complete or mark as complete-->
    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="toggleComplete"
    />
  </div>
</template>

<style scoped>
.lesson-link-list a:hover {
  color: #008bff;
}
</style>

<script setup>
const course = useCourse();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug, lessonSlug);

definePageMeta({
  middleware: [
    function ({ params }, from) {
      const course = useCourse();

      const chapter = course.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      );

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
      return true;
    },
    "auth",
  ],
});

//Holds the current chapter
const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

//Creates the constant title which holds the current lesson title
const title = computed(() => {
  return `${lesson.value.title} - ${course.title}`;
});

//Updates the heading of the webpage to current lesson title
useHead({
  title,
});

//Uses local storage to store current buttons progress value
const progress = useLocalStorage("progress", []);

//Checks if there is an array for chapter and lesson.
//If not returns false for uncompleted. If it is completed returns value.
const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }
  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false;
  }
  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

//Allows the button to toggle between complete and incomplete
const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }
  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonComplete.value;
};
</script>
