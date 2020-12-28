import fetch from 'node-fetch';
import { API_URL } from '@toh/environment';

export const Fetch = (path: string) => {
  return fetch(`${API_URL}${path}`);
};
