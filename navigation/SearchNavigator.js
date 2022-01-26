import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import InspectPostScreen from '../screens/InspectPostScreen';
import { useTheme } from '@react-navigation/native';

const SearchStack = createStackNavigator();

export default SearchNavigator = () => {
  const { colors } = useTheme();
  return (
    <SearchStack.Navigator initialRouteName="Search" screenOptions={{
      headerStyle: {height: 90},
      title:'Search',
      headerTitleStyle: {
        fontSize: 40,
        color: colors.text,
        fontFamily: "dancing-script",
      },
      headerTitleAlign: 'center',
    }}>
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} options={{headerTitle:"Search"}}/>
      <SearchStack.Screen name="PickedProfile" component ={OtherProfileScreen} options={{headerTitle:"Profile"}}/>
      <SearchStack.Screen name="InspectPost" component={InspectPostScreen} options={{headerTitle:"Comments"}}/>
      <SearchStack.Screen name="Followers" component ={FollowerScreen} options={{headerTitle:"Followers"}}/>
      <SearchStack.Screen name="Follows" component ={FollowsScreen} options={{headerTitle:"Follows"}}/>
     
    </SearchStack.Navigator>
  );
};