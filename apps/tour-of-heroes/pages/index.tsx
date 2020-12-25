import React from 'react';

import { API_URL, APP_NAME } from '../environments';
import useSWR from 'swr';
import { Hero } from '../types';

export function Index() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: heroes, error } = useSWR<Hero[]>(
    `${API_URL}/api/v1/heroes`,
    fetcher
  );

  return (
    <>
      <h1>{APP_NAME}</h1>
      <h2>Dashboard</h2>
      <p>Client Side Rendering</p>
      {error && <div>Fetch data error</div>}
      {heroes && (
        <ul>
          {heroes.map((h) => (
            <li key={h.id}>
              ID: {h.id} Name: {h.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Index;
