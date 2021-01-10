import { Fetch } from '@toh/infra';
import { API_PATHS } from '@toh/repository';

export const addHero = async (name: string): Promise<void> => {
  try {
    await Fetch(`${API_PATHS.HEROES}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
  }
};
