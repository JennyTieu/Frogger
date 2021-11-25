import React, { useContext, useState } from 'react';
import {View, StyleSheet, Button, TextInput} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.middleContainer}>
        <Button title="Sign in" onPress={() => signIn({ username, password })} />
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