import type { Lesson } from '@prisma/client';
import { getDatabase, ref } from 'firebase/database';
const dbRef = ref(getDatabase());

export type LessonWithPath = Lesson & {
  path: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
