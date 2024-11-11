import {
  ModalBody,
  ModalCloseButton,
  Modal as ModalComponent,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  onClose,
}: Props): JSX.Element {
  return (
    <ModalComponent onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody px="6" pb="6">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalComponent>
  );
}
