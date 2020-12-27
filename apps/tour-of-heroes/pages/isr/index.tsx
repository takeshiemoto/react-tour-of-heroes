import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero } from '../../types';
import fetch from 'node-fetch';
import { API_URL } from '../../environments';
import Link from 'next/link';

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
    /**
     * Next.jsはページの再生成を試みます
     * ページへのリクエストが来た時、最大で1秒に1度
     */
    revalidate: 1,
  };
};
