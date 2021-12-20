import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import InspectPostScreen from '../screens/InspectPostScreen';

const SearchStack = createStackNavigator();

export default SearchNavigator = () => {
  return (
    <SearchStack.Navigator initialRouteName="Search" screenOptions={{
      headerStyle: {height: 90, backgroundColor: "#D0D0D0"},
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: "black"
      }
    }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="PickedProfile" component ={OtherProfileScreen}/>
      <SearchStack.Screen name="InspectPost" component={InspectPostScreen} />
      
    </SearchStack.Navigator>
  );
};