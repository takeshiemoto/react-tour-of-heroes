import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { Navigation } from '../components/Navigation';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to tour-of-heroes!</title>
      </Head>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
