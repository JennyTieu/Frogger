import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
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
  const [profileData, setProfileData] = useContext(Context);
  const [accountData] = profileData.profiles.filter(item => item.id.includes(id));
  const [valid, setValid] = useState(false)

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

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.titletext}>Delete Account</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.text}>Deleting your Account will remove all of your information from our database. This cannot be undone. If your are sure, type in your password below:</Text>
        <Input 
          placeholder="password"
          placeholderTextColor = {colors.text}
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerPassword}
          value={currentPassword}
          secureTextEntry
          inputContainerStyle={{marginTop: 20}}
        />
      </View>
      <View style={styles.bottomContainer}>
      <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30 }} title="Delete Account" type="solid" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={deleteHandler}/>
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
    flex: 1,
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