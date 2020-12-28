import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'node-fetch';
import { API_URL } from '../../environments';
import Link from 'next/link';
import { Hero } from '@tour-of-heroes-workspace/type';

type ISRPageProps = {
  heroes: Hero[];
};

const ISRPage = ({
  heroes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Incremental Static Regeneration Page</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <Link href={`isr/${hero.id}`}>
              <a>{hero.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ISRPage;

export const getStaticProps: GetStaticProps<ISRPageProps> = async () => {
  const heroes = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[]);
  return {
    props: { heroes },
    // 10秒に1度最新のデータを取得する
    revalidate: 10,
  };
};
