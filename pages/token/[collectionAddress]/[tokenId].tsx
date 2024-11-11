import { Box, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getTokenByAddressAndId } from "../../../mocks/tokenData";
import { useRouter } from "next/router";

export default function TokenPage() {
  const router = useRouter();
  const { collectionAddress, tokenId } = router.query;
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    if (collectionAddress && tokenId) {
      const foundToken = getTokenByAddressAndId(
        collectionAddress as string,
        tokenId as string
      );
      setToken(foundToken);
    }
  }, [collectionAddress, tokenId]);

  if (!token) {
    return (
      <Container maxW="container.xl" py={12}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            {token.name}
          </Heading>
          <Text fontSize="md" color="gray.600" mb={6}>
            {token.description}
          </Text>
        </Box>

        <Box borderRadius="lg" overflow="hidden">
          <Image
            src={token.imageURI}
            alt={token.name}
            width="100%"
            maxH="600px"
            objectFit="contain"
          />
        </Box>

        <Box>
          <Text fontWeight="bold" mb={2}>
            Token Details
          </Text>
          <Text>Collection Address: {token.collectionAddress}</Text>
          <Text>Token ID: {token.tokenId}</Text>
          <Text>Event ID: {token.eventId}</Text>
        </Box>
      </VStack>
    </Container>
  );
}
