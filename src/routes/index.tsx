import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Recorder } from "../pages/Recorder";

const StackNavigator = createStackNavigator();

const MainRoutes: React.FC = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="Recorder" component={Recorder} />
    </StackNavigator.Navigator>
  );
};

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
};

export { Routes };
