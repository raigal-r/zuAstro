import Image from "next/image";
import { Inter } from "next/font/google";
import Loading from "@/components/Loading";
import Head from "next/head";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
     <Head>
        <title>ZuAstro</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {/* import manifest for the PWA configuration*/}
          <link rel="manifest" href="/manifest.json" />
          {/* import manifest for the Roboto font family*/}
      </Head>
      <div className="h-[100vh] w-full">
        <Loading />
      </div>

    </>
    
  );
}
