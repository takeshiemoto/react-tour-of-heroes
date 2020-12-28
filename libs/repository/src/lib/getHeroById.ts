import { ApiResponseType, Hero } from '@toh/type';
import { Fetch } from '@toh/infra';

export const getHeroById = async (
  id: string
): Promise<ApiResponseType<Hero>> => {
  try {
    const hero = await Fetch(`/api/v1/heroes/${id}`)
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
