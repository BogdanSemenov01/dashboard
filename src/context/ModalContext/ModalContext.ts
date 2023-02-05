import { createContext } from "react";

export const ModalContext = createContext({
  openModal: (modalConfig: any) => {},
  closeModal: () => {},
})