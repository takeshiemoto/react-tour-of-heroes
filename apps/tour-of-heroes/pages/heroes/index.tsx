import React from 'react';
import Link from 'next/link';
import fetch from 'node-fetch';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero, PageProps } from '../../types';
import { API_URL } from '../../environments';

type HeroesPageProps = {
  heroes: Hero[];
};

const Heroes = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { heroes } = data;
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

export const getStaticProps: GetStaticProps<PageProps<
  HeroesPageProps
>> = async () => {
  const heroes = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[]);
  return {
    props: {
      data: {
        heroes,
      },
    },
  };
};
