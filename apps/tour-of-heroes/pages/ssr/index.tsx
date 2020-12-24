import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Hero } from '../../types';
import fetch from 'node-fetch';
import { API_URL } from '../../environments';

type SSRHeroesPageProps = {
  heroes: Hero[];
};

const SSRHeroes = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div>
      <h1>ServerSideRendering</h1>
      <ul>
        {props.heroes.map((h) => (
          <li key={h.id}>
            ID: {h.id} Name: {h.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SSRHeroes;

export const getServerSideProps: GetServerSideProps<SSRHeroesPageProps> = async () => {
  const heroes = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[]);
  return {
    props: {
      heroes,
    },
  };
};
