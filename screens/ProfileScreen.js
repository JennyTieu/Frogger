import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../data/AuthContext';
import { Context } from '../data/Context';
import PostTileList from '../components/PostTileList';
import ProfileTile from '../components/ProfileTile';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';

export default ProfileScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [id, setId] = useState("")

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('storedId')
      if(value !== null) {
        // value previously stored
      }
      setId(value);
      setId(value);
    } catch(e) {
      // error reading value
    }
  }, [])

  const Moment = require('moment');
  const [profileData] = useContext(Context);
  const [personData] = useContext(Context);
  const posts = profileData.posts.filter(item => item.userId == id);
  const profile = personData.profiles.filter(item => item.id.includes(id));

  const sortedPosts = posts.sort(function (a, b) {
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB - dateA
  });
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={[styles.itemContainer, {backgroundColor: colors.background}]}>
        <View style={styles.topCont}>
          <ProfileTile data={profile} navigation={navigation} root="Profile"/>
        </View>

        <View style={styles.bottomCont}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}> Your Posts </Text>
          <PostTileList listData={sortedPosts} navigation={navigation} root="Profile" />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.floatingButton, {backgroundColor: colors.card, borderColor: colors.primary}]}
        onPress={() => { }}
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