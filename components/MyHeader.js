import React from "react";
import { StatusBar } from "expo-status-bar";
import { Header, Icon, Badge } from "react-native-elements";
import { StyleSheet, Text, View } from "react-native";

export default class MyHeader extends Component {
  render() {
    return (
      <Header
        centerComponent={{
          text: this.props.title,
          style: { color: "#ffffff", fontSize: 20, fontWeight: "bold" },
        }}
        backgroundColor="#32867d"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
