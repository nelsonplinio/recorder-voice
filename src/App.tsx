import React from "react";
import "react-native-gesture-handler";
import { Routes } from "./routes";
import { AppProvider } from "./hooks";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
