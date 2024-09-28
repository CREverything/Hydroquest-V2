import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import db from "../config";
import { navigationRef } from "../components/RootNavigation";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      borderColorState: "#ffffff",
      borderColorState2: "#ffffff",
      emailId: "",
      password: "",
      textEntry: true,
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users")
          .doc(firebase.auth().currentUser.email)
          .get()
          .then((docs) => {
            console.log(docs.data());
          });
        this.props.navigation.navigate("DashboardScreen");
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
        console.log(errorM);
        alert("The password or email address entered is incorrect.");
      });
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/Background1.png")}
        style={styles.container}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: "100%", height: "10%" }}
        ></Image>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="user"
            type="feather"
            color={this.state.borderColorState}
            size={"20%"}
          />
          <TextInput
            placeholder="Type your email"
            maxLength={"20%"}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState: "#4287f5" });
            }}
            onBlur={() => {
              this.setState({ borderColorState: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ emailId: value });
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="lock"
            type="feather"
            color={this.state.borderColorState2}
            size={"20%"}
            onPress={() => {
              if (this.state.textEntry == true) {
                this.setState({ textEntry: false });
              } else {
                this.setState({ textEntry: true });
              }
            }}
            onBlur={() => {
              this.setState({ secureTextEntry: true });
            }}
          />
          <TextInput
            placeholder="Type your password"
            secureTextEntry={this.state.textEntry}
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState2 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState2: "#4287f5" });
            }}
            onBlur={() => {
              this.setState({ borderColorState2: "#ffffff" });
            }}
            onChangeText={(value) => {
              this.setState({ password: value });
            }}
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
              this.login(this.state.emailId, this.state.password);
            }}
          >
            <Text
              style={{ color: "white", fontSize: "20%", fontWeight: "bold" }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            this.props.navigation.navigate("SignUpScreen");
          }}
        >
          <Text
            style={{
              color: "#4287f5",
              fontSize: "15%",
              textDecorationLine: "underline",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
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
    color: "#4287f5",
    flex: 1,
    outline: "none",
  },
});
