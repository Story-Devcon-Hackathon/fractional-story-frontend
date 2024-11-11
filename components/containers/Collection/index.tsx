import { Container, Grid, Heading } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";
import TokenBox from "./TokenBox";
import TokenBoxSkeleton from "./TokenBoxSkeleton";
import { mockTokens } from "../../../mocks/tokenData";
import { useRouter } from "next/router";

export default function Collection(): JSX.Element {
  const router = useRouter();

  const {
    data: tokenPages,
    hasNextPage,
    isLoading: tokensIsLoading,
    isFetchingNextPage: isFetchingNextTokens,
    isError: isTokensError,
  } = {
    data: {
      pages: [mockTokens],
    },
    hasNextPage: false,
    isLoading: false,
    isFetchingNextPage: false,
    isError: false,
  };

  const fetchNextTokens = () => {
    // Placeholder for fetchNextPage function
    console.log("Fetching next page...");
  };

  const tokens = tokenPages?.pages?.flatMap((token) => token);

  const handleTokenClick = (collectionAddress: string, tokenId: string) => {
    router.push(`/token/${collectionAddress}/${tokenId}`);
  };

  return (
    <Container maxW="container.xl" py={12}>
      <Heading mb={8}>NFT Collection</Heading>

      <InfiniteScroll
        dataLength={tokens?.length || 0}
        next={fetchNextTokens}
        hasMore={!!hasNextPage}
        loader={<></>}
        endMessage={<></>}
      >
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
          {tokensIsLoading || isFetchingNextTokens || isTokensError
            ? Array(12)
                .fill(0)
                .map((_, index) => <TokenBoxSkeleton key={index} />)
            : tokens &&
              tokens.map((token, i) => {
                return (
                  <TokenBox
                    key={token.tokenId + i}
                    token={token}
                    onClick={() =>
                      handleTokenClick(token.collectionAddress, token.tokenId)
                    }
                  />
                );
              })}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
