import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DesignScreen from '../screens/DesignScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import HelpScreen from '../screens/HelpScreen';

const ProfileStack = createStackNavigator();

export default SettingsNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Settings" screenOptions={{
      headerStyle: {height: 90},
      title:'Settings',
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
      <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{headerTitle:"SettingsScreen"}}/>
      <ProfileStack.Screen name="Design" component={DesignScreen} options={{headerTitle:"DesignScreen"}}/>
      <ProfileStack.Screen name="Info" component={InfoScreen} options={{headerTitle:"InfoScreen"}}/>
      <ProfileStack.Screen name="Help" component={HelpScreen} options={{headerTitle:"HelpScreen"}}/>
    </ProfileStack.Navigator>
  );
};