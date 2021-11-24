import React, { useContext, useState } from 'react';
import {View, StyleSheet, Button, Text, TextInput} from "react-native";
import {Context} from '../data/Context';

export default LoginScreen = ({navigation}) => {

  const [profileData] = useContext(Context);
  const [currentInputLogin, setCurrentInputLogin] = useState("");
  const [currentInputPassword, setCurrentInputPassword] = useState("");
  const emails = profileData.profiles.filter(item => item.email);
  const passwords = profileData.profiles.filter(item => item.password);
  const [failMessage, setFailMessage] = useState("");

  const changeTextHandlerEmail = (enteredText) => {
    setFailMessage("")
    setCurrentInputLogin(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setFailMessage("")
    setCurrentInputPassword(enteredText);
  };

  const loginHandler = () => {
    for (let i = 0; i < emails.length; i++) {
      for (let j = 0; j < passwords.length; j++) {
        if (currentInputLogin == emails[i].email) {
          if (passwords[j].password == currentInputPassword) {
            navigation.navigate('MainNavigator')
          } else {
            setCurrentInputPassword('')
            setFailMessage("Wrong Password")
          }
        } else {
          setFailMessage("please insert email/password")
        }
      }
    }
  };

  return (
    <View>
      <View style={styles.topContainer}>
        <Text>LoginScreen</Text>
      </View>
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={changeTextHandlerEmail}
          value={currentInputLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={changeTextHandlerPassword}
          value={currentInputPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Login"
          onPress = {loginHandler}
        />
        <Button
          title="Registration"
          onPress={() => navigation.navigate('Registration')}
        />
        <Button
          title="HomeScreen"
          onPress={() => navigation.navigate('MainNavigator')}
        />
        <Text>{failMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sceenContainer: {
    flexDirection: "column"
  },
  topContainer: {
    flex: 1,
    padding: 20,
  },
  middleContainer: {
    //flex: 1,
  },
  bottomContainer: {
    //flex: 1,
    padding: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});