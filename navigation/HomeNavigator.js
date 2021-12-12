import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {height: 110, backgroundColor: "#D0D0D0"},
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SearchScreen" component ={HomeScreen}/>
      
    </HomeStack.Navigator>
  );
};