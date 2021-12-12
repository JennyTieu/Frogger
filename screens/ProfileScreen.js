import React, { useContext } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from '../data/AuthContext';
import { Context } from '../data/Context';
import PostTileList from '../components/PostTileList';
import ProfileTile from '../components/ProfileTile';

export default ProfileScreen = (navigation) => {
  const Moment = require('moment');
  const [profileData] = useContext(Context);
  const [personData] = useContext(Context);
  //hab als Bsp einfach user m1 genommen
  const persId = profileData.profiles[0].id
  const posts = profileData.posts.filter(item => item.userId == persId);
  const persData = personData.profiles.filter(item => item.id === persId);

  const sortedPosts = posts.sort(function (a, b) {
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB - dateA
  });

  return (
    <View style ={styles.itemContainer}>
      <View style={styles.topCont}>
        <ProfileTile data={persData} navigation={navigation} />
      </View>
      <View style={styles.bottomCont}>
        <Text style={{ fontWeight:'bold', fontSize: 16, color: 'black', paddingRight: 5 }}> Your Posts </Text>
        <PostTileList listData={sortedPosts} navigation={navigation} />
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  topCont: {
    flex: 1,
    flexWrap:'wrap',
  },

  bottomCont: {
    flex: 1,
  },
 
  itemContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'gray',
    borderBottomWidth: 0.5
  },
  
 
});