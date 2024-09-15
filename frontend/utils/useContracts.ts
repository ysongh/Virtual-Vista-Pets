import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";

import PetNFTABI from "../artifacts/contracts/pets/PetNFT.sol/PetNFT.json";
import CoinABI from "../artifacts/contracts/memecoin/CryptoCat.sol/CryptoCat.json";

const PET_NFT_ADDRESS = "";
const COIN_ADDRESS = "0x1c0a5ee0d55250921eD9500a758D1b9fdE06F9FD";

export const useContracts = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const initializeEthers = async () => {
    const ethersProvider = new BrowserProvider(walletProvider as any)
    const signer = await ethersProvider.getSigner()
    return { ethersProvider, signer };
  };

  const getPetNFTContract = async () => {
    const { signer } = await initializeEthers();
    return new Contract(PET_NFT_ADDRESS, PetNFTABI.abi, signer);
  };

  const getCoinContract = async () => {
    const { signer } = await initializeEthers();
    return new Contract(COIN_ADDRESS, CoinABI.abi, signer);
  };

  const getCoinBalance = async () => {
    const contract = await getCoinContract();
    const CoinBalance = await contract.balanceOf(address);
    console.log(CoinBalance);
    return CoinBalance;
  }

  return { getCoinBalance };
}