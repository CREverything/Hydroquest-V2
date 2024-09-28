import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase";
import getAuth from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import db from "../config";

export default class FormScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      borderColorState: "#ffffff",
      borderColorState2: "#ffffff",
      borderColorState3: "#ffffff",
      borderColorState4: "#ffffff",
      borderColorState5: "#ffffff",
      nameError: "",
      email: firebase.auth().currentUser.email,
      name: "",
      age: "",
      weight: "",
      height: "",
      cupSize: "",
    };
  }

  addUserDetails = () => {
    if (
      this.state.name.length !== 0 &&
      this.state.weight.length !== 0 &&
      this.state.height.length !== 0 &&
      this.state.age.length !== 0 &&
      this.state.age.cupSize !== 0
    ) {
      var sl = parseInt(this.state.weight) / 30;
      db.collection("users").doc(this.state.email).update({
        email: this.state.email,
        name: this.state.name,
        age: this.state.age,
        weight: this.state.weight,
        height: this.state.height,
        isFormFilled: true,
        suggestedLitres: sl,
        cupSize: this.state.cupSize,
      });
      alert("Welcome to the App!");
    } else {
      alert("Input fields correctly");
    }
  };

  onChangedText = (text) => {
    this.setState({
      inputText: text.replace(/[A-Za-z]/g, ""),
    });
  };
  onChangedText2 = (text) => {
    this.setState({
      inputText2: text.replace(/[A-Za-z]/g, ""),
    });
  };
  onChangedText3 = (text) => {
    this.setState({
      inputText3: text.replace(/[A-Za-z]/g, ""),
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/Background3.png")}
        style={styles.container}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: "75%", height: "10%" }}
        ></Image>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="smile"
            type="feather"
            color={this.state.borderColorState}
            size={"20%"}
          />
          <TextInput
            placeholder="What's your name(optional)?"
            maxLength={"20%"}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState: "#1d4d99" });
            }}
            onBlur={() => {
              this.setState({ borderColorState: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ name: value });
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="hash"
            type="feather"
            color={this.state.borderColorState2}
            size={"20%"}
          />
          <TextInput
            placeholder="How old are you?"
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState2 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState2: "#1d4d99" });
            }}
            onBlur={() => {
              this.setState({ borderColorState2: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ age: value });
              this.onChangedText(value);
            }}
            keyboardType={"number-pad"}
            value={this.state.inputText}
            maxLength={2}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="scale-balance"
            type="material-community"
            color={this.state.borderColorState3}
            size={"20%"}
          />
          <TextInput
            placeholder="What's your weight(kg)?"
            maxLength={3}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState3 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState3: "#1d4d99" });
            }}
            onBlur={() => {
              this.setState({ borderColorState3: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ weight: value });
              this.onChangedText2(value);
            }}
            keyboardType={"number-pad"}
            value={this.state.inputText2}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="menu"
            type="feather"
            color={this.state.borderColorState4}
            size={"20%"}
          />
          <TextInput
            placeholder="What's your height(cm)?"
            maxLength={3}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState4 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState4: "#1d4d99" });
            }}
            onBlur={() => {
              this.setState({ borderColorState4: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ height: value });
              this.onChangedText3(value);
            }}
            keyboardType={"number-pad"}
            value={this.state.inputText3}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="cup"
            type="material-community"
            color={this.state.borderColorState5}
            size={"20%"}
          />
          <TextInput
            placeholder="What's your water cup size(ml)?"
            maxLength={3}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState5 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState5: "#1d4d99" });
            }}
            onBlur={() => {
              this.setState({ borderColorState5: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ cupSize: value });
            }}
            keyboardType={"number-pad"}
            value={this.state.cupSize}
          />
        </View>
        <LinearGradient
          colors={["#09c6f9", "#045de9"]}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.loginButton}
        >
          <TouchableOpacity
            onPress={() => {
              if (
                this.state.age.trim() === "" ||
                this.state.weight.trim() === "" ||
                this.state.height.trim() === ""
              ) {
                this.setState(() => ({
                  nameError: "Fill all required fields.",
                }));
              } else {
                this.setState(() => ({ nameError: null }));
                this.props.navigation.navigate("DashboardScreen");
                this.addUserDetails();
              }
            }}
          >
            <Text
              style={{ color: "white", fontSize: "20%", fontWeight: "bold" }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
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
  loginButton: {
    backgroundColor: "#4287f5",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: "5%",
    borderRadius: "100%",
    margin: "1%",
    marginTop: "4.5%",
  },
  inputStyle: {
    height: "100%",
    fontSize: "15%",
    fontWeight: "bold",
    padding: "1%",
    borderBottomWidth: "3%",
    borderColor: "#ffffff",
    margin: "2%",
    color: "#1d4d99",
    flex: 1,
    outline: "none",
  },
});
