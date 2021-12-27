import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default SettingsScreen = () => {
  const {signIn, signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const ids = profileData.profiles.filter(item => item.id);
  var neu = "";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('storedId')
      if(value !== null) {
        // value previously stored
      }
      neu = value
    } catch(e) {
      // error reading value
    }
  }

  const placeholder = () => {
    console.log(profileData.idCounterProfiles)
  };


  return(
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text>Signed in!</Text>
      </View>
      <View style={styles.middleContainer}>
        <Button title="Design" buttonStyle={{ justifyContent: 'flex-start' }} type="clear" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10 }}/>} onPress={getData}/>
        <Button title="Account" buttonStyle={{ justifyContent: 'flex-start' }} type="clear" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10}}/>} onPress={placeholder}/>
        <Button title="Info" buttonStyle={{ justifyContent: 'flex-start' }} type="clear" icon={<Ionicons name="md-information-circle-outline" size={28} style={{ marginRight: 10 }}/>} onPress={placeholder}/>
        <Button title="Help" buttonStyle={{ justifyContent: 'flex-start' }} type="clear" icon={<Ionicons name="md-help-buoy-outline" size={28} style={{ marginRight: 10 }}/>} onPress={placeholder}/>
        <Button title="Sign out" buttonStyle={{ justifyContent: 'flex-start' }} type="clear" icon={<Ionicons name="md-exit-outline" size={28} style={{ marginRight: 10 }}/>} onPress={signOut}/>
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
    flex: 1
  },
  middleContainer: {
    flex: 3,
    justifyContent: "space-evenly",
    marginLeft: 20
  },
  bottomContainer: {
    flex: 1
  },
});