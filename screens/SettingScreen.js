import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import { Header, Icon, Avatar } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";
import { navigationRef } from "../components/RootNavigation";
import * as RootNavigation from "../components/RootNavigation";
import { ScrollView } from "react-navigation";
import * as ImagePicker from "expo-image-picker";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: "",
      age: "",
      height: "",
      weight: "",
      image: "https://dummyimage.com/1000x800/208ec9/ffffff.png&text=Photo",
      cupSize: "",
      borderColorState: "#ffffff",
      borderColorState2: "#ffffff",
      borderColorState3: "#ffffff",
      borderColorState4: "#ffffff",
      borderColorState5: "#ffffff",
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            image: data.image,
            age: data.age,
            height: data.height,
            name: data.name,
            weight: data.weight,
            cupSize: data.cupSize,
          });
        });
      });
  };
  updateUserDetails = () => {
    var sl = parseInt(this.state.weight) / 30;
    var slc = sl.toFixed(2);
    db.collection("users").doc(firebase.auth().currentUser.email).update({
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      cupSize: this.state.cupSize,
      suggestedLitres: slc,
    });
    Alert.alert("Details updated successfully!");
    alert("Details updated successfully!");
  };

  componentDidMount() {
    this.fetchImage();
    this.getUserDetails();
    console.log(this.state.name);
  }

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

  onChangedText4 = (text) => {
    this.setState({
      inputText4: text.replace(/[A-Za-z]/g, ""),
    });
  };

  uploadImage = async (uri) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    return ref.put(blob).then((response) => {
      this.fetchImage();
    });
  };

  fetchImage = (x) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + this.state.userId);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({
          image: "https://dummyimage.com/1000x800/208ec9/ffffff.png&text=Photo",
        });
        alert("No Image Found");
      });
  };
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri);
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/Background3.png")}
        style={styles.container}
      >
        <Header
          style={{ alignItems: "center" }}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            />
          }
          centerComponent={{
            text: "Profile",
            style: {
              fontWeight: "bold",
              fontSize: 19,
              color: "#fff",
            },
          }}
          backgroundColor={"#4287f5"}
          rightComponent={
            <Icon
              name="logout"
              type="material-icons"
              color={"white"}
              onPress={() => {
                RootNavigation.navigate("LoginScreen ", {});
                firebase.auth().signOut();
              }}
            />
          }
        />
        <ScrollView
          style={{
            flex: 1,
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingTop: "13.5%",
          }}
        >
          <View style={[styles.container, { alignItems: "center" }]}>
            <Avatar
              containerStyle={{
                alignSelf: "center",
                margin: "10%",
                marginBottom: "1%",
                marginTop: "20%",
                width: "30%",
                height: "30%",
              }}
              rounded
              source={{ uri: this.state.image }}
              size="xlarge"
              onPress={() => {
                this.selectPicture();
              }}
            />

            <Text
              style={{
                paddingTop: "5%",
                fontWeight: "bold",
                fontSize: 20,
                color: "#ffffff",
              }}
            >
              {firebase.auth().currentUser.email}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Icon
                name="smile"
                type="feather"
                color={this.state.borderColorState}
                size={20}
              />
              <TextInput
                placeholder="What's your name(optional)?"
                maxLength={20}
                style={[
                  styles.inputStyle,
                  {
                    borderColor: this.state.borderColorState,
                  },
                ]}
                placeholderTextColor="#ffffff"
                onFocus={() => {
                  this.setState({ borderColorState: "#0e449c" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState: "#ffffff" });
                }}
                onChangeText={(value) => {
                  this.setState({ name: value });
                }}
                value={this.state.name}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Icon
                name="hash"
                type="feather"
                color={this.state.borderColorState2}
                size={20}
              />
              <TextInput
                placeholder="How old are you?"
                style={[
                  styles.inputStyle,
                  { borderColor: this.state.borderColorState2 },
                ]}
                placeholderTextColor="#ffffff"
                onFocus={() => {
                  this.setState({ borderColorState2: "#0e449c" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState2: "#ffffff" });
                }}
                onChangeText={(value) => {
                  this.setState({ age: value });
                  this.onChangedText(value);
                }}
                keyboardType={"number-pad"}
                value={this.state.age}
                maxLength={2}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Icon
                name="scale-balance"
                type="material-community"
                color={this.state.borderColorState3}
                size={20}
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
                  this.setState({ borderColorState3: "#0e449c" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState3: "#ffffff" });
                }}
                onChangeText={(value) => {
                  this.setState({ weight: value });
                  this.onChangedText2(value);
                }}
                keyboardType={"numeric"}
                value={this.state.weight}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Icon
                name="menu"
                type="feather"
                color={this.state.borderColorState4}
                size={20}
              />
              <TextInput
                placeholder="What's your height(cm)?"
                maxLength={3}
                style={[
                  styles.inputStyle,
                  {
                    borderColor: this.state.borderColorState4,
                  },
                ]}
                placeholderTextColor="#ffffff"
                onFocus={() => {
                  this.setState({ borderColorState4: "#0e449c" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState4: "#ffffff" });
                }}
                onChangeText={(value) => {
                  this.setState({ height: value });
                  this.onChangedText3(value);
                }}
                keyboardType={"numeric"}
                value={this.state.height}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Icon
                name="cup"
                type="material-community"
                color={this.state.borderColorState5}
                size={20}
              />
              <TextInput
                placeholder="What's your cup size(ml)?"
                maxLength={3}
                style={[
                  styles.inputStyle,
                  { borderColor: this.state.borderColorState5 },
                ]}
                placeholderTextColor="#ffffff"
                onFocus={() => {
                  this.setState({ borderColorState5: "#0e449c" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState5: "#ffffff" });
                }}
                onChangeText={(value) => {
                  this.setState({ cupSize: value });
                  this.onChangedText4(value);
                }}
                keyboardType={"numeric"}
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
                  this.updateUserDetails();
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#1d478a",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
    borderRadius: "100%",
    margin: "1%",
    marginTop: "7.5%",
  },
  inputStyle: {
    height: "100%",
    fontSize: "15%",
    fontWeight: "bold",
    padding: "1%",
    borderBottomWidth: "3%",
    borderColor: "#ffffff",
    margin: "3.5%",
    color: "#ffffff",
    flex: 1,
    outline: "none",
  },
  signOutButton: {
    backgroundColor: "red",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: "100%",
    margin: 10,
  },
})
