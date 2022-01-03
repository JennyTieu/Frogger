import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../data/AuthContext';
import { Context } from '../data/Context';
import ProfileTile from '../components/ProfileTile';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfilePostScreen from './ProfilePostScreen';
import BookmarkScreen from './BookmarkScreen';

const Tab = createMaterialTopTabNavigator();
export default ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [id, setId] = useState("")

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('storedId')
      if (value !== null) {
        // value previously stored
      }
      setId(value);
      setId(value);
    } catch (e) {
      // error reading value
    }
  }, [])
  const addPost=()=>{
    navigation.navigate("AddPost");
  };
  
  const [personData] = useContext(Context);
  const profile = personData.profiles.filter(item => item.id.includes(id));

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.itemContainer, { backgroundColor: colors.background }]}>
        <View style={styles.topCont}>
          <ProfileTile data={profile} navigation={navigation} root="Profile" />
        </View>
        <View style={styles.bottomCont}>
          <Tab.Navigator>
            <Tab.Screen name = "Posts" component={ProfilePostScreen} />
            <Tab.Screen name = "Bookmarks" component={BookmarkScreen}/>
          </Tab.Navigator>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
        onPress={addPost}
      >
        <Ionicons name='create' size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

}
const styles = StyleSheet.create({
  topCont: {
    flex: 1,
    flexWrap: 'wrap',
  },

  bottomCont: {
    flex: 1.5,
    width: '99%',
  },

  itemContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    borderColor: 'gray',
    borderBottomWidth: 0.5
  },
  floatingButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 13,
    right: 13,
    width: 55,
    height: 55,
    backgroundColor: "#3996FF",
    borderRadius: 100,
  },

});