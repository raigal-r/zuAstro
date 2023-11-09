import { gzip, ungzip } from "pako";
import qr from "qr-image";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";

export function encodeQRPayload(unencoded: string): string {
  console.log(`encoding payload with length ${unencoded.length}`);
  const compressedData = gzip(unencoded);
  const base64CompressedData = Buffer.from(compressedData).toString("base64");
  console.log(
    `Compressed: ${compressedData.length}, base64: ${base64CompressedData.length}`
  );

  return base64CompressedData;
}

export function decodeQRPayload(encoded: string): string {
  const buffer = Buffer.from(encoded, "base64");
  const unzippedBuffer = Buffer.from(ungzip(buffer));
  const decodedBuffer = unzippedBuffer.toString("utf8");
  return decodedBuffer;
}

interface SavedQRState {
  timestamp: number;
  payload: string;
}

export function QRDisplayWithRegenerateAndStorage({
  generateQRPayload,
  maxAgeMs,
  uniqueId,
  loadingLogo,
  loadedLogo,
  fgColor,
  bgColor
}: {
  generateQRPayload: () => Promise<string>;
  maxAgeMs: number;
  uniqueId: string;
  loadingLogo?: React.ReactNode;
  loadedLogo?: React.ReactNode;
  fgColor?: string;
  bgColor?: string;
}) {
  /**
   * Generate a fresh identity-revealing proof every n ms. We regenerate before
   * the proof expires to allow for a few minutes of clock skew between prover
   * and verifier.
   */
  const regenerateAfterMs = (maxAgeMs * 2) / 3;

  const [savedState, setSavedState] = useState<SavedQRState | undefined>(() => {
    const savedState = JSON.parse(
      localStorage[uniqueId] || "{}"
    ) as Partial<SavedQRState>;

    const { timestamp, payload } = savedState;

    if (
      timestamp != null &&
      Date.now() - timestamp < maxAgeMs &&
      payload !== undefined
    ) {
      return { timestamp, payload: payload };
    }

    return undefined;
  });

  const maybeGenerateQR = useCallback(async () => {
    const timestamp = Date.now();
    if (savedState && timestamp - savedState.timestamp < regenerateAfterMs) {
      return;
    }
    const newData = await generateQRPayload();
    const newSavedState: SavedQRState = { timestamp, payload: newData };
    localStorage[uniqueId] = JSON.stringify(newSavedState);
    setSavedState(newSavedState);
  }, [generateQRPayload, regenerateAfterMs, savedState, uniqueId]);

  useEffect(() => {
    maybeGenerateQR();
    const interval = setInterval(maybeGenerateQR, maxAgeMs / 10);
    return () => clearInterval(interval);
  }, [maxAgeMs, maybeGenerateQR, savedState]);

  const logoOverlay = useMemo(() => {
    return savedState ? loadedLogo : loadingLogo;
  }, [loadedLogo, loadingLogo, savedState]);

  useEffect(() => {
    console.log("[QR] rendering ", savedState);
  }, [savedState, savedState?.payload]);

  return (
    <QRDisplay
      logoOverlay={logoOverlay}
      value={savedState?.payload}
      fgColor={fgColor}
      bgColor={bgColor}
      saved={!!savedState}
    />
  );
}

export function QRDisplay({
  value,
  logoOverlay,
  fgColor,
  bgColor,
  saved
}: {
  value?: string;
  logoOverlay?: React.ReactNode;
  fgColor?: string;
  bgColor?: string;
  saved: boolean;
}) {
  return (
    <QRWrap saved={saved}>
      {value !== undefined && (
        <QR
          value={value}
          bgColor={bgColor ?? "#ffffff"}
          fgColor={fgColor ?? "#000000"}
        />
      )}
      {logoOverlay}
    </QRWrap>
  );
}

// Style constants
const QRWrap = styled.div<{ saved: boolean }>`
  ${({ saved }) => (saved ? css`` : css``)}
  height: 0;
  padding-bottom: 100%;
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

export function QR({
  value,
  fgColor,
  bgColor
}: {
  value: string;
  fgColor: string;
  bgColor: string;
}) {
  const [svgObject, setSvgObject] = useState<any | undefined>();

  useEffect(() => {
    const svgObject = qr.svgObject(value, "L");
    setSvgObject(svgObject);
  }, [bgColor, fgColor, value]);

  return (
    <Container>
      {svgObject && (
        <svg
          viewBox={`0 0 ${svgObject.size} ${svgObject.size}`}
          preserveAspectRatio="none"
        >
          <path
            width="100%"
            height="100%"
            d={svgObject.path}
            fill={fgColor}
          ></path>
        </svg>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100% !important;
  height: 100% !important;

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
