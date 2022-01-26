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
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="PickedProfile" component ={OtherProfileScreen}/>
      <SearchStack.Screen name="InspectPost" component={InspectPostScreen} />
      <SearchStack.Screen name="Followers" component ={FollowerScreen} />
      <SearchStack.Screen name="Follows" component ={FollowsScreen} />
     
    </SearchStack.Navigator>
  );
};