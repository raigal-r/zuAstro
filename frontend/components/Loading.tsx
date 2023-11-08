"use client";
import React from "react";
import Image from "next/image";

import Link from "next/link";

const Loading = () => {
  return (
    <section className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex-col items-center text-center">
        <div
          className="bg-center"
          style={{
            backgroundImage: `url('images/logo.png')`,
            backgroundPosition: "center",
          }}
        >
          Logo
        </div>
        <h1>ZuAstro</h1>
        <p>Connect People by Horoscope</p>
      </div>
    </section>
  );
};

export default Loading;
