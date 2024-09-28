import * as React from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import AvatarScreen from "../screens/AvatarScreen";
import SettingScreen from "../screens/SettingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppStackNavigator } from "../components/AppStackNavigator";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        labeled={false}
        barStyle={styles.bottomTabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, backgroundColor, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home-variant" : "home-variant-outline";
            } else if (route.name === "Pet") {
              iconName = focused ? "graph" : "graph-outline";
            } else if (route.name === "SettingScreen") {
              iconName = focused
                ? "account-settings"
                : "account-settings-outline";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={25}
                color={"white"}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={"#fff"}
        inactiveColor={"#fff"}
      >
        <Tab.Screen name="Home" component={AppStackNavigator} />
        <Tab.Screen name="Pet" component={AvatarScreen} />
        <Tab.Screen name="SettingScreen" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#4287f5",
    height: "8%",
    overflow: "hidden",
    position: "absolute",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icons: {
    width: 40,
    height: 40,
  },
});
