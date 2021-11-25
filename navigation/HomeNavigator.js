import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {height: 110, backgroundColor: "grey"},
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      
    </HomeStack.Navigator>
  );
};