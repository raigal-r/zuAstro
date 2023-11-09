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
    </header>
  );
};
