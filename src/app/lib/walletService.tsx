import { ethers } from "ethers";

export const findEthereumExists = () => {
  if (window && window.ethereum !== "undefined") {
    return true;
  }

  return false;
};

export const connectFundMe = async () => {
  try {
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await ethereum.request({ method: "eth_accounts" })
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
}