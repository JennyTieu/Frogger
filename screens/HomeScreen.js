import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostTileList from '../components/PostTileList';
import { useTheme } from '@react-navigation/native';

export default HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  // useLayoutEffect(()=> {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button 
  //         type="clear" 
  //         icon={<Ionicons 
  //           name="search" 
  //           size={30} 
  //           color='black'/>} 
  //         onPress={() => {}}
  //       />)
  //   });
  // },[navigation]);

  const Moment = require('moment');
  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const [accountData] = profileData.profiles.filter(item => item.id === "m1");
  const posts = profileData.posts.filter(item => accountData.follows.includes(item.userId));
  const sortedPosts = posts.sort(function(a,b){
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB-dateA
  });

 


  return(
    <View style={{height:'100%'}}>
      <View  style={styles.container}>
        <PostTileList listData ={sortedPosts} navigation={navigation} root="Home"/>
      </View>
      
      <TouchableOpacity
          style={[styles.floatingButton, {backgroundColor: colors.card, borderColor: colors.primary}]}
          onPress={()=>{}}
      >
        <Ionicons name='create' size={30} color={colors.primary}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 13,
    right: 13,
    width: 55,
    height: 55,
    borderRadius: 100,
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