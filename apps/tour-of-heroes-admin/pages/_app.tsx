import React from 'react';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import Link from 'next/link';
import Head from 'next/head';
import './styles.css';
import { ADMIN_ROUTE } from '@toh/const';

function CustomApp({ Component, pageProps }: AppProps) {
  const routes = Object.values(ADMIN_ROUTE);
  return (
    <>
      <Head>
        <title>Tour Of Heroes ADMIN</title>
      </Head>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div className="app">
          <ul>
            {routes.map((route) => (
              <li key={route.name}>
                <Link href={route.path}>
                  <a>{route.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </SWRConfig>
    </>
  );
}

export default CustomApp;
