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
  image_url: string;
  title: string;
  outline: string;
  short_description: string;
  author: Author;
  category: UpskillCategory;
  created_at: string;
};

export type GetCourseResponse =
  | Course
  | {
      detail: 'No Course matches the given query.';
    };

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
  id: string;
  name: string;
  thumbnail?: string;
  linkedin_url?: string;
  outline: string;
  image_url?: string;
};

export type Article = {
  id: string;
  course: Course;
  title: string;
  image_url: string;
  outline: string;
  author: Author;
  created_at: string;
};

export type GetSessionsResponse = {
  count: number;
  results: Article[];
};

export type ParsedAuthor = {
  id: any;
  name: string;
  avatar: string;
};

export type ParsedArticle = {
  id: string;
  tag: string;
  title: string;
  imageUrl?: string;
  description: string;
  authors: ParsedAuthor[];
  createdAt: string;
};

export type Concept = {
  id: string;
  session: Article;
  title: string;
  image_url: string;
  description: string;
};

export type ParsedConcept = {
  id: string;
  title: string;
  image: string;
  description: string;
};

export type GetConceptResponse = {
  results: Concept[];
};

export type GetAuthorByIdResponse =
  | Author
  | {
      detail: 'No Author matches the given query.';
    };
