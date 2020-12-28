import { ApiResponseType, Hero } from '@toh/type';
import { Fetch } from '@toh/infra';

export const getHeroes = async (): Promise<ApiResponseType<Hero[]>> => {
  try {
    const heroes = await Fetch(`/api/v1/heroes`)
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
