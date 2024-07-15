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

export type LessonOutline = {
  title: string;
  slug: string;
  number: number;
  path: string;
};

export type ChapterOutline = {
  title: string;
  slug: string;
  number: number;
  lessons: LessonOutline[];
};

export type CourseOutline = {
  title: string;
  chapters: ChapterOutline[];
};
