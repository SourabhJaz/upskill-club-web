export type Category = {
  id: number;
  name: string;
  outline?: string;
  thumbnail?: string;
};

export type Author = {
  id: number;
  name: string;
  linkedin_url?: string;
  outline: string;
  image_url?: string;
};

export type ParsedAuthor = {
  id: number;
  name: string;
  avatar: string;
};

export type Course = {
  id: number;
  category: Category;
  title: string;
  outline: string;
  short_description: string;
  author: Author;
  image_url: string;
  created_at: string;
};

export type ParsedCourse = {
  id: number;
  image: string;
  title: string;
  outline: string;
  authors: ParsedAuthor[];
  categoryName: string;
  createdAt: string;
};

export type Session = {
  id: number;
  course: Course;
  title: string;
  outline: string;
  image_url: string;
  created_at: string;
  author: Author;
};

export type ParsedSession = {
  id: number;
  course: ParsedCourse;
  tag: string;
  title: string;
  imageUrl?: string;
  description: string;
  authors: ParsedAuthor[];
  createdAt: string;
};

export type Concept = {
  id: number;
  session: Session;
  title: string;
  image_url: string;
  description: string;
};

export type ParsedConcept = {
  id: number;
  title: string;
  image: string;
  description: string;
};
