import { ApiResponseType, Hero } from '@toh/type';
import { Fetch } from '@toh/infra';
import { API_PATHS } from './paths';

export const getHeroIds = async (): Promise<ApiResponseType<number[]>> => {
  try {
    const heroIds = await Fetch(`${API_PATHS.Heroes}`)
      .then((res) => res.json())
      .then((res) => res as Hero[])
      .then((heroes) => heroes.map((hero) => hero.id));
    return {
      data: heroIds,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: e.toString(),
    };
  }
};
