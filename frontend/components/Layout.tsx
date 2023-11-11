import React, { CSSProperties } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { Header } from "./Header";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const path = usePathname();

  return (
    <div className="flex flex-col flex-grow  bg-[#F7EEE1] w-full  p-6 ">
      <Head>
        <title>{title}</title>
      </Head>
      {path === "/login" ? undefined : <Header />}
      {children}
    </div>
  );
};

export default Layout;
