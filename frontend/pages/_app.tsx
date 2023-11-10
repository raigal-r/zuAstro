import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, {useContext, createContext, useEffect} from "react";

export const SignContext = React.createContext({
  string: "",
  setString: (value: string) => {},
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


  return (
    <SignContext.Provider value={{ string, setString }}>
      <link rel="manifest" href="/manifest.json" />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SignContext.Provider>
  );
}
