import React from 'react';
import Link from 'next/link';
import fetch from 'node-fetch';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API_URL } from '../../environments';
import { Hero } from '@tour-of-heroes-workspace/type';

type HeroesPageProps = {
  heroes: Hero[];
};

const Heroes = ({ heroes }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Static Generation</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <Link href={`heroes/${hero.id}`}>
              <a>{hero.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Heroes;

export const getStaticProps: GetStaticProps<HeroesPageProps> = async () => {
  const heroes = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[]);
  return {
    props: { heroes },
  };
};
