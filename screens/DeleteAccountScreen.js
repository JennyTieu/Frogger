import React from 'react';
import {View, Text, StyleSheet} from "react-native";

export default DeleteAccountScreen = () => { 
  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text>Delete Account</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text>Deleting your Account will remove all of your information from our database. This cannot be undone. If your are sure, type in your password below:</Text>
      </View>
      <View style={styles.bottomContainer}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  topContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1
  },
});