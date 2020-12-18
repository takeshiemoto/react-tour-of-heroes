import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'node-fetch';
import { Hero, PageProps } from '../../types';

import { HeroSelect } from '../../components/HeroSelect';

type HeroPageProps = {
  hero: Hero;
};

const HeroPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { hero } = data;
  return (
    <>
      <HeroSelect />
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
  const paths = await fetch('http://localhost:8080/api/v1/heroes')
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
  const hero = await fetch(`http://localhost:8080/api/v1/heroes/${params.id}`)
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
