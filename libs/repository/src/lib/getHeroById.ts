import fetch from 'node-fetch';
import { ApiResponseType, Hero } from '@toh/type';
import { API_URL } from '@toh/environment';

export const getHeroById = async (
  id: string
): Promise<ApiResponseType<Hero>> => {
  try {
    const hero = await fetch(`${API_URL}/api/v1/heroes/${id}`)
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
