import { HStack, Text } from "@chakra-ui/react";

import React from "react";
import { SkeletonText } from "@chakra-ui/react";

export default function CardInfoText({
  value,
  label,
  isLoading,
}: {
  value: string | undefined;
  label: string;
  isLoading: boolean;
}): JSX.Element {
  return (
    <HStack w="100%" display="flex" justifyContent="space-between">
      <Text fontWeight="bold">{label}:</Text>
      {isLoading || value === undefined ? (
        <SkeletonText width="50px" noOfLines={1} />
      ) : (
        <Text>{value}</Text>
      )}
    </HStack>
  );
}
