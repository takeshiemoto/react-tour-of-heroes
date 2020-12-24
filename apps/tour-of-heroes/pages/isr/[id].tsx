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
  if (!isFallback && !params?.hero) {
    return <Error statusCode={404} title={'Error'} />;
  }

  // ページがまだ生成されていない時はこれが表示される
  // 最初はgetStaticPropsの実行が終了するまで
  if (isFallback) {
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
  const response = await fetch(`${API_URL}/api/v1/heroes/${id}`);
  const hero = await response
    .json()
    .then((json) => json as Hero)
    .catch((err) => {
      console.error(err);
      return null;
    });

  return {
    props: {
      hero,
    },
    // リクエストが来たら
    // 最大で1秒間に1回再生成
    revalidate: 1,
  };
};
