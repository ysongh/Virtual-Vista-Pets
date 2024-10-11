'use client'

import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, arbitrum } from '@reown/appkit/networks';
import { defineChain } from '@reown/appkit/networks';
import { filecoinCalibration } from 'wagmi/chains';

// Define the custom network
const filecoinCalibrationNetwork = defineChain({
  id: filecoinCalibration.id,
  caipNetworkId: 'eip155:' + filecoinCalibration.id,
  chainNamespace: 'eip155',
  name: 'Calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'testnet filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: [filecoinCalibration.rpcUrls.default.http],
      webSocket: ['WS_RPC_URL'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://calibration.filfox.info/en' },
  },
  contracts: {
    // Add the contracts here
  }
})

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

// 2. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, arbitrum, filecoinCalibrationNetwork],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


export function AppKit({ children }) {
  return children
}