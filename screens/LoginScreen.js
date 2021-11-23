import React, { useContext, useState } from 'react';
import {View, StyleSheet, Button, Text, TextInput} from "react-native";
import {Context} from '../data/Context';

export default LoginScreen = ({navigation}) => {

  const [profileData] = useContext(Context);
  const [currentInput, setCurrentInput] = useState("");

  const changeTextHandler = (enteredText) => {
    setCurrentInput(enteredText);
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
          onChangeText={changeTextHandler}
          value={currentInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={changeTextHandler}
          value={currentInput}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Login"
          onPress={() => navigation.replace('MainNavigator')}

        />
        <Button
          title="Registration"
          onPress={() => navigation.navigate('Registration')}
        />
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