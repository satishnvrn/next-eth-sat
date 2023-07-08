'use client';

import { useEffect, useState } from 'react';
import {
  connectFundMe,
  findEthereumExists,
  fund,
  getBalance,
  withdraw,
} from './lib/walletService';
import Button from './components/button';
import NumberInput from './components/numberInput';
import PageSpinner from './components/pageSpinner';

export default function Home() {
  const [ethereumExists, setEthereumExists] = useState('loading');
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [balanceETH, setBalanceETH] = useState('');
  const [ethAmount, setEthAmount] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleGetBalance = async () => {
    setLoading(true);
    const balance = await getBalance(connectedAccounts[0]);
    setBalanceETH(balance);
    setLoading(false);
  };

  const handleFundMe = async () => {
    setLoading(true);
    await fund(ethAmount);
    await handleGetBalance();
  };

  const handleWithdraw = async () => {
    setLoading(true);
    await withdraw();
    await handleGetBalance();
  };

  useEffect(() => {
    const isWalletExists = findEthereumExists();
    if (isWalletExists) {
      setEthereumExists('exists');
    } else {
      setEthereumExists('notExists');
    }
  }, []);
  return (
    <div>
      {loading && <PageSpinner />}
      {ethereumExists === 'exists' && (
        <div>
          <div className="flex flex-row justify-around">
            <div>
              <Button
                onClick={async () => {
                  const accounts = await connectFundMe();
                  setConnectedAccounts(accounts);
                }}
                disabled={connectedAccounts.length > 0}
              >
                {connectedAccounts.length > 0
                  ? 'Connected'
                  : 'Connect Fund Me Contract'}
              </Button>
              <div className="mt-2.5">
                {connectedAccounts.map((acc) => (
                  <div
                    className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
                    key={acc}
                  >
                    {acc}
                  </div>
                ))}
              </div>
            </div>
            <div>
              {connectedAccounts.length > 0 && (
                <div className="mt-5">
                  <Button onClick={handleGetBalance}>Get Balance</Button>
                  <div>
                    <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                      {balanceETH}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {connectedAccounts.length > 0 && (
            <div className="flex gap-5">
              <NumberInput
                label="ETH Amount"
                value={ethAmount}
                onChange={(event) => {
                  setEthAmount(event.target.value);
                }}
                placeholder="0.1"
              />
              <Button onClick={handleFundMe}>Fund</Button>
              <Button onClick={handleWithdraw} classes="ml-auto">
                Withdraw
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
