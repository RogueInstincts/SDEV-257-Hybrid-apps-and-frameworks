import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react"; 
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from "@react-native-community/netinfo";
import { Platform } from "react-native";
import Films from "./Films";
import Planets from "./Planets";
import Ships from "./Ships";
import Details from './Details';
import styles from './styles';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const connectedMap = {
  none: "Disconnected",
  unknown: "Disconnected",
  wifi: "Connected",
  cell: "Connected",
  mobile: "Connected",
};


function StackTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="list" component={Films} options={{headerShown:false}} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [connected, setConnected] = useState("");

  useEffect(() => {
    function onNetworkChange(connection) {
      setConnected(connectedMap[connection.type]);
    }

    const unsubscribe = NetInfo.addEventListener(onNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  if (connected == "Disconnected") {
    return (
    <View style={styles.centeredView}>
      <Text style={styles.text}>Sorry, cannot connect to the internet</Text>
    </View>
  );
  }
  else {
    return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Films" component={StackTabs} />
          <Tab.Screen name="Planets" component={Planets} />
          <Tab.Screen name="Ships" component={Ships} />
        </Tab.Navigator>
      )}
      {Platform.OS == "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Films" component={StackTabs} />
          <Drawer.Screen name="Planets" component={Planets} />
          <Drawer.Screen name="Ships" component={Ships} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
  }
}
