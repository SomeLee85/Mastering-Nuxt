<template>
    <div>
        <!--Renders faded Lesson title that changes depending on current lesson&chapter num-->
        <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
            Lesson {{ chapter.number }} - {{ lesson.number }}
        </p>
        <div class="flex space-x-4 mt-2 mb-8">
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
        <VideoPlayer 
        v-if="lesson.videoId"
        :videoId="lesson.videoId"
        />
        <p>{{ lesson.text }}</p>
        <!--Creates lessoncompletebutton that toggles the state to complete or mark as complete-->
        <LessonCompleteButton 
            :model-value="isLessonComplete"
            @update:model-value="toggleComplete"
        />
    </div>
</template>

<script setup>
const course = useCourse();
const route = useRoute()

//Holds the current chapter
const chapter = computed(() => {
    return course.chapters.find(
        (chapter) => chapter.slug === route.params.chapterSlug
    );
});

//Holds the current lesson
const lesson = computed(() => {
    return chapter.value.lessons.find(
        (lesson) => lesson.slug === route.params.lessonSlug
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
const progress = useLocalStorage('progress', []);

//Checks if there is an array for chapter and lesson. 
//If not returns false for uncompleted. If it is completed returns value.
const isLessonComplete = computed(() => {
  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }
  if (
    !progress.value[chapter.value.number - 1][
      lesson.value.number - 1
    ]
  ) {
    return false;
  }
  return progress.value[chapter.value.number - 1][
    lesson.value.number - 1
  ];
});

//Allows the button to toggle between complete and incomplete
const toggleComplete = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }
  progress.value[chapter.value.number - 1][
    lesson.value.number - 1
  ] = !isLessonComplete.value;
};
</script>