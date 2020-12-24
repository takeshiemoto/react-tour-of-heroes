import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fetch from 'node-fetch';
import { API_URL } from '../../environments';
import { Hero } from '../../types';
import { useRouter } from 'next/router';
import Error from 'next/error';

type ISRHeroPageProps = {
  hero: Hero;
};

const ISRHeroPage = (
  params: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { isFallback } = useRouter();
  if (!isFallback && !params.hero) {
    return <Error statusCode={404} title={'Error'} />;
  }

  if (!params.hero) {
    return <div>Loading...</div>;
  }

  return (
    <p>
      Name is {params.hero.name} ID: {params.hero.id}
    </p>
  );
};

export default ISRHeroPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ISRHeroPageProps,
  { id: string }
> = async ({ params }) => {
  const { id } = params;

  try {
    const response = await fetch(`${API_URL}/api/v1/heroes/${id}`);
    const hero = await response.json().then((json) => json as Hero);

    return {
      props: {
        hero,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        hero: null,
      },
    };
  }
};
