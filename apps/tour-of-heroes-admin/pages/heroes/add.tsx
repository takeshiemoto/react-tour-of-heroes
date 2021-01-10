import React from 'react';
import { ADMIN_ROUTE } from '@toh/const';
import useSWR, { mutate } from 'swr';
import { API_URL } from '@toh/environment';
import { API_PATHS } from '@toh/repository';
import { Hero } from '@toh/type';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { addHero } from '../../../../libs/repository/src/lib/addHero';

type FormType = {
  name: string;
};

const AddPage = () => {
  const key = `${API_URL}${API_PATHS.HEROES}`;
  const { data: heroes } = useSWR<Hero[]>(key);

  const schema = object().shape({
    name: string().required(),
  });

  const { register, handleSubmit, reset } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    await addHero(data.name);
    // tell all SWRs with this key to revalidate
    await mutate(key);
    reset();
  };

  const onError = (error) => {
    console.log(error);
  };

  return (
    <>
      <h1>{ADMIN_ROUTE.DASHBOARD.name}</h1>
      <ul>{heroes && heroes.map((h) => <li key={h.id}>{h.name}</li>)}</ul>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input name={'name'} ref={register} />
        <button type={'submit'}>登録</button>
      </form>
    </>
  );
};

export default AddPage;
