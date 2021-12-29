import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, } from "react-native";
import { Context } from '../data/Context';
import { AuthContext } from '../data/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostTileList from '../components/PostTileList';

export default ProfilePostScreen = ({ route, navigation }) => {
  
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
  const Moment = require('moment');
  const [profileData] = useContext(Context);
  const posts = profileData.posts.filter(item => item.userId == id);

  const sortedPosts = posts.sort(function (a, b) {
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB - dateA
  });

  return (
    <View style={{ height: '100%' }}>
      <View style={styles.container}>
        <PostTileList listData={sortedPosts} navigation={navigation} root="Profile" />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})