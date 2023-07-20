'use client';

import { useEffect, useState } from 'react';
import PageSpinner from '../components/pageSpinner';
import Head from 'next/head';
import Button from '../components/button';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [ethereumExists, setEthereumExists] = useState('loading');
  const [connectedAccounts, setConnectedAccounts] = useState([]);

  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="../favicon.ico" />
      </Head>
      {loading && <PageSpinner />}
    </div>
  );
}
