export type UpskillCategory = {
  id: number;
  name: string;
};

export type GetUpskillCategoriesResponse = {
  results: UpskillCategory[];
};

export type Course = {
  id: string;
  name: string;
  image: string;
  title: string;
  outline: string;
  short_description: string;
  author: Author;
  category: UpskillCategory;
  created_at: string;
};

export type GetCourseResponse = Course;

export type ParsedCourse = {
  id: string;
  name: string;
  image: string;
  title: string;
  outline: string;
  authors: ParsedAuthor[];
  categoryName: string;
  createdAt: string;
};

export type GetCoursesResponse = {
  results: Course[];
};

export type Author = {
  name: string;
  thumbnail?: string;
};

export type Article = {
  id: string;
  course: Course;
  title: string;
  outline: string;
  author: Author;
  created_at: string;
};

export type GetSessionsResponse = {
  count: number;
  results: Article[];
};

export type ParsedAuthor = {
  name: string;
  avatar: string;
};

export type ParsedArticle = {
  id: string;
  tag: string;
  title: string;
  description: string;
  authors: ParsedAuthor[];
  createdAt: string;
};
