import React from 'react';

import { API_URL } from '../environments';
import useSWR from 'swr';
import { Hero } from '@tour-of-heroes-workspace/type';

export function Index() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: heroes, error } = useSWR<Hero[]>(
    `${API_URL}/api/v1/heroes`,
    fetcher
  );

  return (
    <>
      <h1>Client Side Rendering</h1>
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
