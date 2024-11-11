import { Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import Button from "@/components/ui/Buttons";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";
import { defaultCollectionAddress } from "@/constants/defaultCollectionAddress";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

function Home(): JSX.Element {
  const { push } = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container maxW="container.md" my={10}>
        <VStack gap={5}>
          <VStack>
            <TaskTitle>Welcome to Fractional Story</TaskTitle>
            <Text textAlign="center">
              We're building a revolutionary fractional NFT protocol on Story
              Protocol, enabling users to mint and sell royalty shares of an
              NFT!
            </Text>
            <Button onClick={() => push(`/${defaultCollectionAddress}`)}>
              Explore NFTs
            </Button>
          </VStack>

          <VStack align="left">
            <TaskTitle>Key Features:</TaskTitle>
            <Task>Mint fractional shares of your favorite NFTs</Task>
            <Task>Sell royalty shares to other users</Task>
            <Task>
              Connect your wallet to manage your fractional NFT portfolio
            </Task>
            <Task>Real-time ownership verification and share distribution</Task>
          </VStack>

          <VStack align="left">
            <TaskTitle>Benefits:</TaskTitle>
            <Task>
              Democratize NFT ownership by allowing partial investments
            </Task>
            <Task>Increase liquidity in the NFT market</Task>
            <Task>Earn passive income through royalty shares</Task>
            <Task>Participate in the governance of high-value NFTs</Task>
          </VStack>

          <VStack align="left">
            <TaskTitle>Get Started:</TaskTitle>
            <Task>Connect your wallet to start exploring fractional NFTs</Task>
            <Task>Browse available NFTs or fractionalize your own</Task>
            <Task>Buy, sell, or trade fractional shares with ease</Task>
            <Task>
              Join our community and shape the future of NFT ownership
            </Task>
          </VStack>
        </VStack>
      </Container>
    </motion.div>
  );
}

function Task({ children }: { children: React.ReactNode }) {
  return (
    <HStack gap={4}>
      <CheckIcon fontSize="xl" color="green.500" />
      <Text fontSize="xl">{children}</Text>
    </HStack>
  );
}

function TaskTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h3" fontSize="xl" textAlign="left" my={2}>
      {children}
    </Heading>
  );
}

export default Home;
