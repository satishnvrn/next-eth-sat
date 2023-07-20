'use client';

import { useState } from 'react';
import Button from './components/button';
import NumberInput from './components/numberInput';
import PageSpinner from './components/pageSpinner';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { fundMeAbi, fundMeContractAddresses } from './lib/constants';
import { ethers } from 'ethers';

const supportedChains = ['31337', '11155111'];
const contractAddresses: Record<string, string[]> = fundMeContractAddresses;

export default function Home() {
  const [ethAmount, setEthAmount] = useState('0');
  const [loading, setLoading] = useState(false);
  const { isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex || '0');

  const {
    runContractFunction: fundMe,
    data: fundMeResponse,
    isLoading: fundMeLoading,
    isFetching: fundMeFetching
  } = useWeb3Contract({
    abi: fundMeAbi,
    contractAddress: '0x93A30F9AaD5Be789A868383280345F44629C3Bae',
    functionName: 'fund',
    msgValue: ethers.parseEther(ethAmount).toString(),
    params: {}
  });
  console.log('fundMe', fundMeResponse, fundMeLoading, fundMeFetching);

  const {
    runContractFunction: withdraw,
    data: withdrawResponse,
    isLoading: withdrawLoading,
    isFetching: withdrawFetching
  } = useWeb3Contract({
    abi: fundMeAbi,
    contractAddress: '0x93A30F9AaD5Be789A868383280345F44629C3Bae',
    functionName: 'withdraw',
    msgValue: ethers.parseEther(ethAmount).toString(),
    params: {}
  });
  console.log('withdraw', withdrawResponse, withdrawLoading, withdrawFetching);

  const handleFundMe = async () => {
    await fundMe();
  };

  const handleWithdraw = async () => {
    await withdraw();
  };

  return (
    <div>
      {loading && <PageSpinner />}
      {isWeb3Enabled && supportedChains.includes(chainId.toString()) && (
        <div>
          <div className="flex flex-row justify-around">
            <div className="mt-5">
              <Button
                onClick={async () => {
                  console.log('getting balance ...');
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
          </div>
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
