import AlertModal from "@/components/AlertModal";
import React, { createContext, ReactNode, useContext, useState } from "react";

type AlertContextProps = {
  showAlert: (
    title: string,
    message: string,
    leftActionText?: string,
    rightActionText?: string,
    leftAction?: () => void,
    rightAction?: () => void
  ) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [leftActionText, setLeftActionText] = useState<string | undefined>();
  const [rightActionText, setRightActionText] = useState<string | undefined>();
  const [leftAction, setLeftAction] = useState<(() => void) | undefined>();
  const [rightAction, setRightAction] = useState<(() => void) | undefined>();

  const showAlert = (
    alertTitle: string,
    alertMessage: string,
    leftText?: string,
    rightText?: string,
    leftAct?: () => void,
    rightAct?: () => void
  ) => {
    setTitle(alertTitle);
    setMessage(alertMessage);
    setLeftActionText(leftText);
    setRightActionText(rightText);
    setLeftAction(() => leftAct);
    setRightAction(() => rightAct);
    setShowModal(true);
  };

  const hideAlert = () => {
    setShowModal(false);
    setTitle("");
    setMessage("");
    setLeftActionText(undefined);
    setRightActionText(undefined);
    setLeftAction(undefined);
    setRightAction(undefined);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AlertModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        message={message}
        leftAction={leftAction}
        rightAction={rightAction}
        leftActionText={leftActionText}
        rightActionText={rightActionText}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
