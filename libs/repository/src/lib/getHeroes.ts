import fetch from 'node-fetch';
import { API_URL } from '@toh/environment';
import { ApiResponseType, Hero } from '@toh/type';

export const getHeroes = async (): Promise<ApiResponseType<Hero[]>> => {
  try {
    const heroes = await fetch(`${API_URL}/api/v1/heroes`)
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
