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
      router.push("/defi");
    }
  }, [address]);

  return (
    <div className="w-full min-h-screen bg-blue-600">
      <Header/>
      <div >
        <div
          className="relative w-full pt-48 pb-40 m-auto flex justify-center text-center flex-col items-center z-1 text-white"
          style={{ maxWidth: "1200px" }}
        >
          <p className="text-xl mb-5">Hey, We are FIL Builders</p>
          <h1 className="inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold">
            Cross the <span className="text-fun-pink">Filecoin</span> chasm{" "}
            with <span className="text-fun-pink">us.</span>
          </h1>
          <div className="mt-5">
            <w3m-button />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
