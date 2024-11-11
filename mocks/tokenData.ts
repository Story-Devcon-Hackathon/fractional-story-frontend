export const mockTokens = [
  {
    collectionAddress: "0x1234567890123456789012345678901234567890",
    tokenId: "1",
    name: "Luca",
    description: "A charming digital portrait...",
    imageURI: "https://i.ibb.co/jZN2hTj/1-6445-769144.jpg",
    eventId: "event1",
  },
  {
    collectionAddress: "0x2345678901234567890123456789012345678901",
    tokenId: "2",
    name: "BAYC",
    description: "A stylized cartoon ape with...",
    imageURI: "https://i.ibb.co/19M7Q6r/bayc-8788-769172.jpg",
    eventId: "event2",
  },
  {
    collectionAddress: "0x3456789012345678901234567890123456789012",
    tokenId: "3",
    name: "BERABEAR",
    description: "An adorable cartoon bear...",
    imageURI: "https://i.ibb.co/JFjrSnP/beraboyz-1815-769162.jpg",
    eventId: "event3",
  },
  {
    collectionAddress: "0x4567890123456789012345678901234567890123",
    tokenId: "4",
    name: "Kemomokaki",
    description: "A cute and quirky digital...",
    imageURI: "https://i.ibb.co/b2j4b1J/kemomokaki-7884-769169.jpg",
    eventId: "event4",
  },
  {
    collectionAddress: "0x5678901234567890123456789012345678901234",
    tokenId: "5",
    name: "Retard",
    description: "A bold and provocative...",
    imageURI: "https://i.ibb.co/qDSD82Y/retardio-2902-769171.jpg",
    eventId: "event5",
  },
];

export const getTokenByAddressAndId = (collectionAddress: string, tokenId: string) => {
  return mockTokens.find(
    token =>
      token.collectionAddress.toLowerCase() === collectionAddress.toLowerCase() &&
      token.tokenId === tokenId
  );
};