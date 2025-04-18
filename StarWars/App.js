import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Films from "./Films";
import Planets from "./Planets";
import Ships from "./Ships";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {Platform.OS === "ios" && (
        <Tab.Navigator>
          <Tab.Screen name="Films" component={Films} />
          <Tab.Screen name="Planets" component={Planets} />
          <Tab.Screen name="Ships" component={Ships} />
        </Tab.Navigator>
      )}
      {Platform.OS == "android" && (
        <Drawer.Navigator>
          <Drawer.Screen name="Films" component={Films} />
          <Drawer.Screen name="Planets" component={Planets} />
          <Drawer.Screen name="Ships" component={Ships} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
