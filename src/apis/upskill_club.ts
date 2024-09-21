import { ApiCall } from '../common';
import { UPSKILL_CLUB_SERVER_URL } from './constants';

const UpskillClubApi = {
  getCategories: async <T>() => {
    return await ApiCall.doGet<T>(`${UPSKILL_CLUB_SERVER_URL}/category/`);
  },

  getCourses: async <T>(params: { searchItem?: string; category?: number }) => {
    const { searchItem, category } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/course`);

    if (searchItem) {
      url.searchParams.append('search', searchItem);
    }
    if (category) {
      url.searchParams.append('category', String(category));
    }

    return await ApiCall.doGet<T>(url);
  },

  getCourseById: async (params: { courseId: string }) => {
    const { courseId } = params;

    return await ApiCall.doGet(`${UPSKILL_CLUB_SERVER_URL}/course/${courseId}`);
  },

  getSessions: async <T>(params: { offset?: number; courseId?: string; page?: number }) => {
    const { offset, courseId, page } = params;

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

    return await ApiCall.doGet<T>(url);
  },

  getConcept: async (params: { sessionId: string }) => {
    const { sessionId } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/concept`);
    url.searchParams.append('session', String(sessionId));

    return await ApiCall.doGet(url);
  },
};

export { UpskillClubApi };
