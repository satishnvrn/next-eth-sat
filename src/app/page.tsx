'use client';

import { useState } from 'react';
import Button from './components/button';
import NumberInput from './components/numberInput';
import PageSpinner from './components/pageSpinner';
import { useMoralis, useWeb3Contract, useTokenPrice } from 'react-moralis';
import { fundMeAbi, fundMeContractAddresses } from './lib/constants';
import { ContractTransactionResponse, ethers } from 'ethers';
import { useNotification } from '@web3uikit/core';
import { Bell } from '@web3uikit/icons';

const supportedChains = ['31337', '11155111'];
const contractAddresses: Record<string, string[]> = fundMeContractAddresses;

export default function Home() {
  const [ethAmount, setEthAmount] = useState('0');
  const [loading, setLoading] = useState(false);
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex || '0');
  const dispatch = useNotification();

  const { runContractFunction: fundMe } = useWeb3Contract(
    {
      abi: fundMeAbi,
      contractAddress: contractAddresses?.[chainId]?.[0] || '',
      functionName: 'fund',
      msgValue: ethers.parseEther(ethAmount).toString(),
      params: {},
    },
  );

  const { runContractFunction: withdraw } =
    useWeb3Contract({
      abi: fundMeAbi,
      contractAddress: contractAddresses?.[chainId]?.[0] || '',
      functionName: 'withdraw',
      msgValue: ethers.parseEther(ethAmount).toString(),
      params: {},
    });

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
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const handleFundMe = async () => {
    setLoading(true);
    await fundMe({
      // @ts-ignore
      onSuccess: handleSuccess,
      onError: (error) => {
        console.log(error);
        setLoading(false);
      },
    });
  };

  const handleWithdraw = async () => {
    setLoading(true);
    await withdraw({
      // @ts-ignore
      onSuccess: handleSuccess,
      onError: (error) => {
        console.log(error);
        setLoading(false);
      },
    });
  };

  return (
    <div>
      {loading && <PageSpinner />}
      {isWeb3Enabled && supportedChains.includes(chainId.toString()) && (
        <div>
          {/* <div className="flex flex-row justify-around">
            <div className="mt-5">
              <Button
                onClick={async () => {
                  console.log('getting balance ...');
                  await fetchTokenPrice({
                    params: {
                      address: '0x93A30F9AaD5Be789A868383280345F44629C3Bae',
                      chain: 'eth',
                    },
                  });
                }}
              >
                Get Balance
              </Button>
              <div>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                  0
                </div>
              </div>
            </div>
          </div> */}
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
        </div>
      )}
    </div>
  );
}
