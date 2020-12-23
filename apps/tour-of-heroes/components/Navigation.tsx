import React from 'react';

import Link from 'next/link';

export const Navigation = () => (
  <ul>
    <li>
      <Link href={'/'}>
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href={'/heroes'}>
        <a>Heroes</a>
      </Link>
    </li>
    <li>
      <Link href={'/isr'}>
        <a>ISR</a>
      </Link>
    </li>
  </ul>
);
