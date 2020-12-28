import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Hero } from '@toh/type';
import { getHeroById } from '@toh/repository';

type ISRHeroPageProps = {
  hero?: Hero;
  error?: string;
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
    return <div>Generating...</div>;
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
  if (typeof id !== 'string') return;
  const { data, error } = await getHeroById(id);

  return {
    props: !error ? { hero: data } : { error },
    revalidate: 120,
  };
};
