import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import type { CourseProgress } from '~/types/course';
import {
  ref as fbRef,
  get,
  onValue,
  set,
  update,
} from 'firebase/database';
import { ref } from 'vue';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    const { $db, $auth } = useNuxtApp();
    // Initialize progress from local storage
    const progress = ref<CourseProgress>({});
    const initialized = ref(false);

    async function initialize() {
      // If the course has already been initialized, return
      console.log('initialized value: ', initialized.value);
      if (initialized.value) return;
      initialized.value = true;

      let idToken = await $auth?.currentUser?.getIdToken();

      const { number: userProgress } = await usePugFetch(
        '/api/user/progress',
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      // Update progress value
      if (userProgress?.value) {
        progress.value = userProgress.value;
      }
      console.log(
        '🚀 ~ initialize ~ progress:',
        JSON.stringify(progress),
        ' : ',
        JSON.stringify(userProgress)
      );
      console.log('userProgress: ', userProgress);
    }
    const percentageCompleted = computed(() => {
      const chapters = Object.values(progress.value).map(
        (chapter) => {
          const lessons = Object.values(chapter);
          const completedLessons = lessons.filter(
            (lesson) => lesson
          );
          return Number(
            (completedLessons.length / lessons.length) * 100
          ).toFixed(0);
        },
        []
      );

      const totalLessons = Object.values(
        progress.value
      ).reduce((number, chapter) => {
        return number + Object.values(chapter).length;
      }, 0);

      const totalCompletedLessons = Object.values(
        progress.value
      ).reduce((number, chapter) => {
        return (
          number +
          Object.values(chapter).filter((lesson) => lesson)
            .length
        );
      }, 0);

      const course = Number(
        (totalCompletedLessons / totalLessons) * 100
      ).toFixed(0);

      return {
        chapters,
        course,
      };
    });

    // Toggle the progress of a lesson based on chapter slug and lesson slug
    const toggleComplete = async (
      chapter: string,
      lesson: string
    ) => {
      // ************** [NEED TO DO THIS] If there's no user we can't update the progress ********************
      const auth = getAuth();
      const user = auth.currentUser;
      // console.log('🚀 ~ user:', user);

      if (user?.email === 'undefined') return;
      console.log(
        'cP: should be checking for user',
        user?.email
      );

      if (!chapter || !lesson) {
        // Grab chapter and lesson slugs from the route if they're not provided
        const {
          params: { chapterSlug, lessonSlug },
        } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      // Get the current progress for the lesson
      const currentProgress =
        progress.value[chapter]?.[lesson];

      console.log(
        'currentProgress for this lesson: ',
        currentProgress
      );

      // Optimistically update the progress value in the UI
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: !currentProgress,
      };

      // Update the progress in the DB
      try {
        const lessonRef = fbRef(
          $db,
          'users/' +
            user?.uid +
            '/lessonProgress/' +
            chapter +
            '/' +
            lesson
        );
        // console.log('lessonRef: ', lessonRef);
        set(lessonRef, {
          completed: currentProgress || false,
        });
        // await get(lessonRef).then((snapshot) => {
        //   console.log(
        //     'current lesson complete value: ',
        //     snapshot.val()
        //   );
        // });
      } catch (error) {
        console.error(error);

        // If the request failed, revert the progress value
      }
    };

    return {
      initialize,
      progress,
      toggleComplete,
      percentageCompleted,
    };
  }
);
