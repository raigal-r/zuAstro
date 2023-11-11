import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full text-black mb-7">
      <div
        className="bg-left h-14"
        style={{
          backgroundImage: `url('images/h-logo.png')`,
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
      {/* <div className="flex justify-end mt-4">
        <ConnectButton />
      </div> */}
    </header>
  );
};
