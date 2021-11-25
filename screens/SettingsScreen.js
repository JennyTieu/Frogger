import React, {useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';

export default SettingsScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const ids =profileData.profiles.filter(item => item.id);

  return(
    <View>
      <View>
        <Text>SettingsScreen</Text>
        <Text>Signed in!</Text>
        <Button title="Sign out" onPress={signOut} />
      </View>
      <View>
        
      </View>
      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});