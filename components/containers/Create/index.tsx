import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import Button from "@/components/ui/Buttons";
import { useState } from "react";

export default function Create(): JSX.Element {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement NFT creation logic here
      toast({
        title: "Success",
        description: "NFT created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create NFT",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={12}>
      <Box
        bg={bgColor}
        borderRadius="lg"
        p={8}
        boxShadow="xl"
        border="1px"
        borderColor={borderColor}
      >
        <VStack spacing={8} as="form" onSubmit={handleSubmit}>
          <Heading size="xl" textAlign="center" color="black">
            Create New NFT
          </Heading>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" color="black">
              Image URL
            </FormLabel>
            <Input
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
              borderRadius="md"
              focusBorderColor="black"
              color="black"
            />
          </FormControl>

          {imageUrl && (
            <Box
              borderWidth={1}
              borderRadius="md"
              p={4}
              borderColor={borderColor}
              w="full"
            >
              <Text mb={2} fontWeight="semibold" color="black">
                Preview:
              </Text>
              <Flex justifyContent="center">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  maxH="200px"
                  objectFit="contain"
                  borderRadius="md"
                />
              </Flex>
            </Box>
          )}

          <FormControl isRequired>
            <FormLabel fontWeight="bold" color="black">
              Name
            </FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter NFT name"
              borderRadius="md"
              focusBorderColor="black"
              color="black"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" color="black">
              Symbol
            </FormLabel>
            <Input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Enter NFT symbol"
              borderRadius="md"
              focusBorderColor="black"
              color="black"
            />
          </FormControl>

          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={!name || !symbol || !imageUrl}
            w="full"
            colorScheme="blackAlpha"
            size="lg"
            fontWeight="bold"
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.2s"
          >
            Create NFT
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
