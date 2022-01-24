import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import HelpScreen from '../screens/HelpScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import { useTheme } from '@react-navigation/native';

const ProfileStack = createStackNavigator();

export default SettingsNavigator = () => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator initialRouteName="Settings" screenOptions={{
      headerStyle: {height: 90},
      title:'Settings',
      headerTitleStyle: {
        fontSize: 40,
        color: colors.text,
        fontFamily: "dancing-script",
      },
      headerTitleAlign: 'center',
    }}>
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{headerTitle:"Settings"}}/>
      <ProfileStack.Screen name="Info" component={InfoScreen} options={{headerTitle:"InfoScreen"}}/>
      <ProfileStack.Screen name="Help" component={HelpScreen} options={{headerTitle:"HelpScreen"}}/>
      <ProfileStack.Screen name="Account" component={DeleteAccountScreen} options={{headerTitle:"Account"}}/>
    </ProfileStack.Navigator>
  );
};