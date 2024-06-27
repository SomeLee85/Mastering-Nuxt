export type LessonWithPath = {
  id: number;
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  chapterId: number;
  path: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
