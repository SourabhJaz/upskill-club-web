import { ApiCall } from '../common';
import { UPSKILL_CLUB_SERVER_URL } from './constants';

const UpskillClub = {
  getCategories: async () => {
    return await ApiCall.doGet(`${UPSKILL_CLUB_SERVER_URL}/category/`);
  },

  getCourses: async (params: { searchItem: string; category: number }) => {
    const { searchItem, category } = params;

    const url = new URL(`${UPSKILL_CLUB_SERVER_URL}/course`);

    if (searchItem) {
      url.searchParams.append('search', searchItem);
    }
    if (category) {
      url.searchParams.append('category', String(category));
    }

    return await ApiCall.doGet(url);
  },
};

export { UpskillClub };
