export const findEthereumExists = () => {
  if (window && window.ethereum !== "undefined") {
    return true;
  }

  return false;
};