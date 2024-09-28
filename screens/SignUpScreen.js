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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase";
import db from "../config";
import { LinearGradient } from "expo-linear-gradient";

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      borderColorState: "#ffffff",
      borderColorState2: "#ffffff",
      borderColorState3: "#ffffff",
      emailId: "",
      password: "",
      passwordConfirmed: "",
    };
  }
  signUp = (email, password, confirmPassword) => {
    //checking if the password and confirm password are matching

    if (
      this.state.password != "" &&
      this.state.emailId != "" &&
      this.state.passwordConfirmed != ""
    ) {
      if (password != confirmPassword) {
        alert("Passwords don't match");
        Alert.alert("Passwords don't match");
      } else {
        //calling firebase signUp function
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            db.collection("users").doc(firebase.auth().currentUser.email).set({
              email: this.state.emailId,
              isFormFilled: false,
            });
            alert("User added successfully");
            this.props.navigation.navigate("Loading");
          })
          .catch((error) => {
            var errorcode = error.code;
            var errorM = error.message;
            console.log(errorM);
            alert(errorM);
          });
      }
    } else {
      alert("All fields must be filled to sign up.");
    }
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/Background2.png")}
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
            maxLength={40}
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
            onChangeText={(value) => this.setState({ emailId: value })}
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
          />
          <TextInput
            placeholder="Type your password"
            secureTextEntry
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
            onChangeText={(value) => this.setState({ password: value })}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "80%" }}
        >
          <Icon
            name="lock"
            type="feather"
            color={this.state.borderColorState3}
            size={"20%"}
          />
          <TextInput
            placeholder="Confirm your password"
            secureTextEntry
            style={[
              styles.inputStyle,
              { borderColor: this.state.borderColorState3 },
            ]}
            placeholderTextColor="#ffffff"
            onFocus={() => {
              this.setState({ borderColorState3: "#4287f5" });
            }}
            onBlur={() => {
              this.setState({ borderColorState3: "#ffffff" });
            }}
            onChangeText={(value) =>
              this.setState({ passwordConfirmed: value })
            }
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
              this.signUp(
                this.state.emailId,
                this.state.password,
                this.state.passwordConfirmed
              );
              this.props.navigation.navigate("LoginScreen");
            }}
          >
            <Text
              style={{ color: "white", fontSize: "20%", fontWeight: "bold" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            this.props.navigation.navigate("LoginScreen");
          }}
        >
          <Text
            style={{
              color: "#1d4d99",
              fontSize: "15%",
              textDecorationLine: "underline",
            }}
          >
            Login
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
