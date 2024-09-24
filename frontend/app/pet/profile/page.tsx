"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Loader from '@/app/components/loader';

import { useContracts } from "@/utils/useContracts";

export default function PetProfile() {
  const { getPet } = useContracts();
  const { address } = useWeb3ModalAccount();
  const router = useRouter();

  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (address) fetchPet();
  }, [address]);

  useEffect(() => {
    if (!pet?.name && !address) {
      router.push("/create-pet");
    }
  }, [pet]);

  const fetchPet = async () => {
    const pet = await getPet();
    console.log(pet);
    setPet({
      id: pet[0],
      name: pet[1],
      type: 'cat',
      color: '#FFA500',
      personality: 'Playful and curious',
      photoUrl: pet[2],
      happiness:  pet[3],
      level: 5,
      experience: 75,
    });
  }

  if (!pet) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-600 text-white font-sans">
      <Header />

      <main className="container mx-auto p-6 pt-32">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="w-full object-cover md:w-48" src={pet.photoUrl} alt={pet.name} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{pet.type}</div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{pet.name}</h2>
              <p className="mt-2 text-gray-500">Happiness: {pet.happiness.toString()}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${pet.happiness.toString()}%`}}></div>
              </div>
              <p className="mt-2 text-gray-500">Personality: {pet.personality}</p>
              <div className="mt-4 flex items-center">
                <span className="mr-2 text-gray-500">Color:</span>
                <div className="w-6 h-6 rounded-full" style={{backgroundColor: pet.color}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/pet/gallery" className="bg-yellow-400 text-purple-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-300">
            View Gallery
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}