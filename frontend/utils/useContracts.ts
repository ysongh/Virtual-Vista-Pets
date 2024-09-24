import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";

import PetNFTABI from "../artifacts/contracts/pets/PetNFT.sol/PetNFT.json";
import CoinABI from "../artifacts/contracts/memecoin/CryptoCat.sol/CryptoCat.json";

const PET_NFT_ADDRESS = "0x541903108Ea08Caa5f385ae8c53aA744719D283F";
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

  const getPet = async () => {
    const contract = await getPetNFTContract();
    const Pet = await contract.getPet();
    console.log(Pet);
    return Pet;
  }

  const getPetPhotos = async (id) => {
    const contract = await getPetNFTContract();
    const Photos = await contract.getPhotoFromPet(id);
    console.log(Photos);
    return Photos;
  }

  const createAndMintPet = async (url, name) => {
    const contract = await getPetNFTContract();
    const createTX = await contract.createAndMintPet(
      address,
      url,
      name
    );
    await createTX.wait();
    return createTX;
  }

  const addPhotoForPet = async (url, caption) => {
    const contract = await getPetNFTContract();
    const createTX = await contract.addPhoto(url, caption);
    await createTX.wait();
    return createTX;
  }

  return { 
    getCoinBalance,
    getPet,
    getPetPhotos,
    createAndMintPet,
    addPhotoForPet
  };
}