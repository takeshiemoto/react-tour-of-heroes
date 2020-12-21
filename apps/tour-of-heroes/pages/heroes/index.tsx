import React from 'react';
import Link from 'next/link';
import fetch from 'node-fetch';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero, PageProps } from '../../types';

type HeroesPageProps = {
  heroes: Hero[];
};

const Heroes = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { heroes } = data;
  return (
    <>
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
  const heroes = await fetch('http://localhost:5000/api/v1/heroes')
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
