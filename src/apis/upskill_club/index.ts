import { ApiCall } from '../../common';
import { UPSKILL_CLUB_SERVER_URL } from './constants';
import {
  GetAuthorByIdResponse,
  GetCategoriesResponse,
  GetConceptsResponse,
  GetCourseResponse,
  GetCoursesResponse,
  GetSessionsResponse,
} from './interface';

const UpskillClubApi = {
  getCategories: async () => {
    return await ApiCall.doGet<GetCategoriesResponse>(`${UPSKILL_CLUB_SERVER_URL}/category/`);
  },

  getCourses: async (params: { searchItem?: string; category?: number }) => {
    const { searchItem, category } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/course`);

    if (searchItem) {
      url.searchParams.append('search', searchItem);
    }
    if (category) {
      url.searchParams.append('category', String(category));
    }

    return await ApiCall.doGet<GetCoursesResponse>(url);
  },

  getCourseById: async (params: { courseId: string }) => {
    const { courseId } = params;

    return await ApiCall.doGet<GetCourseResponse>(`${UPSKILL_CLUB_SERVER_URL}/course/${courseId}`);
  },

  getSessions: async (params: {
    offset?: number;
    courseId?: string;
    page?: number;
    authorId?: string;
    order?: string;
  }) => {
    const { offset, courseId, page, authorId, order } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/session`);

    if (typeof offset === 'number') {
      url.searchParams.append('offset', String(offset));
    }
    if (courseId) {
      url.searchParams.append('course', courseId);
    }
    if (typeof page === 'number') {
      url.searchParams.append('page', String(page));
    }
    if (authorId) {
      url.searchParams.append('author', String(authorId));
    }
    if (order && order === 'desc') {
      url.searchParams.append('ordering', '-created_at');
    }

    return await ApiCall.doGet<GetSessionsResponse>(url);
  },

  getConceptsBySessionId: async (params: { sessionId: string }) => {
    const { sessionId } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/concept`);
    url.searchParams.append('session', String(sessionId));

    return await ApiCall.doGet<GetConceptsResponse>(url);
  },

  getAuthorById: async (params: { authorId: string }) => {
    const { authorId } = params;

    return await ApiCall.doGet<GetAuthorByIdResponse>(`${UPSKILL_CLUB_SERVER_URL}/author/${authorId}`);
  },
};

export { UpskillClubApi };
