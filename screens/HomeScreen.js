import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostTileList from '../components/PostTileList';


export default HomeScreen = ({navigation}) => {

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          type="clear" 
          icon={<Ionicons 
            name="search" 
            size={30} 
            color='black'/>} 
          onPress={() => {}}
        />)
    });
  },[navigation]);

  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const [accountData] = profileData.profiles.filter(item => item.id === "m1");
  const posts = profileData.posts.filter(item => accountData.follows.includes(item.userId));


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