import React, { CSSProperties } from "react";
import Head from "next/head";

import { Header } from "./Header";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const path = usePathname();

  return (
    <div className="bg-[#F7EEE1] w-full h-[100vh] p-6">
      <Head>
        <title>{title}</title>
      </Head>
      {path === "/login" ? undefined : <Header />}
      {children}
    </div>
  );
};

export default Layout;
