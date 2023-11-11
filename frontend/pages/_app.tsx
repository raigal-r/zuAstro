import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, {useContext, createContext, useEffect} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';

import { alchemyProvider } from 'wagmi/providers/alchemy';



export const SignContext = React.createContext({
  string: "",
  setString: (value: string) => {},
});

export const SignContext2 = React.createContext({
  string2: "",
  setString2: (value: string) => {},
});

export default function App({ Component, pageProps }: AppProps) {
  
  
  const [string, setString] = React.useState("");

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  }, []);

  const queryClient = new QueryClient();

  //RainbowKit configuration
  const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [
    publicProvider()
  ]
);

  const { connectors } = getDefaultWallets({
    appName: 'RainbowKit Connect PEERUP',
    projectId: '152edacbf75e37f23d75d7dbde5fe298',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })


  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <SignContext.Provider value={{ string, setString }}>
          <link rel="manifest" href="/manifest.json" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SignContext.Provider>
      </RainbowKitProvider>
     </WagmiConfig>    
  );
}
