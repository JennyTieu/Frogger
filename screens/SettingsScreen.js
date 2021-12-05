import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";

export default SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const ids = profileData.profiles.filter(item => item.id);

  return(
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text>SettingsScreen</Text>
        <Text>Signed in!</Text>
      </View>
      <View style={styles.middleContainer}>
        <Button title="Design "type="clear" icon={<Ionicons name="md-color-palette" size={28}/>} onPress={signOut}/>
        <Button title="Sign out" type="clear" icon={<Ionicons name="md-exit-outline" size={28}/>} onPress={signOut}/>
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
    flex: 3
  },
  bottomContainer: {
    flex: 1
  },
});