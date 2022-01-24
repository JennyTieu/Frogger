import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text, Alert} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';

export default LoginScreen = ({navigation}) => {
  const { colors } = useTheme();

  const [profileData] = useContext(Context);
  const { signIn, signUp } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  const userNames = profileData.profiles.filter(item => item.userName);
  const profiles = profileData.profiles;

  var login = false;

  const changeTextHandlerUserName = (enteredText) => {
    setCurrentUserName(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const loginHandler = () => {
    for (let i = 0; i < profiles.length; i++) {
      if (currentPassword !== "" && currentUserName !== "")
        if (profiles[i].email == currentUserName && profiles[i].password == currentPassword ||
          profiles[i].userName == currentUserName && profiles[i].password == currentPassword
        ) { 
          login = true
          setUsername(currentUserName)
          setPassword(currentPassword)
          const id = profiles[i].id
          console.log(id)
          console.log(profileData.profiles.length)
          signIn({ id })
        } 
    }

    if (login == false) {
      Alert.alert(
        "Error",
        "Ivalid Input",
        [
          {
            text: "Cancel",
          },
        ],
        {
          cancelable: true,          
        }
      );
      setCurrentUserName("")
      setCurrentPassword("")
    }
  };

  const signUpHandler = () => {
    signUp()
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Input 
          placeholder="mail/username"
          placeholderTextColor = {colors.text}
          leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerUserName}
          value={currentUserName}
        />
        <Input 
          placeholder="password"
          placeholderTextColor = {colors.text}
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>}
          onChangeText={changeTextHandlerPassword}
          value={currentPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.middleContainer}>
        <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30 }} title="Sign In" type="solid" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={loginHandler}/>
        <Button titleStyle={{color: colors.text}} buttonStyle={{ backgroundColor: colors.card, borderRadius:30 }} title="Registration" type="solid" icon={<Ionicons name="md-person-add-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={signUpHandler}/>
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "flex-end"
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    margin: 30,
  },
  bottomContainer: {
    flex: 1
  },
  button: {
    
  },
  titleStyleButton: {
    
  }
});