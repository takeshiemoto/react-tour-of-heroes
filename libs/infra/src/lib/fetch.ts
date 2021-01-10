import { API_URL } from '@toh/environment';

export const Fetch = (path: string, req?: RequestInit) => {
  return fetch(`${API_URL}${path}`, req);
};
