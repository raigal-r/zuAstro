import {
    constructZupassPcdProveAndAddRequestUrl,
    openSignedZuzaluSignInPopup
  } from "../../zupass/packages/passport-interface/src"
  import { ArgumentTypeName } from "../../zupass/packages/pcd-types/src"
  import { SemaphoreIdentityPCDPackage } from "../../zupass/packages/semaphore-identity-pcd/src"
  import { SemaphoreSignaturePCDPackage } from "../../zupass/packages/semaphore-signature-pcd/src";
  import { useContext, useEffect, useState } from "react";
  import {  ZUPASS_URL } from "./constants";
  import { sendZupassRequest } from "./util";
  import React from 'react';
  import {zuPassLogIn} from "../../pages/login"

  export const useZuPassSignIn = (argument: string) => {


      

    //zupassSignIn(argument);
  }
