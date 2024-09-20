import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider } from '.';
import ReactQueryProvider from './ReactQueryProvider';
import { AppKit } from '../context/web3modal'
import { getMetadata } from "@/utils/getMetadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = getMetadata({
  title: "Virtual Vista Pets",
  description: "On-chain virtual pet game",
});

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
