import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import InspectPostScreen from '../screens/InspectPostScreen';
import FollowsScreen from '../screens/FollowsScreen';
import FollowerScreen from '../screens/FollowerScreen';
import { useTheme } from '@react-navigation/native';
import AddPostScreen from '../screens/AddPostScreen';

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{
      headerStyle: {height: 90},
      title:'Frogger',
      headerTitleStyle: {
        fontSize: 40,
        color: colors.text,
        fontFamily: "dancing-script",
      },
      headerTitleAlign: 'center',
    }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name ="Follows" component ={FollowsScreen} options={{headerTitle:"Follows"}}/>
      <HomeStack.Screen name="Followers" component ={FollowerScreen} options={{headerTitle:"Followers"}}/>
      <HomeStack.Screen name="PickedProfile" component ={OtherProfileScreen} options={{headerTitle:"Profile"}}/>
      <HomeStack.Screen name="InspectPost" component={InspectPostScreen} options={{headerTitle:"Comments"}}/>
      <HomeStack.Screen name="AddPost" component={AddPostScreen} options={{headerTitle:"Add Post"}}/>
      
    </HomeStack.Navigator>
  );
};