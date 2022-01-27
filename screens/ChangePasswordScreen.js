import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import {Button, Input} from "react-native-elements";
import { NavigationContainer, useTheme } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default ChangePasswordScreen = (navigation) => { 
  const { colors } = useTheme();
  const [id, setId] = useState("")
  const { signOut } = useContext(AuthContext);
  const [currentOldPassword, setCurrentOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPassword2, setCurrentPassword2] = useState("");
  const [profileData, setProfileData] = useContext(Context);
  const [accountData] = profileData.profiles.filter(item => item.id.includes(id));

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('storedId')
      if(value !== null) {
        // value previously stored
      }
      setId(value);
      setId(value);
    } catch(e) {
      // error reading value
    }
  }, [])

  const changeTextHandlerOldPassword = (enteredText) => {
    setCurrentOldPassword(enteredText);
  };
  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };
  const changeTextHandlerPassword2 = (enteredText) => {
    setCurrentPassword2(enteredText);
  };

  const changePasswordHandler = () => {
    var profileToChange = profileData.profiles.find(profileItem => profileItem.id === id);

    if (currentOldPassword == profileToChange.password && currentPassword == currentPassword2) {
      profileToChange.password = currentPassword;

      setProfileData(profileData => ({
        profiles: profileData.profiles,
        posts: profileData.posts,
        idCounterProfiles: profileData.idCounterProfiles,
        comments: profileData.comments,
        idCounterComments: profileData.idCounterComments,
        idCounterPosts: profileData.idCounterPosts
      }));

      Alert.alert(
        "Successful",
        "Your password has successfully been changed. You will be logged out now",
        [
          {
            text: "OK",
            onPress: (signOut),
          },
        ]
      );
    } else {
      Alert.alert(
        "Error",
        "Invalid Input",
        [{text: "Cancel"}],
        {cancelable: true}
      );
      setCurrentPassword("")
      setCurrentPassword2("")
      setCurrentOldPassword("")
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={[styles.titletext, {color: colors.text}]}>Change Password</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={[styles.text, {color: colors.text}]}>To change your password, please insert your previous and new password below:</Text>
        <Input 
          placeholder="previous password"
          placeholderTextColor = {colors.placeholderTextColor}
          inputStyle= {{color: colors.text}}
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerOldPassword}
          value={currentOldPassword}
          secureTextEntry
          inputContainerStyle={{marginTop: 20}}
        />
        <Input 
          placeholder="new password"
          placeholderTextColor = {colors.placeholderTextColor}
          inputStyle= {{color: colors.text}}
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerPassword}
          value={currentPassword}
          secureTextEntry
          inputContainerStyle={{marginTop: 20}}
        />
        <Input 
          placeholder="reapeat new password"
          placeholderTextColor = {colors.placeholderTextColor}
          inputStyle= {{color: colors.text}}
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerPassword2}
          value={currentPassword2}
          secureTextEntry
          
        />
      </View>
      <View style={styles.bottomContainer}>
      <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30 }} title="Change Password" type="solid" icon={<Ionicons name="md-finger-print-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={changePasswordHandler}/>
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
    justifyContent: "center",
    alignItems: "center"
  },
  middleContainer: {
    flex: 4,
    margin: 30,
  },
  bottomContainer: {
    flex: 1,
    margin: 30,
  },
  titletext: {
    fontSize: 25,
    fontWeight: "bold"
  },
  text: {
    fontSize: 18
  }
});