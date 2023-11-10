import React, {useState, useEffect, } from "react";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {SignContext} from "./_app"
import router from "next/router";
import { NfcCardSignMessageResult, getMessageHash } from "jubmoji-api";
import Modal from "../components/Modal";
import { bigIntToHex } from "babyjubjub-ecdsa";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";

const inter = Inter({ subsets: ["latin"] });

export type ForegroundTapModalProps = {
  message: string;
  onTap: (args: NfcCardSignMessageResult) => Promise<void>;
};


export default function PersonalInfo() {

  const { string, setString } = React.useContext(SignContext);

  const [isForeground, setIsForeground] = useState(false)
  const [pubKey, setPubKey] = useState('')

  useEffect(() => {
    console.log('pubKey', pubKey)
    setIsForeground(false)

    
  }, [pubKey]);


  const checkCompatibility = async () => {
    setIsForeground(true);

  }

  return (
    <>
    {!isForeground && 
    <section className="h-[100vh] w-full flex justify-center ">
      <div className="flex-col items-center">
        <h1 className="text-3xl mb-1 text-gray-600 text-center">0xDonald</h1>
        <div
          className="bg-center h-72 m-7 "
          style={{
            backgroundImage: `url('images/leo.png')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <div className="flex justify-center items-center w-full">
          <button className="bg-aGreen text-white font-medium text-xl py-3 w-44 mt-4 text-center"
          onClick={() => {
            router.push("./dailyHoroscope");

          }}>
            Daily Horoscope{" "}
          </button>
        </div>
        <div className="flex justify-center items-center w-full">
          <button className="bg-aGreen text-white font-medium text-xl py-3 w-44 mt-4 text-center"
          onClick={checkCompatibility}>
            Check Compatibility{" "}
          </button>
        </div>
        <div className="mt-7">
          <h2 className="my-4 text-xl text-aGreen font-medium">
            Your POAP List
          </h2>
          <div className="w-full border-2 border-aGreen h-38 ">
            <div className="flex gap-3 py-2 px-3">
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
            </div>
            <div className="flex gap-3 py-2 px-3">
              <div className="flex justify-center items-center rounded-full border-aPurple border-2 h-14 w-14 text-center bg-aPurple">
                JM
              </div>
              <div className="flex justify-center items-center rounded-full border-aGreen border-2 h-14 w-14 text-center bg-aGreen">
                RC
              </div>
              <div className="flex justify-center items-center rounded-full border-aYellow border-2 h-14 w-14 text-center bg-aYellow">
                SJ
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-2">
          <button className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-44  text-center">
            Social Graph
          </button>
          <button className="bg-aPurple text-white font-medium text-xl py-3 mt-4 w-44 text-center">
            Visit Group
          </button>
        </div>
      </div>
      <div>
        {pubKey}
      </div>
    </section>
    }
    {isForeground && 
    <section>
      <ForegroundTapModal 
        message="Get zodiac sign compatibility" 
        onTap={async (args: NfcCardSignMessageResult) => {
          // Handle the tap event here
          setPubKey(args.pubKey)

        }}
/>
    </section>
    }
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
        setStatusText("Tapped card! Process result...");
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
