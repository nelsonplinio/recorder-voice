import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { Routes } from "./routes";
import { AppProvider } from "./hooks";

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#182234" />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
};

export default App;
