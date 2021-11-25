import React, { useContext, useState } from 'react';
import {View, StyleSheet, Button, TextInput, Text} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default LoginScreen = ({navigation}) => {
  const [profileData] = useContext(Context);
  const { signIn } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
 
  const userNames = profileData.profiles.filter(item => item.userName);
  const passwords = profileData.profiles.filter(item => item.password);

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

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Username"
          onChangeText={changeTextHandlerUserName}
          value={currentUserName}
        />
        <TextInput
          placeholder="Password"
          onChangeText={changeTextHandlerPassword}
          value={currentPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.middleContainer}>
        <Button title="HomeScreen" onPress={() => signIn({ username, password })} />
        <Button title="Sign in" onPress={loginHandler} />
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
    
  },
  middleContainer: {
    
  },
  bottomContainer: {
    
  },
});