'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import {
  filecoin,
  filecoinCalibration
} from 'wagmi/chains'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const filecoinCalibrationTest = {
  chainId: filecoinCalibration.id,
  name: filecoinCalibration.name,
  currency: 'tFIL',
  explorerUrl: 'https://calibration.filfox.info/en',
  rpcUrl: filecoinCalibration.rpcUrls.default.http
}

const hardhat = {
  chainId: 31337,
  name: 'Hardhat',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://127.0.0.1:8545'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [filecoinCalibrationTest, hardhat],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export function AppKit({ children }) {
  return children
}