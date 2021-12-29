import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeNavigator from "../navigation/HomeNavigator";
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchNavigator from './SearchNavigator';
import ProfileNavigator from './ProfileNavigator';
import SettingsNavigator from './SettingsNavigator';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  const { colors } = useTheme();
  return (
    
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'md-home' : 'md-home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'md-person-circle' : 'md-person-circle-outline';
        } else if (route.name === 'Search') {
          iconName = focused ? 'md-search' : 'md-search-outline';
        } else if (route.name === 'SettingsScreen') {
          iconName = focused ? 'md-settings' : 'md-settings-outline';
        }
          
      return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.primary,
    })}
    >
      <Tab.Screen name ="Home" component={HomeNavigator} options={{headerShown: false}}/>
      <Tab.Screen name ="Search" component={SearchNavigator}  options={{headerShown: false}}/>
      <Tab.Screen name ="Profile" component={ProfileNavigator} options={{headerShown: false}}/>
      <Tab.Screen name ="SettingsScreen" component={SettingsNavigator} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
};

