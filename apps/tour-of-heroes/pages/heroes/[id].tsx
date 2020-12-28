import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Hero } from '@toh/type';
import { getHeroById, getHeroIds } from '@toh/repository';

type HeroPageProps = {
  hero?: Hero;
  error?: string;
};

const HeroPage = ({
  hero,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      {hero ? (
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
      ) : (
        JSON.stringify(error)
      )}
    </>
  );
};

export default HeroPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // ビルド時にはpaths指定されたページのみ生成する
  const { data: ids } = await getHeroIds();
  const paths = ids.map((id) => `/heroes/${id}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<HeroPageProps> = async ({
  params,
}) => {
  const { id } = params;
  if (typeof id !== 'string') return;
  const { data, error } = await getHeroById(id);

  return {
    props: !error ? { hero: data } : { error },
  };
};
