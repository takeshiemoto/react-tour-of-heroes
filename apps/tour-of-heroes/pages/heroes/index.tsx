import React from 'react';
import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero } from '@toh/type';
import { getHeroes } from '@toh/repository';

type HeroesPageProps = {
  heroes?: Hero[];
  error?: string;
};

const Heroes = ({
  heroes,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Static Generation</h1>
      <ul>
        {heroes
          ? heroes.map((hero) => (
              <li key={hero.id}>
                <Link href={`heroes/${hero.id}`}>
                  <a>{hero.name}</a>
                </Link>
              </li>
            ))
          : JSON.stringify(error)}
      </ul>
    </>
  );
};

export default Heroes;

export const getStaticProps: GetStaticProps<HeroesPageProps> = async () => {
  const { data, error } = await getHeroes();
  return {
    props: !error ? { heroes: data } : { error },
  };
};
