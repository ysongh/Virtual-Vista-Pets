import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from '.';
import ReactQueryProvider from './ReactQueryProvider';
import { AppKit } from '../context/web3modal'

const inter = Inter({ subsets: ["latin"] });

// Websit Config
export const metadata: Metadata = {
  title: "FVM Frontend Starter Kit",
  description: "Made with love by Team FIL-B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppKit>
          <ReactQueryProvider>
            <ContextProvider>
              {children}
            </ContextProvider>
          </ReactQueryProvider>
        </AppKit>
      </body>
    </html>
  );
}
