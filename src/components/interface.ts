export type Course = {
  title: string;
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
