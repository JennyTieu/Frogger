import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from "react-native";
import {Button, Input} from "react-native-elements";
import { useTheme } from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default DeleteAccountScreen = () => { 
  const { colors } = useTheme();
  const { signOut } = useContext(AuthContext);
  const [id, setId] = useState("")
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentOldEmail, setCurrentOldEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentEmail2, setCurrentEmail2] = useState("");
  const [profileData, setProfileData] = useContext(Context);
  const [accountData] = profileData.profiles.filter(item => item.id.includes(id));
  const [valid, setValid] = useState(false)
  const [validEmail, setValidEmail] = useState(false)

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

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };
  const changeTextHandlerOldEmail = (enteredText) => {
    setCurrentOldEmail(enteredText);
  };
  const changeTextHandlerEmail = (enteredText) => {
    setCurrentEmail(enteredText);
  };
  const changeTextHandlerEmail2 = (enteredText) => {
    setCurrentEmail2(enteredText);
  };

  const deleteHandler = () => {
    if (currentPassword == accountData.password) {
      setProfileData(profileData => ({
        profiles: profileData.profiles.filter(item => item.id !== "m1"),
        posts: profileData.posts.filter(item => item.userId !== "m1"),
        idCounterProfiles: profileData.idCounterProfiles,
        comments: profileData.comments.filter(item => item.userId !== "m1"),
        idCounterComments: profileData.idCounterComments,
        idCounterPosts: profileData.idCounterPosts
      }))
      setValid(true)
   } else {
    Alert.alert(
      "Error",
      "Wrong password",
      [{text: "Cancel"}],
      {cancelable: true}
    );
    setCurrentPassword("")
   }
  };

  if (valid) {
    Alert.alert(
      "Successful",
      "Your account has been deleted",
      [
        {
          text: "OK",
          onPress: (signOut),
        },
      ]
    );
    setValid(false)
  }

  const changeEmailHandler = () => {
    var profileToChange = profileData.profiles.find(profileItem => profileItem.id === id);

    if (currentOldEmail == profileToChange.email && currentEmail == currentEmail2) { 
      for (let i = 0; i < profileData.profiles.length; i++) { 
        if (profileData.profiles[i].email == currentEmail) {
          Alert.alert(
            "Error",
            "new e-mail already exists",
            [{  text: "Cancel"}],
            {cancelable: true}
          );
          setCurrentEmail("")
          setCurrentEmail2("")
          break;
        } else {
          setValidEmail(true)
          setValidEmail(true)
        }
      }
    } else {
      Alert.alert(
        "Error",
        "Invalid Input",
        [{text: "Cancel"}],
        {cancelable: true}
      );
      setCurrentEmail("")
      setCurrentEmail2("")
      setCurrentOldEmail("")
    }

    if (validEmail) {
      profileToChange.email = currentEmail;

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
        "Your email has successfully been changed. You will be logged out now",
        [{text: "OK", onPress: (signOut)}]
      );
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={[styles.titletext, {color: colors.text}]}>Account</Text>
      </View>
      <View style={styles.middleContainer}>
        <ScrollView><Text style={[styles.text, {color: colors.text}]}>To change your e-mail-address, insert your previous e-mail-address and then your new below:</Text>
          <Input 
            placeholder="previous email"
            placeholderTextColor = {colors.placeholderTextColor}
            inputStyle= {{color: colors.text}}
            leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
            onChangeText={changeTextHandlerOldEmail}
            value={currentOldEmail}
            inputContainerStyle={{marginTop: 20}}
          />
          <Input 
            placeholder="new email"
            placeholderTextColor = {colors.placeholderTextColor}
            inputStyle= {{color: colors.text}}
            leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
            onChangeText={changeTextHandlerEmail}
            value={currentEmail}
            inputContainerStyle={{marginTop: 20}}
          />
          <Input 
            placeholder="repeat new email"
            placeholderTextColor = {colors.placeholderTextColor}
            inputStyle= {{color: colors.text}}
            leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
            onChangeText={changeTextHandlerEmail2}
            value={currentEmail2}
            inputContainerStyle={{marginTop: 20}}
          />
          <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30, marginBottom: 30 }} title="Change Mail" type="solid" icon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={changeEmailHandler}/>
          <Text style={[styles.text, {color: colors.text}]}>Deleting your Account will remove all of your information from our database. This cannot be undone. If your are sure, insert your password below:</Text>
          <Input 
            placeholder="password"
            placeholderTextColor = {colors.placeholderTextColor}
            inputStyle= {{color: colors.text}}
            leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
            inputContainerStyle={{marginTop: 20}}
          />
          <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30 }} title="Delete Account" type="solid" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={deleteHandler}/>
        </ScrollView>
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