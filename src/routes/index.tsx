import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Recorder } from "../pages/Recorder";
import { RecorderList } from "../pages/RecorderList";

const StackNavigator = createStackNavigator();

const MainRoutes: React.FC = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "#182234",
        },
        headerBackTitleVisible: false,
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#182234",
        },
      }}
    >
      <StackNavigator.Screen
        name="Recorder"
        component={Recorder}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="RecorderList"
        component={RecorderList}
        options={{
          title: "Seus Audios",
        }}
      />
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
