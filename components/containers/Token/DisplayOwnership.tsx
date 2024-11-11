import {
  Box,
  Button,
  HStack,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import WalletConnectButton from "@/components/ui/WalletConnectButton";
import { useWeb3React } from "@web3-react/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DisplayOwnership(): JSX.Element {
  const { active, account } = useWeb3React();
  const [sharesBought, setSharesBought] = useState(0);
  const [priceHistory, setPriceHistory] = useState([]);

  // Mock data for presale
  const totalShares = 10000;
  const sharesSold = 6500;
  const sharePrice = 0.1; // in ETH
  const maxPurchase = 100;

  const percentageSold = (sharesSold / totalShares) * 100;

  const gradientColors = [
    "linear(to-r, pink.600, green.600)",
    "linear(to-r, green.600, blue.600)",
    "linear(to-r, purple.600, orange.600)",
    "linear(to-r, yellow.600, pink.600)",
  ];

  useEffect(() => {
    // Generate random price history
    const generatePriceHistory = () => {
      const history = [];
      let price = sharePrice;
      for (let i = 30; i > 0; i--) {
        history.push({
          date: `Day ${i}`,
          price: price,
        });
        // Random price fluctuation
        price += (Math.random() - 0.5) * 0.01;
        price = Math.max(0.01, price); // Ensure price doesn't go below 0.01
      }
      setPriceHistory(history);
    };

    generatePriceHistory();
  }, []);

  const chartData = {
    labels: priceHistory.map((data) => data.date),
    datasets: [
      {
        label: "Share Price (ETH)",
        data: priceHistory.map((data) => data.price),
        fill: false,
        borderColor: gradientColors[0],
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: gradientColors[0],
        },
      },
      title: {
        display: true,
        text: "Share Price History",
        color: gradientColors[0],
      },
    },
    scales: {
      x: {
        ticks: {
          color: gradientColors[0],
        },
      },
      y: {
        ticks: {
          color: gradientColors[0],
        },
      },
    },
  };

  return (
    <Box bgColor="white" boxShadow="xl" borderRadius="lg" mt={4} p={6}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" bgClip="text" color="black">
          ERC20 Token Presale
        </Text>

        <Box height="300px">
          <Line data={chartData} options={chartOptions} />
        </Box>

        <HStack justifyContent="space-between">
          <Text>Shares Sold:</Text>
          <Text fontWeight="bold" bgClip="text" bgGradient={gradientColors[0]}>
            {sharesSold} / {totalShares}
          </Text>
        </HStack>

        <Progress
          value={percentageSold}
          height="32px"
          borderRadius="md"
          bg="black"
        >
          <Box
            width={`${percentageSold}%`}
            height="100%"
            bgColor={"black"}
            borderRadius="md"
          />
          <Box
            position="absolute"
            left="0"
            top="50%"
            transform="translateY(-50%)"
            fontWeight="bold"
            color="white"
            bgGradient={gradientColors[0]}
            width={`${percentageSold}%`}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {percentageSold.toFixed(1)}% Sold
          </Box>
        </Progress>

        <HStack justifyContent="space-between">
          <Text>Current Share Price:</Text>
          <Text fontWeight="bold" bgClip="text" bgGradient={gradientColors[0]}>
            {sharePrice.toFixed(3)} ETH
          </Text>
        </HStack>

        <Text>Amount to purchase:</Text>
        <Slider
          defaultValue={0}
          min={0}
          max={maxPurchase}
          step={1}
          onChange={(v) => setSharesBought(v)}
        >
          <SliderTrack bgGradient={gradientColors[0]}>
            <SliderFilledTrack bgGradient={gradientColors[0]} />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <HStack justifyContent="space-between">
          <Text>Shares to buy:</Text>
          <Text fontWeight="bold" bgClip="text" bgGradient={gradientColors[0]}>
            {sharesBought}
          </Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text>Total cost:</Text>
          <Text fontWeight="bold" bgClip="text" bgGradient={gradientColors[0]}>
            {(sharesBought * sharePrice).toFixed(3)} ETH
          </Text>
        </HStack>

        {active ? (
          <Button bg="black" color="white" isDisabled={sharesBought === 0}>
            Buy Shares
          </Button>
        ) : (
          <WalletConnectButton />
        )}
      </VStack>
    </Box>
  );
}
