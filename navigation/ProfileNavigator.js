import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';

const ProfileStack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{
      headerStyle: {height: 90, backgroundColor: "#D0D0D0"},
      title:'Profile',
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Followers" component ={FollowerScreen} options={{headerTitle:"Followers"}}/>
      <ProfileStack.Screen name ="Follows" />
    </ProfileStack.Navigator>
  );
};