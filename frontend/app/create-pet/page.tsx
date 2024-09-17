"use client";

import { useState, useRef } from 'react';
import lighthouse from "@lighthouse-web3/sdk";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function CreatePet() {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('cat');
  const [petPersonality, setPetPersonality] = useState('');
  const [petPhoto, setPetPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    const apiKey = `${process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY}`;

    const dealParams = {
        num_copies: 2, // Number of backup copies
        repair_threshold: 28800, // When a storage sector is considered broken
        renew_threshold: 240, // When your storage deal should be renewed
        miner: ["t017840"], // Preferred miners
        network: "calibration", // Network choice
        deal_duration: 1756643958, // Deal duration in Epoch, you can use : https://www.epochconverter.com/
    };

    const uploadResponse = await lighthouse.upload(e.target.files, apiKey, dealParams);

    if (uploadResponse) {
        console.log(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
        setPhotoURL(`https://gateway.lighthouse.storage/ipfs/${uploadResponse.data.Hash}`);
    }

    if (file && file.type.substr(0, 5) === "image") {
      setPetPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPetPhoto(null);
      setPreviewUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend or blockchain
    console.log({ petName, petType, petColor, petPersonality, petPhoto });
    alert('Pet created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-600 text-white font-sans">
      <Header />

      <main className="container mx-auto p-6 pt-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Create Your Pet</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="petName" className="block text-gray-700 font-bold mb-2">Pet Name</label>
            <input
              type="text"
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="petType" className="block text-gray-700 font-bold mb-2">Pet Type</label>
            <select
              id="petType"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            >
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="rabbit">Rabbit</option>
              <option value="dragon">Dragon</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="petPersonality" className="block text-gray-700 font-bold mb-2">Pet Personality</label>
            <textarea
              id="petPersonality"
              value={petPersonality}
              onChange={(e) => setPetPersonality(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="petPhoto" className="block text-gray-700 font-bold mb-2">Pet Photo</label>
            <input
              type="file"
              id="petPhoto"
              onChange={handlePhotoChange}
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600"
            >
              Upload Photo
            </button>
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Pet Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <p className='text-black'>{photoURL}</p>
          
          <button type="submit" className="w-full bg-yellow-400 text-purple-900 py-2 px-4 rounded-full font-bold hover:bg-yellow-300">
            Create Pet
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}