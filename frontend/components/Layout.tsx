import React, { CSSProperties } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { Josefin_Sans, Noto_Sans_KR } from "next/font/google"; // Roboto와 한글 NotoSans를 사용합니다.

const josefin = Josefin_Sans({
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "300", "400", "600"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

// const roboto = Roboto({
//   subsets: ["latin"], // preload에 사용할 subsets입니다.
//   weight: ["100", "400", "700"],
//   variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
// });

import { Header } from "./Header";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const path = usePathname();

  return (
    <div className="bg-[#F7EEE1] w-full h-[100vh] p-6 ">
      <div className={inter.className}>
        <Head>
          <title>{title}</title>
        </Head>
        {path === "/login" ? undefined : <Header />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
