"use client";

import Link from 'next/link'
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const Header = () => {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <div className="fixed top-0 w-full bg-blue-600 h-20 flex items-center z-10">
      <div className="relative left-4">
        <Link href="/">
          <p className="text-white text-2xl">Virtual Vista Pets</p>
        </Link>
      </div>
      {isConnected && <div className="fixed right-6">
        <div className="flex flex-row gap-8 items-center">
          <Link href="/defi">
            <div className="text-white font-bold">
              DeFi
            </div>
          </Link>
          <Link href="/storage">
            <div className="text-white font-bold">
              Storage
            </div>
          </Link>
          <div className="text-black items-center inline-flex bg-white border-2 border-black duration-200 ease-in-out focus:outline-none hover:bg-black hover:shadow-none hover:text-white justify-center rounded-[20px] shadow-[5px_5px_black] text-center transform transition w-full lg:px-2 lg:py-2 lg:text-xl px-2 py-2">
            <w3m-button />
          </div>
        </div>
      </div>
      }
    </div >
  );
};

export default Header;
