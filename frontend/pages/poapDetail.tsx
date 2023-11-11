import React from "react";
import { useState, useEffect } from "react";
import { SignContext, SignContext2 } from "./_app";
import router from "next/router";
import { useAccount, useConnect } from "wagmi";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const inter = Inter({ subsets: ["latin"] });

export default function PoapDetail() {
  const [compatibilityData, setCompatibilityData] = useState<string | null>(
    null
  );
  const { string, setString } = React.useContext(SignContext);
  const { string2, setString2 } = React.useContext(SignContext2);
  const [response, setResponse] = useState<string | null>(null);

  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [elements, setElements] = useState("");
  const [idealDate, setIdealDate] = useState("");
  const [negativeAspects, setNegativeAspects] = useState("");
  const [positiveAspects, setPositiveAspects] = useState("");
  const [overallCompatibility, setOverallCompatibility] = useState("");
  const [overallCompatibilityShort, setOverallCompatibilityShort] =
    useState("");

  const [friendshipScore, setFriendshipScore] = useState("");
  const [generalScore, setGeneralScore] = useState("");
  const [loveScore, setLoveScore] = useState("");

  function convertToLetterGrade(score: number): string {
    if (score >= 9) return "A";
    if (score >= 8) return "B";
    if (score >= 7) return "C";
    if (score >= 6) return "D";
    return "F";
  }

  useEffect(() => {
    const useLoveCompatibility = async () => {
      try {
        const response = await fetch(
          "https://divineapi.com/api/1.0/get_compatibility.php",
          {
            method: "POST",
            headers: {},
            body: new URLSearchParams({
              sign_1: string.toLowerCase(), // Replace with your actual API key
              sign_2: string2.toLowerCase(),
              //sign_1: "taurus",
              //sign_2: "capricorn",
              api_key: "b8c27b7a1c450ffdacb31483454e0b54",
            }),
          }
        );

        if (response.ok) {
          setResponse(JSON.stringify(response));
          console.log(JSON.stringify(response));
          const data = await response.json(); // parse the response as JSON
          console.log(data);
          const elements = data.data.elements;
          setElements(elements);
          const ideal_date = data.data.ideal_date;
          setIdealDate(ideal_date);
          const negative_aspects = data.data.negative_aspects;
          setNegativeAspects(negative_aspects);
          const positive_aspects = data.data.positive_aspects;
          setPositiveAspects(positive_aspects);
          const overall_compatibility = data.data.overall_compatibility;
          setOverallCompatibility(overall_compatibility);
          const overall_compatibility_short =
            data.data.overall_compatibility.split(".")[0];
          setOverallCompatibilityShort(overall_compatibility_short);
          const friendship_score = data.data.score;
          setFriendshipScore(friendship_score);
          const general_score = data.data.score;
          setGeneralScore(general_score);
          const love_score = convertToLetterGrade(data.data.score.sex);
          setLoveScore(love_score);
          //console.log(data);
          setCompatibilityData(data);
        } else {
          throw new Error(
            `Failed to fetch data from the API. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
      return compatibilityData;
    };
    useLoveCompatibility();
  }, []);

  console.log(compatibilityData);

  return (
    <section className="flex flex-grow h-full w-full  justify-center ">
      <div className="flex-col items-center">
        <div className="flex-col">
          <p className="text-3xl mb-2 text-gray-600">{`${string.toUpperCase()} and ${string2.toUpperCase()}`}</p>
          <p className="text-center font-bold text-[1.11rem] my-4 text-aPurple w-full">
            {`${overallCompatibilityShort}.`}
          </p>
        </div>
        <div className=" border-aGreen border-2 h-40 m-7 text-red-500 text-6xl flex justify-center items-center ">
          {`${loveScore}`}
        </div>
        <h1 className="text-center text-lg mb-4 text-gray-600">
          Matched : Nov 11th, 2023
        </h1>
        <div>
          {loveScore === "A" && (
            <>
              {!isConnected && <ConnectButton />}
              {isConnected && (
                <div className="grid grid-cols-1 w-full ">
                  <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-44  text-center"
                      onClick={() => router.push("./poapMinted")}
                  >
                    Mint Poap
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-7">
          <h2 className="mb-2 text-xl text-aGreen font-medium">Advice</h2>
          <div className="w-full border-2 border-aGreen h-38 text-gray-600 p-2 ">
            {`${elements}`}
          </div>
        </div>

        <div className="grid grid-cols-2 w-full gap-2">
          <button
            className="bg-aGreen text-white font-medium text-xl py-3 mt-4 px-2 w-40  text-center"
            onClick={() => router.push("./personalInfo")}
          >
            Main Page
          </button>
          <button className="bg-aPurple text-white font-medium text-xl px-2 py-3 mt-4 w-40 text-center">
            Connect Telegram
          </button>
        </div>
      </div>
    </section>
  );
}

export const useLoveCompatibility = async () => {
  const [compatibilityData, setCompatibilityData] = useState<string | null>(
    null
  );
  const { string, setString } = React.useContext(SignContext);
  const { string2, setString2 } = React.useContext(SignContext2);

  try {
    const response = await fetch(
      "https://divineapi.com/api/1.0/get_compatibility.php",
      {
        method: "POST",
        headers: {},
        body: new URLSearchParams({
          //sign_1: string.toLowerCase(), // Replace with your actual API key
          //sign_2: string2.toLowerCase(),
          sign_1: "taurus",
          sign_2: "taurus",
          api_key: "b8c27b7a1c450ffdacb31483454e0b54",
        }),
      }
    );

    if (response.ok) {
      const data = await response.json(); // parse the response as JSON
      console.log(data);
      setCompatibilityData(data);
    } else {
      throw new Error(
        `Failed to fetch data from the API. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return compatibilityData;
};
