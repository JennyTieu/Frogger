import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeNavigator from "../navigation/HomeNavigator";

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'md-home' : 'md-home-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'md-person-circle' : 'md-person-circle-outline';
        } else if (route.name === 'Trending') {
          iconName = focused ? 'md-star' : 'md-star-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'md-settings' : 'md-settings-outline';
        }
          
      return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: 'grey',
      }}
    >
      <Tab.Screen name ="Home" component={HomeNavigator}/>
      <Tab.Screen name ="Trending" component={HomeNavigator}/>
      <Tab.Screen name ="Profile" component={HomeNavigator}/>
      <Tab.Screen name ="Settings" component={HomeNavigator}/>
    </Tab.Navigator>
  );
};

