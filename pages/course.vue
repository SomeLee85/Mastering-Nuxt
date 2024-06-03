<template>
  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <h1 class="text-3xl">
        <span class="font-medium text-green-800">
          <span class="font-bold">{{ title }}</span>
        </span>
      </h1>
      <UserCard />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3 class="text-green-800">Chapters</h3>
        <!--Renders the chapters into navigation tab-->
        <div
          class="space-y-1 mb-4 flex flex-col"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4 class="underline">{{ chapter.title }}</h4>

          <!--Shows each lesson within a chapter-->
          <!--Provides a lesson path route to navigate to each lesson and highlights current selection-->
          <NuxtLink
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal py-1 px-4 -mx-4"
            :to="lesson.path"
            :class="{
              'text-blue-500': lesson.path === $route.fullPath,
              'text-gray-600': lesson.path !== $route.fullPath,
            }"
          >
            <!--Numerates the lessons and renders title-->
            <span class="text-gray-500">{{ index + 1 }}. </span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-[65ch]">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Something went wrong with the lesson.
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="hover:curor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
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

<script setup>
const { chapters, title } = useCourse();
definePageMeta({
  layout: "default",
});

const resetError = async (error) => {
  await navigateTo(
    "/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3"
  );
  error.value = null;
};
</script>
