import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import Color from '../constants/Colors';
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

  const changeTextHandlerUserName = (enteredText) => {
    setCurrentUserName(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const loginHandler = () => {
    for (let i = 0; i < profiles.length; i++) {
     
      if (profiles[i].email == currentUserName && profiles[i].password == currentPassword ||
        profiles[i].userName == currentUserName && profiles[i].password == currentPassword
      ) { 
        setUsername(currentUserName)
        setPassword(currentPassword)
        const id = profiles[i].id
        console.log(id)
        signIn({ id })
      } 
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
          leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10 }}/>}
          onChangeText={changeTextHandlerUserName}
          value={currentUserName}
        />
        <Input 
          placeholder="password"
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
          onChangeText={changeTextHandlerPassword}
          value={currentPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.middleContainer}>
        <Button titleStyle={{color: colors.primary}} buttonStyle={{ backgroundColor: colors.card }} title="Sign In" type="solid" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10 }}/>} onPress={loginHandler}/>
        <Button titleStyle={{color: colors.primary}} buttonStyle={{ backgroundColor: colors.card }} title="Registration" type="solid" icon={<Ionicons name="md-person-add-outline" size={28} style={{ marginRight: 10 }}/>} onPress={signUpHandler}/>
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
    backgroundColor: Color.card,
  },
  titleStyleButton: {
    color: Color.primary
  }
});