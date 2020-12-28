import { ApiResponseType, Hero } from '@toh/type';
import { Fetch } from '@toh/infra';
import { API_PATHS } from './paths';

export const getHeroes = async (): Promise<ApiResponseType<Hero[]>> => {
  try {
    const heroes = await Fetch(`${API_PATHS.HEROES}`)
      .then((res) => res.json())
      .then((res) => res as Hero[]);
    return {
      data: heroes,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: e.toString(),
    };
  }
};
