import React, { createContext, useContext, useState } from "react";

const modelContext = createContext(null);

export const ModelProvider = ({ children }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [isSignupModalOpen, setIsSignupModelOpen] = useState(false);

  const closeModel = () => setIsModelOpen(false);

  const openModel = () => {
    setIsModelOpen(true);
  };

  //signup model
  const closeSignupModel = () => {
    setIsSignupModelOpen(false);
  };

  const openSignupModel = () => {
    setIsSignupModelOpen(true);
  };

  return (
    <modelContext.Provider
      value={{
        isModelOpen,
        setIsModelOpen,
        closeModel,
        openModel,
        isSignupModalOpen,
        closeSignupModel,
        openSignupModel,
      }}
    >
      {children}
    </modelContext.Provider>
  );
};

const useModel = () => {
  return useContext(modelContext);
};

export default useModel;
