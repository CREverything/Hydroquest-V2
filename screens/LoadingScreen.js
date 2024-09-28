import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class Loading extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(firebase.auth().currentUser.email)
          .get()
          .then((docs) => {
            if (docs.data().isFormFilled) {
              this.props.navigation.navigate('DashboardScreen');
            } else {
              this.props.navigation.navigate('FormScreen');
            }
          });
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
