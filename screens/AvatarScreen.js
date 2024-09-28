import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import { LinearGradient } from "expo-linear-gradient";

export default class AvatarScreen extends React.Component {
  constructor(props) {
    super(props);
    const month = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const d = new Date();

    this.state = {
      suggestedLtrs: 0,
      date:
        new Date().getDate() +
        "-" +
        month[d.getMonth()] +
        "-" +
        new Date().getFullYear(),
      email: firebase.auth().currentUser.email,
      cupSize: "",
      intake: 0,
      intakeInLtrs: "",
      totalDayIntake: 100,
      docId: "",
      daysIntakeIsTrue: false,
      goalMet: false,
      avatarText: "Droppy is sad...",
    };
  }

  getUserDetails = async () => {
    await db
      .collection("users")
      .where("email", "==", this.state.email)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({
            suggestedLtrs: doc.data().suggestedLitres,
            cupSize: doc.data().cupSize,
          });
        });
      });
  };
  getIntake = async () => {
    var today = this.state.date;
    await db
      .collection("intake")
      .doc(this.state.email)
      .onSnapshot((doc) => {
        if (doc.data()[today]) {
          this.setState({ totalDayIntake: doc.data()[today] });
        }
      });
    if (0 < parseInt(this.state.suggestedLtrs)) {
      this.setState({ titleText: "Don't forget to hydrate!" });
    }
  };
  componentDidMount = async () => {
    await this.getUserDetails();
    await this.getIntake();
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/Background1.png")}
        style={styles.container}
      >
        <Header
          style={{ alignItems: "center" }}
          centerComponent={{
            text: "Avatar",
            style: {
              fontWeight: "bold",
              fontSize: 19,
              color: "#fff",
            },
          }}
          rightComponent={
            <TouchableOpacity>
              <Icon
                name="logout"
                type="material-icons"
                color="#ffffff"
                onPress={() => {
                  this.logout();
                }}
              />
            </TouchableOpacity>
          }
          backgroundColor={"#4287f5"}
        />
        <View
          style={{
            paddingTop: "50%",
            paddingBottom: "50%",
            alignItems: "center",
            justifyContent: "center",
            padding: "20%",
            height: "100%",
          }}
        >
          <Text
            style={{
              color: "#4287f5",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: "10%",
            }}
          >
            {parseInt(this.state.totalDayIntake) >
            this.state.suggestedLtrs * 1000
              ? "Droppy's really happy!"
              : "Aww...Droppy's sad."}
          </Text>
          <Image
            style={{ height: "150%", width: 200 }}
            source={
              parseInt(this.state.totalDayIntake) >
              this.state.suggestedLtrs * 1000
                ? require("../assets/happy.png")
                : require("../assets/sad.png")
            }
          ></Image>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4.15%",
  },
});
