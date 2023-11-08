import Image from "next/image";
import { Inter } from "next/font/google";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-[100vh] w-full">
      <Loading />
    </div>
  );
}
