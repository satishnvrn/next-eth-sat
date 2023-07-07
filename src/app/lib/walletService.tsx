import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
  Provider,
  ethers,
} from 'ethers';
import { abi, contractAddress } from './constants';

export const findEthereumExists = () => {
  if (window && window.ethereum !== 'undefined') {
    return true;
  }

  return false;
};

export const connectFundMe = async () => {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts;
  } catch (error) {
    console.log('error', error);
  }
};

export const getBalance = async (address: string) => {
  try {
    const providers = new ethers.BrowserProvider(window.ethereum);
    const balance = await providers.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.log('error', error);
    return '';
  }
};

export const withdraw = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transactionResponse = await contract.withdraw();
    await listenForTransactionMine(transactionResponse, provider);
  } catch (error) {
    console.log('error', error);
  }
};

export const fund = async (ethAmount) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const transactionResponse = await contract.fund({
      value: ethers.parseEther(ethAmount),
    });
    await listenForTransactionMine(transactionResponse, provider);
  } catch (error) {
    console.log('error', error);
  }
};

export const listenForTransactionMine = async (
  transactionResponse: ContractTransactionResponse,
  provider: Provider,
) => {
  return new Promise((resolve, reject) => {
    try {
      provider.once(
        transactionResponse.hash,
        (transactionReceipt: ContractTransactionReceipt) => {
          console.log(
            `Completed with ${transactionReceipt.confirmations} confirmations. `,
          );
          resolve(true);
        },
      );
    } catch (error) {
      console.log('listenForTransactionMine error', error);
      reject(error);
    }
  });
};
