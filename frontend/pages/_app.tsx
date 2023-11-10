import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, {useContext, createContext} from "react";

export const SignContext = React.createContext({
  string: "",
  setString: (value: string) => {},
});


export default function App({ Component, pageProps }: AppProps) {
  
  const [string, setString] = React.useState("");

  return (
    <SignContext.Provider value={{ string, setString }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SignContext.Provider>
  );
}
