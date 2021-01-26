import React from "react";
import { RecorderProvider } from "./recorder";

const AppProvider: React.FC = ({ children }) => {
  return <RecorderProvider>{children}</RecorderProvider>;
};

export { AppProvider };
