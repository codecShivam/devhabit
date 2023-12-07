// VerificationContext.js
import React, { createContext, useContext, useState } from "react";

const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const [verificationState, setVerificationState] = useState({
    userResponse: "",
    feedbackResponse: "",
    ratingResponse: "",
    descriptionResponse: "",
  });

  return (
    <VerificationContext.Provider
      value={{
        verificationState,
        setVerificationState,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerificationContext = () => {
  return useContext(VerificationContext);
};
