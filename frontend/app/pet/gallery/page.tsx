"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { useContracts } from "@/utils/useContracts";
import Loader from '@/app/components/loader';

export default function PetPhotoGallery() {
  const { getPet, getPetPhotos } = useContracts();
  const { address } = useWeb3ModalAccount();
  const router = useRouter();

  const [pet, setPet] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (address) fetchPet();
  }, [address]);

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
      level: 5,
      experience: 75,
    });
    fetchPetPhotos(pet[0]);
  }

  const fetchPetPhotos = async (id) => {
    const photos = await getPetPhotos(id);
    setPhotos(photos);
  }

  // useEffect(() => {
  //   if (id) {
      
  //     setPhotos([
  //       { id: '1', url: '/api/placeholder/400/300', caption: 'Fluffy playing in the garden' },
  //       { id: '2', url: '/api/placeholder/400/300', caption: 'Fluffy\'s first birthday' },
  //       { id: '3', url: '/api/placeholder/400/300', caption: 'Fluffy napping in the sun' },
  //       { id: '4', url: '/api/placeholder/400/300', caption: 'Fluffy with a new toy' },
  //       { id: '5', url: '/api/placeholder/400/300', caption: 'Fluffy exploring the virtual park' },
  //       { id: '6', url: '/api/placeholder/400/300', caption: 'Fluffy making new friends' },
  //     ]);
  //   }
  // }, [id]);

  if (!pet) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-600 text-white font-sans">
      <Head>
        <title>{pet.name}'s Photo Gallery - Virtual Vista Pets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto p-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Virtual Vista Pets</h1>
          <Link href={`/pet/profile`} className="hover:text-yellow-300">
            Back to {pet.name}'s Profile
          </Link>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-4xl font-bold mb-8 text-center">{pet.name}'s Photo Gallery</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={photo} alt={"photo.caption"} className="w-full h-64 object-cover" />
              <div className="p-4">
                <p className="text-gray-800 text-sm">{"photo.caption"}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-yellow-400 text-purple-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-300" onClick={() => router.push(`/pet/upload-photo/${pet?.id}`)}>
            Add New Photo
          </button>
        </div>
      </main>

      <footer className="bg-purple-900 text-center p-6 mt-8">
        <p>&copy; 2024 Virtual Vista Pets. All rights reserved.</p>
      </footer>
    </div>
  );
}