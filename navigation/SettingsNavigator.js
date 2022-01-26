import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import HelpScreen from '../screens/HelpScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
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
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerTitle:"Settings"}}/>
      <ProfileStack.Screen name="Info" component={InfoScreen} options={{headerTitle:"Info"}}/>
      <ProfileStack.Screen name="Help" component={HelpScreen} options={{headerTitle:"Help"}}/>
      <ProfileStack.Screen name="Account" component={DeleteAccountScreen} options={{headerTitle:"Account"}}/>
      <ProfileStack.Screen name="Privacy" component={ChangePasswordScreen} options={{headerTitle:"Privacy"}}/>
    </ProfileStack.Navigator>
  );
};