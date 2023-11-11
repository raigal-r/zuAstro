import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignContext, SignContext2 } from "./_app";
import router from "next/router";
import { NfcCardSignMessageResult, getMessageHash } from "jubmoji-api";
import Modal from "../components/Modal";
import { bigIntToHex } from "babyjubjub-ecdsa";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount, useConnect } from "wagmi";

import {
  NUniqueJubmojiInCollectionProof,
  NUniqueJubmojisInCollection,
  createProofInstance,
  CardPubKey,
  cardPubKeys,
} from "jubmoji-api";
import { WagmiConfig } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export type ForegroundTapModalProps = {
  message: string;
  onTap: (args: NfcCardSignMessageResult) => Promise<void>;
};

export default function PersonalInfo() {
  const { string, setString } = React.useContext(SignContext);
  const { string2, setString2 } = React.useContext(SignContext2);

  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [isForeground, setIsForeground] = useState(false);

  const [pubKey, setPubKey] = useState<string>("");
  const [rawSig, setRawSig] = useState<string>("");
  const [digest, setDigest] = useState<string>("");

  useEffect(() => {
    console.log("pubKey", pubKey);
    setIsForeground(false);
    console.log("cardPubKeys", cardPubKeys);
    const card = cardPubKeys.find((card) => card.pubKeySlot1 === pubKey);

    if (card) {
      if (card.cardName === "💾") {
        setString2("taurus");
        router.push("./poapDetail");
      } else if (card.emoji === "🖱️") {
        setString2("scorpio");
        router.push("./poapDetail");
      } else if (card.emoji === "🔧") {
        setString2("aries");
        router.push("./poapDetail");
      }
      console.log(card.emoji);
      console.log(string2); // This will print the emoji of the card with the matching pubKeyJub
      //router.push("./poapDetail")
    } else {
      console.log("No card found with the provided pubKey");
    }
  }, [pubKey]);

  const checkCompatibility = async () => {
    setIsForeground(true);
  };

  return (
    <>
      {!isForeground && (
        <section className="h-[100vh] w-full flex justify-center ">
          <div className="flex-col items-center">
            <h1 className="text-3xl mb-1 text-gray-600 text-center">0xAnon</h1>
            {string.toLocaleLowerCase() === "leo" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/leo-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "aquarius" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/aquarius-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "aries" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/aries-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "cancer" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/cancer-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "capricorn" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/capricorn-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "gemini" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/gemini-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "pisces" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/pisces-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "sagittarius" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/sagittarius-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "scorpio" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/scorpio-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "taurus" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/taurus-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "libra" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/libra-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}
            {string.toLocaleLowerCase() === "virgo" && (
              <div
                className="bg-center h-72 m-7 "
                style={{
                  backgroundImage: `url('images/virgo-icon.png')`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              ></div>
            )}

            <div className="flex items-center w-full">
              <button
                className="bg-aGreen text-white font-medium text-xl py-3  mt-4 text-center w-full"
                onClick={() => {
                  router.push("./dailyHoroscope");
                }}
              >
                Daily Horoscope{" "}
              </button>
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-aYellow text-white font-medium text-xl py-3  mt-4 text-center w-full"
                onClick={checkCompatibility}
              >
                Check Compatibility{" "}
              </button>
            </div>
            <div className="mt-7">
              <h2 className="my-4 text-xl text-aGreen font-medium">
                Your POAP List
              </h2>
              <div className="w-full border-2 border-aGreen h-38 ">
                <div className="flex gap-3 py-2 px-3 w-full items-center justify-center">
                  {!isConnected && <ConnectButton />}
                  {isConnected && (
                    <>
                      <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                        JM
                      </div>
                      <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                        RC
                      </div>
                      <div className="flex justify-center items-center rounded-full border-aYellow border-2 h-14 w-14 text-center bg-aYellow">
                        SJ
                      </div>
                      <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                        GU
                      </div>
                      <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                        EG
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-3">
              <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 px-5  text-center">
                Social Graph
              </button>
              <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 px-5 text-center">
                Visit Group
              </button>
            </div>
          </div>
        </section>
      )}
      {isForeground && (
        <section>
          <ForegroundTapModal
            message="Get zodiac sign compatibility"
            onTap={async (args: NfcCardSignMessageResult) => {
              // Handle the tap event here
              setPubKey(args.pubKey);
              setRawSig(JSON.stringify(args.rawSig));
              setDigest(args.digest);
            }}
          />
        </section>
      )}
    </>
  );
}

export function ForegroundTapModal({
  message,
  onTap,
}: ForegroundTapModalProps) {
  const [statusText, setStatusText] = useState("Waiting for NFC setup...");

  useEffect(() => {
    async function runScan() {
      const messageHash = bigIntToHex(getMessageHash(message));
      let command = {
        name: "sign",
        keyNo: 1,
        digest: messageHash,
      };

      let res;
      try {
        // --- request NFC command execution ---
        res = await execHaloCmdWeb(command, {
          statusCallback: (cause: any) => {
            if (cause === "init") {
              setStatusText(
                "Please tap the tag to the back of your smartphone and hold it..."
              );
            } else if (cause === "retry") {
              setStatusText(
                "Something went wrong, please try to tap the tag again..."
              );
            } else if (cause === "scanned") {
              setStatusText(
                "Tag scanned successfully, post-processing the result..."
              );
            } else {
              setStatusText(cause);
            }
          },
        });

        await onTap({
          digest: res.input.digest,
          rawSig: res.signature.raw,
          pubKey: res.publicKey,
        });
        setStatusText(`Tapped card! Process result...`);
      } catch (error) {
        console.error(error);
        setStatusText("Scanning failed, please try again.");
      }
    }

    runScan();
  }, [onTap, message]);

  return (
    <Modal isOpen={true} setIsOpen={() => {}}>
      <span className="font-helvetica text-[23px] font-bold leading-none text-woodsmoke-100">
        Place the NFC card on your phone.
      </span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">
        {statusText}
      </span>
      <span className="font-helvetica text-base font-normal leading-[22.4px] text-woodsmoke-100">
        {"If you still can't tap, check out the "}
        <a
          href="https://pse-team.notion.site/Card-tapping-instructions-ac5cae2f72e34155ba67d8a251b2857c?pvs=4"
          target="_blank"
          className="underline"
        >
          troubleshooting guide
        </a>
        .
      </span>
    </Modal>
  );
}
