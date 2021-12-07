import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";

export default LoginScreen = ({navigation}) => {
  const [profileData] = useContext(Context);
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
 
  const userNames = profileData.profiles.filter(item => item.userName);

  const changeTextHandlerUserName = (enteredText) => {
    setCurrentUserName(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const loginHandler = () => {
    for (let i = 0; i < userNames.length; i++) {
      if (userNames[i].userName == currentUserName && userNames[i].password == currentPassword) { 
        setUsername(currentUserName)
        setPassword(currentPassword)
        signIn({ username, password })
      } 
    }
  };

  const registrationHandler = () => {
    navigation.navigate("RegistrationScreen")
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
        <Button title="HomeScreen" type="solid" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10 }}/>} onPress={() => signIn({ username, password })}/>
        <Button title="Sign In" type="solid" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10 }}/>} onPress={loginHandler}/>
        <Button title="Registration" type="solid" icon={<Ionicons name="md-person-add-outline" size={28} style={{ marginRight: 10 }}/>} onPress={registrationHandler}/>
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
});