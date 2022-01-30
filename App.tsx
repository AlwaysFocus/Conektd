import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NativeBaseProvider } from "native-base";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import Colors from "./constants/Colors";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.screen}>
        <Header title="Conektd" />
        <HomeScreen />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
