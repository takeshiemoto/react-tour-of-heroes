import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'node-fetch';
import { Hero } from '@toh/type';
import { API_URL } from '@toh/environment';

type HeroPageProps = {
  hero: Hero;
};

const HeroPage = ({ hero }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  // ビルド時にはpaths指定されたページのみ生成する
  const paths = await fetch(`${API_URL}/api/v1/heroes`)
    .then((res) => res.json())
    .then((res) => res as Hero[])
    .then((heroes) => heroes.map((hero) => `/heroes/${hero.id}`));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<HeroPageProps> = async ({
  params,
}) => {
  const hero = await fetch(`${API_URL}/api/v1/heroes/${params.id}`)
    .then((res) => res.json())
    .then((res) => res as Hero);

  return {
    props: { hero },
  };
};
