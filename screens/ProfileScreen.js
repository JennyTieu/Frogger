import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from '../data/AuthContext';
import { Context } from '../data/Context';
import PostTileList from '../components/PostTileList';
import ProfileTile from '../components/ProfileTile';
import { Ionicons } from '@expo/vector-icons';

export default ProfileScreen = (navigation) => {
  const Moment = require('moment');
  const [profileData] = useContext(Context);
  const [personData] = useContext(Context);
  //hab als Bsp einfach user m1 genommen
  const persId = profileData.profiles[0].id
  const posts = profileData.posts.filter(item => item.userId == persId);
  const profile = personData.profiles.filter(item => item.id === persId);

  const sortedPosts = posts.sort(function (a, b) {
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB - dateA
  });

  return (
    <View style = {{height: '100%'}}>
      <View style={styles.itemContainer}>
        <View style={styles.topCont}>
          <ProfileTile data={profile} navigation={navigation} />
        </View>
        <View style={styles.bottomCont}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', paddingRight: 5 }}> Your Posts </Text>
          <PostTileList listData={sortedPosts} navigation={navigation} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => { }}
      >
        <Ionicons name='create' size={30} color="white" />
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