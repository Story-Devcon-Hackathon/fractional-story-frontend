import React, { ReactNode, useCallback, useState } from "react";

import Modal from "@/components/ui/Modal";

export interface ModalContextInterface {
  isOpen: boolean;
  close: () => void;
  open: (children: ReactNode) => void;
}

export const ModalContext = React.createContext<ModalContextInterface>({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  open: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(<></>);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback((children: ReactNode) => {
    setContent(children);
    setIsOpen(true);
  }, []);

  // const value = useMemo(() => ({ isOpen, close, open }), [isOpen, close, open]);

  return (
    <ModalContext.Provider value={{ isOpen, close, open }}>
      <>
        {children}
        <Modal isOpen={isOpen} onClose={close}>
          {content}
        </Modal>
      </>
    </ModalContext.Provider>
  );
}
