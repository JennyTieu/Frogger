import React from 'react';
import {View, StyleSheet} from "react-native";

export default InfoScreen = () => { 
  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>

      </View>
      <View style={styles.middleContainer}>

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