'use client';

import { useEffect, useState } from 'react';
import PageSpinner from '../components/pageSpinner';
import Head from 'next/head';
import Button from '../components/button';
import { raffleAbi, raffleContractAddresses } from '../lib/constants';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { useNotification } from '@web3uikit/core';
import { ContractTransactionResponse, ethers } from 'ethers';
import { Bell } from '@web3uikit/icons';
import NumberInput from '../components/numberInput';

const contractAddresses: Record<string, string[]> = raffleContractAddresses;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex || '0');
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [entranceFee, setEntranceFee] = useState('0');
  const [numPlayers, setNumPlayers] = useState('0');
  const [recentWinner, setRecentWinner] = useState('0');

  const dispatch = useNotification();

  async function updateUI() {
    const entranceFeeFromCall = ((await getEntranceFee()) as Number).toString();
    const numPlayersFromCall = (
      (await getNumberOfPlayers()) as Number
    ).toString();
    const recentWinnerFromCall = (await getRecentWinner()) as string;
    setEntranceFee(entranceFeeFromCall);
    setNumPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  const handleSuccess = async (tx: ContractTransactionResponse) => {
    try {
      await tx.wait(1);
      dispatch({
        type: 'info',
        message: 'Transaction Complete!',
        title: 'Transaction Notification',
        position: 'topR',
        icon: <Bell />,
      });
      await updateUI();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: raffleAbi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: raffleAbi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: 'getEntranceFee',
    params: {},
  });

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: raffleAbi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: 'getNumberOfPlayers',
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: raffleAbi,
    contractAddress: raffleAddress!, // specify the networkId
    functionName: 'getRecentWinner',
    params: {},
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="../favicon.ico" />
      </Head>
      {loading && <PageSpinner />}
      {raffleAddress ? (
        <div>
          <div className="flex gap-5">
            <Button onClick={async () => {
              setLoading(true);
              await enterRaffle({
                onSuccess: (tx) => handleSuccess(tx as ContractTransactionResponse),
              });
            }}>Enter Raffle</Button>
          </div>
          <div className='flex flex-col gap-1 mt-5'>
            <div>
              Entrance Fee: <strong>{ethers.formatUnits(entranceFee, 'ether')} ETH</strong>
            </div>
            <div>Number Of Players: <strong>{numPlayers}</strong> </div>
            <div> Recent Winner: <strong>{recentWinner}</strong> </div>
          </div>
        </div>
      ) : (
        <div>No Raffle Address Detected</div>
      )}
    </div>
  );
}
