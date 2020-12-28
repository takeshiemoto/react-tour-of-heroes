import { ApiResponseType, Hero } from '@toh/type';
import { Fetch } from '@toh/infra';
import { API_PATHS } from './paths';

export const getHeroById = async (
  id: string
): Promise<ApiResponseType<Hero>> => {
  try {
    const hero = await Fetch(`${API_PATHS.Heroes}${id}`)
      .then((res) => res.json())
      .then((res) => res as Hero);
    return {
      data: hero,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: e.toString(),
    };
  }
};
