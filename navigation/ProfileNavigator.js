import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InspectPostScreen from '../screens/InspectPostScreen';
import FollowerScreen from '../screens/FollowerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FollowsScreen from '../screens/FollowsScreen';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import { useTheme } from '@react-navigation/native';
import AddPostScreen from '../screens/AddPostScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const ProfileStack = createStackNavigator();

export default ProfileNavigator = () => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator initialRouteName="Profile" screenOptions={{
      headerStyle: {height: 90},
      title:'Profile',
      headerTitleStyle: {
        fontSize: 40,
        color: colors.text,
        fontFamily: "dancing-script",
      },
      headerTitleAlign: 'center',
    }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerTitle:"Profile"}}/>
      <ProfileStack.Screen name="Followers" component ={FollowerScreen} options={{headerTitle:"Followers"}}/>
      <ProfileStack.Screen name="PickedProfile" component = {OtherProfileScreen} options={{headerTitle:"Profile"}}/>
      <ProfileStack.Screen name ="Follows" component ={FollowsScreen} options={{headerTitle:"Follows"}}/>
      <ProfileStack.Screen name ="InspectPost" component={InspectPostScreen} />
      <ProfileStack.Screen name ="AddPost" component={AddPostScreen} options={{headerTitle:"AddPost"}}/>
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{headerTitle:"Edit Profile"}}/>
    </ProfileStack.Navigator>
  );
};