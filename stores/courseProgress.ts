import { getAuth } from 'firebase/auth';
import type { CourseProgress } from '~/types/course';
import { ref as fbRef, set } from 'firebase/database';
import { ref } from 'vue';
import _ from 'lodash';

export const useCourseProgress = defineStore('courseProgress', () => {
  const { $db, $auth } = useNuxtApp();
  // Initialize progress from local storage
  const progress = ref<CourseProgress>({});
  const initialized = ref(false);

  async function initialize() {
    // If the course has already been initialized, return
    if (initialized.value) return;
    initialized.value = true;

    let userId = await $auth.currentUser?.uid;

    const { data: userProgress } = await useFetch<CourseProgress>('http://localhost:8888/.netlify/functions/progress', {
      //@ts-ignore
      headers: { uid: userId },
    });

    try {
      userProgress.value = JSON.parse(userProgress.value as string);
    } catch {}
    let temp = {};
    // Update progress value
    if (userProgress?.value) {
      progress.value = userProgress.value;
    }
  }

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter);
      const completedLessons = _.filter(lessons, {
        completed: true,
      });
      return Number((completedLessons.length / lessons.length) * 100).toFixed(0);
    }, []);

    const totalLessons = Object.values(progress.value).reduce((number, chapter) => {
      return number + Object.values(chapter).length;
    }, 0);

    const totalCompletedLessons = Object.values(progress.value).reduce((number, chapter) => {
      const lessons = Object.values(chapter).filter((completed) => completed);
      const totalCompleted = _.filter(lessons, {
        completed: true,
      });
      number += totalCompleted.length;
      return number;
    }, 0);

    const course = Number((totalCompletedLessons / totalLessons) * 100).toFixed(0);

    return {
      chapters,
      course,
    };
  });

  // Toggle the progress of a lesson based on chapter slug and lesson slug
  const toggleComplete = async (chapter: string, lesson: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user?.email === 'undefined') return;

    if (!chapter || !lesson) {
      // Grab chapter and lesson slugs from the route if they're not provided
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      chapter = chapterSlug as string;
      lesson = lessonSlug as string;
    }

    // Get the current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson];

    let tmp = _.cloneDeep(progress.value);

    // @ts-ignore
    tmp[chapter][lesson]['completed'] = !currentProgress?.completed;
    progress.value = tmp;
    // Update the progress in the DB
    const completedRef = fbRef($db, 'users/' + user?.uid + '/lessonProgress/' + chapter + '/' + lesson + '/completed');
    //@ts-ignore
    set(completedRef, !currentProgress?.completed);
  };

  return {
    initialize,
    progress,
    toggleComplete,
    percentageCompleted,
  };
});
