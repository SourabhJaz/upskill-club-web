import { Author, Concept, Course, Session, Category } from '../../entities/interface';

export type GetCategoriesResponse = {
  results: Category[];
};

export type GetCourseResponse =
  | Course
  | {
      detail: 'No Course matches the given query.';
    };

export type GetCoursesResponse = {
  results: Course[];
};

export type GetSessionsResponse = {
  count: number;
  results: Session[];
};

export type GetConceptsResponse = {
  results: Concept[];
};

export type GetAuthorByIdResponse =
  | Author
  | {
      detail: 'No Author matches the given query.';
    };
