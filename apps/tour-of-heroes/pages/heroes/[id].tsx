import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'node-fetch';
import { Hero, PageProps } from '../../types';
import { API_URL } from '../../environments';

type HeroPageProps = {
  hero: Hero;
};

const HeroPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { hero } = data;
  return (
    <>
      <dl>
        <dt>ID</dt>
        <dd>{hero.id}</dd>
        <dt>Name</dt>
        <dd>{hero.name}</dd>
        <dt>CreatedAt</dt>
        <dd>{hero.created_at}</dd>
        <dt>UpdateAt</dt>
        <dd>{hero.update_at}</dd>
      </dl>
    </>
  );
};

export default HeroPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO URLはENVから取得する
  const paths = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[])
    .then((heroes) => heroes.map((hero) => `/heroes/${hero.id}`));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps<HeroPageProps>,
  { id: string }
> = async ({ params }) => {
  const hero = await fetch(`${API_URL}/api/v1/heroes/${params.id}`)
    .then((res) => res.json())
    .then((res) => res as Hero);

  return {
    props: {
      data: {
        hero,
      },
    },
  };
};
