import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import { Header, Icon } from "react-native-elements";

import firebase from "firebase";
import db from "../config";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Foundation, AntDesign, Entypo } from "@expo/vector-icons";

import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";

import tinycolor from "tinycolor2";

export default class HomeScreen extends React.Component {
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
      totalDayIntake: 0,
      cupSizeSelected: false,
      firstEntry: true,
      docId: "",
      color1: "#b1bfd8",
      color2: "#6782b4",
      borderColorState: "#c4c4c4",
      daysIntakeIsTrue: false,
      goalMet: false,
      titleText: "Start Drinking!",
      modalVisible: false,
      success: false,
      displayedTip:
        "Welcome to HydroQuest! Tap this bubble for some hydration-related tips!",
      modalVisible: false,
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
      this.setState({
        titleText: "Welcome to HydroQuest! Tap this for some tips!",
      });
    }
  };
  componentDidMount = async () => {
    this.getUserDetails();
    this.getIntake();
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Logged out");
        this.props.navigation.replace("LoginScreen");
      })
      .catch((error) => {
        alert("Something went wrong!Try Again");
      });
  };

  datesBlacklist = [
    moment().add(-1, "days"),
    moment().add(-2, "days"),
    moment().add(-3, "days"),
    moment().add(-4, "days"),
    moment().add(-5, "days"),
    moment().add(-6, "days"),
    moment().add(-7, "days"),
    moment().add(-8, "days"),
    moment().add(-9, "days"),
    moment().add(-10, "days"),
    moment().add(-11, "days"),
    moment().add(-12, "days"),
    moment().add(-13, "days"),
    moment().add(-14, "days"),
  ];

  render() {
    const { header_color } = this.props;
    var color2 = tinycolor(header_color);
    var text_color = color2.isDark() ? "#fff" : "#000";
    var calendarColor1 = "#ffffff0";
    var calendarColor2 = "#4287f5";
    var litresVal = this.state.suggestedLtrs;

    const { modalVisible } = this.state;
    return (
      <ImageBackground
        source={require("../assets/Background2.png")}
        style={styles.container}
      >
        <Header
          style={{ alignItems: "center" }}
          centerComponent={{
            text: "Home",
            style: {
              fontWeight: "bold",
              fontSize: "19%",
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
          leftComponent={
            <TouchableOpacity>
              <Icon
                name="info"
                type="feather"
                color="#ffffff"
                onPress={() => {
                  this.setModalVisible();
                }}
              />
            </TouchableOpacity>
          }
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[
                  styles.modalText,
                  { fontSize: "25%", color: "#1d478a" },
                ]}
              >
                Welcome to HydroQuest!{" "}
              </Text>
              <View style={{ marginTop: "5%" }}>
                <Text style={styles.modalText}>
                  1. Tap on the bubble below the header to see hydration-related
                  tips!
                </Text>
                <Text style={styles.modalText}>
                  2. To add your water intake, tap on the input that says "ml".
                </Text>
                <Text style={styles.modalText}>
                  3. To automatically add your cup size, click on the large
                  button below the input.
                </Text>
                <Text style={styles.modalText}>
                  4. After adding your intake, update it by pressing the green
                  checkmark!
                </Text>
                <Text style={styles.modalText}>
                  5. You can check your progress in the calendar at the bottom.
                </Text>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Icon name="cross" type="entypo" color="#1d478a" size={"35%"} />
              </Pressable>
            </View>
          </View>
        </Modal>

        <View
          style={{
            marginTop: "5%",
            flexDirection: "row",
            marginLeft: "2%",
            justifyContent: "center",
          }}
        >
          {/* <Image
            source={require("../assets/droppyHome.png")}
            style={{ width: "7.5%", height: "150%" }}
          ></Image> */}
          <TouchableOpacity
            style={{
              width: "85%",
              paddingTop: "1%",
              paddingLeft: "1%",
              paddingBottom: "2%",
              alignSelf: "center",
              borderRadius: "10%",
              backgroundColor: "#ADD8E6",
            }}
            onPress={() => {
              var tips = [
                "Try to drink water between intervals of 30-45 minutes instead of drinking it all at once",
                "Drink water in slow and small sips instead of large gulps",
                "Juices and smoothies are great options to hydrate, however try to avoid artificial drinks",
                "If you achieve your goal before the end of the day, continue hydrating frequently",
                "Do not drink excess water or your body's saline levels may drop",
              ];

              var chosenTip = Math.round(Math.random(tips.length) * 2);

              if (chosenTip != this.state.displayedTip) {
                this.setState({
                  displayedTip: tips[chosenTip],
                });
                console.log(chosenTip);
              }
            }}
          >
            <Text
              style={{
                paddingTop: "1%",
                color: "#4287f5",
                fontWeight: "bold",

                textAlign: "center",
              }}
            >
              {this.state.displayedTip}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#245fbd",
              fontSize: "20%",
              fontWeight: "bold",
              marginBottom: "2.5%",
              marginTop: "15%",
            }}
          >
            {this.state.titleText}
          </Text>

          <Text style={{ color: "#245fbd", fontWeight: "bold" }}>
            Your daily hydration goal is {litresVal} litres.
          </Text>

          <Text style={{ color: "#245fbd", marginTop: "1%" }}>
            Your current day intake is{" "}
            {(this.state.totalDayIntake / 1000).toFixed(2)} litres.
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <TextInput
                placeholder={"ml"}
                maxLength={3}
                style={[
                  {
                    height: "20%",
                    fontSize: "15%",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "7.5%",
                    marginTop: "10%",
                    borderBottomWidth: "3%",
                    borderColor: "#c4c4c4",
                    alignSelf: "center",
                    color: "#245fbd",
                    outline: "none",
                    width: "30%",
                  },
                  { borderColor: this.state.borderColorState },
                ]}
                onChangeText={(e) => {
                  this.setState({
                    intake: e,
                  });
                }}
                value={this.state.intake}
                onFocus={() => {
                  this.setState({ borderColorState: "#4287f5" });
                }}
                onBlur={() => {
                  this.setState({ borderColorState: "#c4c4c4" });
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <LinearGradient
                  colors={[this.state.color1, this.state.color2]}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: "100%",
                    width: 80,
                    padding: "1%",
                    height: 45,
                    marginRight: "5%",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    display: "inline-block",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        intake: this.state.cupSize,
                        color1: "#09c6f9",
                        color2: "#045de9",
                      });
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.cupSize} ml
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
                <LinearGradient
                  colors={["#5aff15", "#00b712"]}
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: "100%",
                    backgroundColor: "#4287f5",
                    width: 45,
                    padding: "5%",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginVertical: "%",
                    display: "inline-block",
                  }}
                >
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    onPress={() => {
                      this.recordIntake();
                    }}
                  >
                    <Entypo name="check" size={"24%"} color="white" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={["#0f9fdb", "#00192f6a"]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View>
            <CalendarStrip
              //calendarAnimation={{type: 'sequence', duration: 10}}

              daySelectionAnimation={{
                type: "border",
                duration: 200,
                borderWidth: 1,
                borderHighlightColor: text_color,
              }}
              style={{ height: "65%", paddingTop: "20%", paddingBottom: "2%" }}
              calendarHeaderStyle={{
                color: text_color,
              }}
              // calendarColor={{
              //   backgroundColor:
              //     linear - gradient([calendarColor1, calendarColor2]),
              // }}
              dateNumberStyle={{ color: text_color }}
              dateNameStyle={{ color: text_color }}
              highlightDateNumberStyle={{ color: "##0d2e63" }}
              highlightDateNameStyle={{ color: "##0d2e63" }}
              disabledDateNameStyle={{ color: "#b3e9ff" }}
              disabledDateNumberStyle={{ color: "#b3e9ff" }}
              selectedDate={moment()}
              datesBlacklist={this.datesBlacklist}
              scrollable={true}
              iconContainer={{ flex: 0.1 }}
              onDateSelected={(date2) => {
                console.log(date2);

                var totalUpdatedIntake =
                  parseInt(this.state.totalDayIntake) +
                  parseInt(this.state.intake);
                db.collection("intake")
                  .doc(this.state.email)
                  .set({
                    [this.state.date]: totalUpdatedIntake,
                  });

                let timestamp = new Date(date2).getTime();

                let day = new Date(timestamp).getDate();

                let month = new Date(timestamp).getMonth() + 1;
                let year = new Date(timestamp).getFullYear();

                var calenderDate = `${day}-${month}-${year}`;
                console.log(calenderDate);
                console.log(this.state.date);

                console.log(this.state.success);

                if (
                  totalUpdatedIntake > this.state.suggestedLtrs * 1000 &&
                  this.state.date === calenderDate
                ) {
                  alert("Task completed for today");
                } else {
                  alert("Task not completed for the day");
                }
              }}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  recordIntake = async () => {
    var totalUpdatedIntake =
      parseInt(this.state.totalDayIntake) + parseInt(this.state.intake);
    console.log(totalUpdatedIntake);
    console.log(this.state.suggestedLtrs);
    try {
      await db
        .collection("intake")
        .doc(this.state.email)
        .set({
          [this.state.date]: totalUpdatedIntake,
        });
      if (totalUpdatedIntake > this.state.suggestedLtrs * 1000) {
        this.setState({ success: true });
        this.setState({ titleText: "You met today's goal!" });
      }
    } catch (e) {
      console.log(e);
    }
  };
}

const styles = StyleSheet.create({
  containerCalender: {
    flex: 1,
    backgroundColor: "#0F52BA",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1%",
  },
  modalView: {
    margin: "25%",
    backgroundColor: "white",
    borderRadius: "35%",
    padding: "5%",
    width: "75%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: "0.5%",
    shadowRadius: "10%",
    elevation: "50%",
  },
  button: {
    borderRadius: "100%",
    padding: "10%",
    elevation: 2,
    marginTop: "3%",
  },
  buttonOpen: {
    backgroundColor: "#ffffff",
  },
  buttonClose: {
    backgroundColor: "#ffffff",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: "15%",
    color: "#4287f5",
    padding: "1.5%",
  },
  linearGradient: {
    paddingLeft: "5%",
    paddingRight: "5%",
    marginTop: "3.5%",
  },
});
