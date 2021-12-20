import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import InspectPostScreen from '../screens/InspectPostScreen';

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {height: 90, backgroundColor: "#D0D0D0"},
      title:'Home',
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="PickedProfile" component ={OtherProfileScreen} options={{headerTitle:"Profile"}}/>
      <HomeStack.Screen name="InspectPost" component={InspectPostScreen} options={{headerTitle:"InspectPost"}}/>
      
    </HomeStack.Navigator>
  );
};