'use client';

import { useEffect, useState } from 'react';
import { findEthereumExists } from './lib/walletService';
import { Button } from '@mui/material';

export default function Home() {
  const [ethereumExists, setEthereumExists] = useState('loading');

  useEffect(() => {
    const isWalletExists = findEthereumExists();
    console.log('isWalletExists', isWalletExists);
    if (isWalletExists) {
      setEthereumExists('exists');
    } else {
      setEthereumExists('notExists');
    }
  }, []);
  return (
    <div>
      {ethereumExists === 'exists' && (
        <div>
          <Button variant="contained" color="primary">
            Connect Fund Me Contract
          </Button>
        </div>
      )}
    </div>
  );
}
