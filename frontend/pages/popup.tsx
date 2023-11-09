import { useState, useEffect } from "react";


export function useZupassPopupSetup() {
    // Usually this page redirects immediately. If not, show an error.
    const [error, setError] = useState("");
  
    useEffect(() => {
      if (window.opener == null) {
        setError("Not a popup window");
        return;
      }
      let params;
  
      // Hash routing is commonly used in web applications to enable client-side
      // routing without requiring server-side configuration, typically single-page applications.
      // Without hash routing, the server should always serve the same index.html file for any route.
      // Some providers, like Github Pages, don't provide this feature.
      // To read the parameters of a URL with hash routing, the hash must first be removed.
      if (window.location.href.includes(window.location.origin + "/#/")) {
        const url = new URL(window.location.href.replace("#", ""));
  
        params = url.searchParams;
        console.log("paramns:", params)
      } else {
        params = new URLSearchParams(window.location.search);
      }
  
      const paramsProofUrl = params.get("proofUrl");
      const paramsProof = params.get("proof");
      const paramsEncodingPendingPCD = params.get("encodedPendingPCD");
      const finished = params.get("finished");
  
      // First, this page is window.open()-ed. Redirect to Zupass.
      if (paramsProofUrl != null) {
        window.location.href = paramsProofUrl;
      } else if (finished) {
        // Later, Zupass redirects back with a result. Send it to our parent.
        if (paramsProof != null) {
          window.opener.postMessage({ encodedPCD: paramsProof }, "*");
        }
  
        window.close();
        setTimeout(() => {
          setError("Finished. Please close this window.");
        }, 1000 * 3);
      } else if (paramsEncodingPendingPCD != null) {
        // Later, Zupass redirects back with a encodedPendingPCD. Send it to our parent.
        window.opener.postMessage(
          { encodedPendingPCD: paramsEncodingPendingPCD },
          "*"
        );
        window.close();
        setTimeout(() => {
          setError("Finished. Please close this window.");
        }, 1000 * 3);
      }
    }, []);
  
    return error;
  }
/**
 * This popup sends requests to, and receives PCDs from Zupass.
 */
export default function ZupassPopupRedirect() {
  const error = useZupassPopupSetup();
  return <div>{error}</div>;
}