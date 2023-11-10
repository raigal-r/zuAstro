export type CardPubKey = {
  category: string;
  emoji: string;
  cardName: string;
  unicode: string;
  cardImage?: string;
  imageBlobUrl: string;
  pubKeySlot1: string;
  pubKeySlot2: string;
  pubKeyJub: string; // in Weierstrass form
};

export const cardPubKeys: CardPubKey[] = [
  {
    category: "infrastructure",
    emoji: "🐑",
    cardName: "aries",
    unicode: "U+1F4E6",
    pubKeySlot1:
      "04f636e4bb92a5d9e9677cdeab99ddc86523b3c5b4b1faec579454eb310a0c8d019ec22a20cf5e82b52f25eadf771daba5665f5ddf5d7a8a6c5dc9b5e1860b68b0",
    pubKeySlot2:
      "0407e903636c8bdc5a0df077fd30f069610af52d3709bf949ae6f47120531137ac1bcb867d01b3ac8ea994f2aa474239a11751b41c5db0a8d3c02a2442be7231ad",
    pubKeyJub:
      "0412523e60d96846642195d836a062f30e46c95b57a474ff7a8a16a29e543f02c100e5faa84aae505a8f3f925b479f89a8165e6bc6b4d5830c7c01f6eff1f4ec7e",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/package-oBEbKyUNTLnB5QRcufTMMNyxo79MJ4Q",
  },
  {
    category: "infrastructure",
    emoji: "🐂",
    cardName: "taurus",
    unicode: "U+1F3FA",
    pubKeySlot1:
      "04fdde67560ab7039e0b1967b55c10b081f9dc9139f33d2649626d1dfe8f216ffac16af423192f721cc68b4283c5f21212ea16173eca38708acf223e50fce9cd93",
    pubKeySlot2:
      "04e585cacd6ca7b828dcba3ef517c8ff1e6da022bb38377b0df488bf9e68a0d1d36748840166842ade1b3e07e1d2d81fadc1f5c6457bb5b05251939cdd265b0353",
    pubKeyJub:
      "041c6e382eafc869ab86990db1eddf131706e5a809156110f077f9b8cdeedae45004146a92c096bce120c8782ab2ed29f35b585aaadf1fbb99d96a54740acad8c2",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/amphora-jCvMVfXKVExaEXQcNIfW7k7jgOU1mv",
  },
  {
    category: "infrastructure",
    emoji: "🐐",
    cardName: "capricorn",
    unicode: "U+1FA91",
    pubKeySlot1:
      "04db69a3e24a1dae9663db695bc2fe0bbd191ff8e58977c326c7a69dda17aca5ca79ebf96065b42d55bd23728b882afe812982f50de9da13ed39813043728fb954",
    pubKeySlot2:
      "04c0484fad1dcc95d8e584bb97203a647f5adc1f7f0c39e692bdbdc7e200e32ec68a2c64c2709d0934cf2211436776340a8c05afd7bd06f1c18bc05750461e0efc",
    pubKeyJub:
      "040f727ef69c97f68db604cafaa618bd09731af6ecded93af3d2adc0690e7dcb3f00c7c1b852c034f1ddf11f3dae58f843abda0c8dbb125ebec8e31b7080bb34b1",
    imageBlobUrl:
      "https://g03pixcfibqaykq3.public.blob.vercel-storage.com/chair-JMchvcgosh3DEzoz1Ny9ekL7o72XL7",
  },
];
