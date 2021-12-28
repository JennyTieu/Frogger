import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default SettingsScreen = ({navigation}) => {
  const { colors } = useTheme();
  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const ids = profileData.profiles.filter(item => item.id);
  var id = "";

  useEffect(async () => {
      try {
        const value = await AsyncStorage.getItem('storedId')
        if(value !== null) {
          // value previously stored
        }
        id = value
      } catch(e) {
        // error reading value
      }
  }, [])

  return(
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
      
      </View>
      <View style={styles.middleContainer}>
        <Button title="Design" titleStyle={{color: colors.primary}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card}} type="clear" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10 }}/>} onPress={() => (navigation.navigate("Design"))}/>
        <Button title="Account" titleStyle={{color: colors.primary}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10}}/>} onPress={() => (console.log("Account"))}/>
        <Button title="Info" titleStyle={{color: colors.primary}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-information-circle-outline" size={28} style={{ marginRight: 10 }}/>} onPress={() => (navigation.navigate("Info"))}/>
        <Button title="Help" titleStyle={{color: colors.primary}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-help-buoy-outline" size={28} style={{ marginRight: 10 }}/>} onPress={() => (navigation.navigate("Help"))}/>
        <Button title="Sign out" titleStyle={{color: colors.primary}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-exit-outline" size={28} style={{ marginRight: 10 }}/>} onPress={signOut}/>
      </View>
      <View style={styles.bottomContainer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    justifyContent:"space-evenly"
  },
  topContainer: {
    flex: 1,
    justifyContent: "center"
  },
  middleContainer: {
    flex: 7,
    justifyContent: "space-evenly",
    //marginLeft: 20
  },
  bottomContainer: {
    flex: 1
  },
});