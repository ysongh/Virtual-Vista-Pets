"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  const router = useRouter();
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (address) {
      router.push("/pet/profile");
    }
  }, [address]);

  return (
    <div className="w-full min-h-screen bg-blue-600">
      <Header/>

      <main className="container mx-auto p-6 text-white">
        <section id="hero" className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">Capture the Magic of Digital Companions</h2>
          <p className="text-xl mb-8">Raise, train, and photograph your unique blockchain pets in stunning virtual landscapes!</p>
          <center>
            <w3m-button />
          </center>
        </section>

        <section id="about" className="py-20">
          <h2 className="text-3xl font-bold mb-6">About Virtual Vista Pets</h2>
          <p className="text-lg mb-4">Virtual Vista Pets is an innovative on-chain game that combines the joy of raising virtual pets with the excitement of blockchain technology and photography.</p>
          <p className="text-lg">Create unique pets, train them in stunning digital vistas, and capture their growth through beautiful snapshots - all secured on the blockchain!</p>
        </section>

        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Unique, blockchain-verified pets</li>
            <li>Stunning virtual landscapes to explore</li>
            <li>In-game photography feature</li>
            <li>Train and evolve your pets</li>
            <li>Trade pets and photos as NFTs</li>
            <li>Engage in pet battles and competitions</li>
          </ul>
        </section>

        <section id="signup" className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Virtual Vista Pets Community</h2>
          <form className="max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="w-full p-2 mb-4 rounded text-purple-900" required />
            <button type="submit" className="bg-yellow-400 text-purple-900 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-300">
              Sign Up for Updates
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
