import React, { useState, useEffect, useContext } from "react";
import { ArgsOf, PCDPackage, SerializedPCD } from "@pcd/pcd-types";
import { ArgumentTypeName } from "@pcd/pcd-types";
import {
  SemaphoreSignaturePCD,
  SemaphoreSignaturePCDPackage,
} from "@pcd/semaphore-signature-pcd";
import { SemaphoreIdentityPCDPackage } from "@pcd/semaphore-identity-pcd";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeoLocationComponent from "@/components/GeoLocation";
import router from "next/router";
import { SignContext } from "./_app";
// import ReactSVG from "react-svg";
// import InlineSVG from "react-inlinesvg";

interface SvgImageProps {
  src: string;
  alt?: string;
}

export const SvgImage: React.FC<SvgImageProps> = ({ src, alt = "" }) => {
  return <img src={src} alt={alt} />;
};

import TextInput from "@/components/TextInput"; // Import the reusable text input component
import { setMonth } from "date-fns";

const inter = Inter({ subsets: ["latin"] });

export default function CreateBirthChart() {
  {
    /* name - optional, place - required , gender - optional, day, months, year, hour */
  }
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");

  const [astroData, setAstroData] = useState<{
    success: number;
    data: { svg: string }[];
  } | null>(null);
  const [signReportData, setSignReportData] = useState<any | null>(null); // Adjust the type according to the response data structure
  const [signedMessage, setSignedMessage] = useState("1");

  const { string, setString } = React.useContext(SignContext);

  const [isSVG, setIsSVG] = useState(string);

  useEffect(() => {
    setString(signedMessage);
    console.log("string", string);
  }, [signedMessage]);

  useEffect(() => {
    console.log("string", string);
  }, [string]);

  const handleInputChange = (
    param: "day" | "month" | "year" | "hour",

    newValue: string
  ) => {
    if (param === "day") {
      setDay(newValue);
    } else if (param === "month") {
      setMonth(newValue);
    } else if (param === "year") {
      setYear(newValue);
    } else if (param === "hour") {
      setHour(newValue);
    }
  };

  const createBirthChartImage = async () => {
    try {
      const response = await fetch(
        "https://astroapi-4.divineapi.com/western-api/v1/natal-wheel-chart",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdHJvYXBpLTEuZGl2aW5lYXBpLmNvbS9hcGkvYXV0aC1hcGktcmVmcmVzaC10b2tlbiIsImlhdCI6MTY5OTU2NDMxMiwibmJmIjoxNjk5NTY5Njc5LCJqdGkiOiJCVzNnREZVS3ZxMWdONWRnIiwic3ViIjoiMTM1NSJ9._Bci3dYCDVRRtl9u-1JEONAWhxB3O9OFeJrp7a_j0ao",
          },
          body: new URLSearchParams({
            api_key: "b8c27b7a1c450ffdacb31483454e0b54",
            full_name: "Raquel Carrasco",
            place: "Arenys de Mar, Spain",
            gender: "female",
            day: day.toString().toLowerCase(),
            month: month.toString().toLowerCase(),
            year: year.toString().toLowerCase(),
            hour: hour.toString().toLowerCase(),
            min: "00",
            sec: "43",
            lon: "2.5346498", // This needs to change, not hard coded
            lat: "41.5783288",
            tzone: "1",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data); // Add this line
        setAstroData(data);
        setIsSVG(data.data[0].svg);
        console.log("birth chart response:", data); //The response it's a svg data
      } else {
        throw new Error(
          `Failed to fetch data from the API. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createBirthChartSignReport = async () => {
    try {
      const response = await fetch(
        "https://astroapi-4.divineapi.com/western-api/v1/general-sign-report/sun",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdHJvYXBpLTEuZGl2aW5lYXBpLmNvbS9hcGkvYXV0aC1hcGktcmVmcmVzaC10b2tlbiIsImlhdCI6MTY5OTU2NDMxMiwibmJmIjoxNjk5NTY5Njc5LCJqdGkiOiJCVzNnREZVS3ZxMWdONWRnIiwic3ViIjoiMTM1NSJ9._Bci3dYCDVRRtl9u-1JEONAWhxB3O9OFeJrp7a_j0ao`,
          },
          body: new URLSearchParams({
            api_key: "b8c27b7a1c450ffdacb31483454e0b54",
            full_name: "Raquel Carrasco",
            day: day.toString().toLowerCase(),
            month: month.toString().toLowerCase(),
            year: year.toString().toLowerCase(),
            hour: hour.toString().toLowerCase(),
            min: "00",
            sec: "43",
            gender: "female",
            place: "Arenys de Mar, Spain",
            lon: "2.5346", // This needs to change, not hard coded
            lat: "41.5783",
            tzone: "1",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSignReportData(data);
        setSignedMessage(data.data.sign_name);
        const signedMessage = data.data.sign_name;
        setString(signedMessage);
        console.log(signedMessage);
        console.log("Sign Data:", data.data.sign_name);
      } else {
        throw new Error(
          `Failed to fetch data from the API. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="h-full w-full">
      {!signReportData && (
        <div className=" flex-col  text-gray-600">
          <div className="flex flex-col ">
            <p className="text-3xl mb-[3rem]">Create Your Birth Chart</p>
            <div className="grid grid-cols-3 gap-2 overflow-hidden">
              {/* name - optional, place - requery , gender - optional, day, months, year, hour */}
              <div>
                <TextInput
                  label="Day"
                  value={day}
                  onChange={(value) => handleInputChange("day", value)}
                />
              </div>
              <div>
                <TextInput
                  label="Month"
                  value={month}
                  onChange={(value) => handleInputChange("month", value)}
                />
              </div>
              <div>
                <TextInput
                  label="Year"
                  value={year}
                  onChange={(value) => handleInputChange("year", value)}
                />
              </div>
            </div>
            <div>
              <TextInput
                label="Hour"
                value={hour}
                onChange={(value) => handleInputChange("hour", value)}
              />
            </div>
          </div>
          <div>
            <div className=" text-[1.11rem] w-full">
              Fill Out Your Birth Location
            </div>
            <GeoLocationComponent />
          </div>
          <div className="grid w-full ">
            <button
              className=" py-4 text-center bg-aGreen text-white mt-10"
              onClick={() => {
                createBirthChartImage();
                createBirthChartSignReport();
              }}
            >
              Create BirthChart
            </button>
          </div>
        </div>
      )}
      {signReportData && (
        <div>
          <div className="flex-col w-max ">
            <p className="text-3xl mb-2 text-gray-600 text-left ">
              Check Your BirthChart
            </p>
            {/* <div
              className="bg-center h-96 my-7 "
              style={{
                backgroundImage: `url('images/birthchart.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            ></div> */}
            <div>
              <div>
                {astroData &&
                  astroData.data.map((item, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item.svg }}
                    />
                  ))}
              </div>
            </div>
            <div className="grid grid-rows-2 w-full gap-2">
              <button
                className="bg-aGreen text-white font-medium text-xl py-3 mt-4 w-full text-center"
                //onClick={() => addSignatureProofPCD('libra')}>
                onClick={() => addSignatureProofPCD(signedMessage)}
              >
                Save Your Birthchart
              </button>

              <button
                className="bg-aPurple text-white font-medium text-xl py-3 mt-4 w-full text-center"
                onClick={() => {
                  router.push("./personalInfo");

                  //logInContext.logInTheme = true
                }}
              >
                Main Page
              </button>
            </div>
            <div className="grid grid-cols-2 w-full gap-2"></div>
          </div>
        </div>
      )}
    </section>
  );
}

export interface ProveOptions {
  genericProveScreen?: boolean;
  title?: string;
  description?: string;
  debug?: boolean;
  proveOnServer?: boolean;
  signIn?: boolean;
}

export enum PCDRequestType {
  Get = "Get",
  GetWithoutProving = "GetWithoutProving",
  Add = "Add",
  ProveAndAdd = "ProveAndAdd",
}

export interface PCDRequest {
  returnUrl: string;
  type: PCDRequestType;
}

export interface PCDGetRequest<T extends PCDPackage = PCDPackage>
  extends PCDRequest {
  type: PCDRequestType.Get;
  pcdType: T["name"];
  args: ArgsOf<T>;
  options?: ProveOptions;
}

export function constructZupassPcdGetRequestUrl<T extends PCDPackage>(
  zupassClientUrl: string,
  returnUrl: string,
  pcdType: T["name"],
  args: ArgsOf<T>,
  options?: ProveOptions
) {
  const req: PCDGetRequest<T> = {
    type: PCDRequestType.Get,
    returnUrl: returnUrl,
    args: args,
    pcdType,
    options,
  };
  const encReq = encodeURIComponent(JSON.stringify(req));
  return `${zupassClientUrl}#/prove?request=${encReq}`;
}

export function openZupassPopup(popupUrl: string, proofUrl: string) {
  const url = `${popupUrl}?proofUrl=${encodeURIComponent(proofUrl)}`;
  window.open(url, "_blank", "width=450,height=600,top=100,popup");
}

export function openSignedZuzaluSignInPopup(
  zupassClientUrl: string,
  popupUrl: string,
  originalSiteName: string
) {
  const proofUrl = constructZupassPcdGetRequestUrl<
    typeof SemaphoreSignaturePCDPackage
  >(
    zupassClientUrl,
    popupUrl,
    SemaphoreSignaturePCDPackage.name,
    {
      identity: {
        argumentType: ArgumentTypeName.PCD,
        pcdType: SemaphoreIdentityPCDPackage.name,
        value: undefined,
        userProvided: true,
      },
      signedMessage: {
        argumentType: ArgumentTypeName.String,
      },
    },
    {
      title: "Zuzalu Auth",
      description: originalSiteName,
      signIn: true,
    }
  );

  openZupassPopup(popupUrl, proofUrl);
}

async function zupassSignIn(originalSiteName: string) {
  openSignedZuzaluSignInPopup(
    //ZUPASS_URL,
    "https://zupass.org/",
    `${window.location.origin}/popup`,
    originalSiteName
  );
}

export interface PCDProveAndAddRequest<T extends PCDPackage = PCDPackage>
  extends PCDRequest {
  type: PCDRequestType.ProveAndAdd;
  pcdType: string;
  args: ArgsOf<T>;
  options?: ProveOptions;
  returnPCD?: boolean;
}

export function constructZupassPcdProveAndAddRequestUrl<
  T extends PCDPackage = PCDPackage
>(
  zupassClientUrl: string,
  returnUrl: string,
  pcdType: string,
  args: ArgsOf<T>,
  options?: ProveOptions,
  returnPCD?: boolean
) {
  const req: PCDProveAndAddRequest = {
    type: PCDRequestType.ProveAndAdd,
    returnUrl: returnUrl,
    pcdType,
    args,
    options,
    returnPCD,
  };
  const eqReq = encodeURIComponent(JSON.stringify(req));
  return `${zupassClientUrl}#/add?request=${eqReq}`;
}

export function sendZupassRequest(proofUrl: string) {
  const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`;
  window.open(popupUrl, "_blank", "width=450,height=600,top=100,popup");
}

async function addSignatureProofPCD(messageToSign: string) {
  const proofUrl = constructZupassPcdProveAndAddRequestUrl<
    typeof SemaphoreSignaturePCDPackage
  >(
    //ZUPASS_URL,
    "https://zupass.org/",
    `${window.location.origin}/popup`,
    SemaphoreSignaturePCDPackage.name,
    {
      identity: {
        argumentType: ArgumentTypeName.PCD,
        pcdType: SemaphoreIdentityPCDPackage.name,
        value: undefined,
        userProvided: true,
      },
      signedMessage: {
        argumentType: ArgumentTypeName.String,
        value: messageToSign,
        userProvided: false,
      },
    },
    {
      title: "Semaphore Signature Proof",
    }
  );

  sendZupassRequest(proofUrl);
}
