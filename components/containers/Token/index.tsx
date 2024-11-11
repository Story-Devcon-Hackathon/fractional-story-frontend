import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import DisplayOwnership from "./DisplayOwnership";
import Properties from "./Properties";
import TokenDetail from "./TokenDetail";
import { getAll } from "@/utils/urlHelper";
import { getTokenByAddressAndId } from "../../../mocks/tokenData";

export default function TokenPage(): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { collectionAddress, tokenId } = getAll();

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useTokenData(collectionAddress as string, tokenId as string);

  function useTokenData(collectionAddress: string, tokenId: string) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      function fetchTokenData() {
        try {
          if (!collectionAddress || !tokenId) {
            throw new Error("Missing collection address or token ID");
          }

          setIsLoading(true);
          const tokenData = getTokenByAddressAndId(collectionAddress, tokenId);
          if (!tokenData) {
            throw new Error("Token not found");
          }
          setData(tokenData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching token data:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }

      fetchTokenData();
    }, [collectionAddress, tokenId]);

    return { data, isLoading, isError };
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "3fr 4fr" }} gap={6}>
        <GridItem>
          <Box
            borderRadius="lg"
            boxShadow="xl"
            overflow="hidden"
            w="100%"
            maxW="1000px"
            aspectRatio={1}
          >
            <AspectRatio ratio={1}>
              <Skeleton isLoaded={imageLoaded}>
                <Image
                  src={token?.imageURI || ""}
                  alt={token?.name}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  onLoad={() => setImageLoaded(true)}
                />
              </Skeleton>
            </AspectRatio>
          </Box>
          <Properties />
          <TokenDetail />
        </GridItem>

        <GridItem>
          <Flex direction="column" height="100%" gap={3} p={6}>
            <VStack alignItems="start">
              <SkeletonText
                skeletonHeight={8}
                minW={300}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text fontSize="3xl" fontWeight="bold">
                  {token?.name || "--"}
                </Text>
              </SkeletonText>
              <SkeletonText
                skeletonHeight={5}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text>{token?.description}</Text>
              </SkeletonText>
              <SkeletonText
                skeletonHeight={5}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text>
                  <b>Address:</b> {collectionAddress}
                </Text>{" "}
              </SkeletonText>
              <SkeletonText
                skeletonHeight={5}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text>
                  <b>TokenId:</b> {tokenId}
                </Text>{" "}
              </SkeletonText>
            </VStack>
            <DisplayOwnership />
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
