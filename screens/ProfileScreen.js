import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import { AuthContext } from '../data/AuthContext';
import {Context} from '../data/Context';
import PostTileList from '../components/PostTileList';

export default ProfileScreen = (navigation) => {
  const [profileData] = useContext(Context);
  //hab als Bsp einfach user m1 genommen
  const persId = profileData.profiles[0].id
  const posts = profileData.posts.filter(item => item.userId == "m1");


  console.log(posts)
  return(
    <View style={styles.container}>
      <PostTileList listData ={posts} navigation={navigation}/>
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  id: {
    fontSize: 32,
  },
});