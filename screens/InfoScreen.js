import React from 'react';
import {View, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import { useTheme } from '@react-navigation/native';
import {ThemeContext} from '../data/ThemeContext';
import {Ionicons} from "@expo/vector-icons";

export default InfoScreen = () => { 
  const { colors } = useTheme();

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>

      </View>
      <View style={styles.middleContainer}>
        <Button title="App updates" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-enter-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={() => (console.log("Report problem"))}/>
        <Button title="Data policy" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-enter-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={() => (console.log("Data policy"))}/>
        <Button title="Data preferences" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-enter-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={() => (console.log("Data preferences"))}/>
        <Button title="Imprint" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-enter-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={() => (console.log("Imprint"))}/>
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
    flex: 7,
    justifyContent: "space-evenly",
  },
  bottomContainer: {
    flex: 1
  },
});