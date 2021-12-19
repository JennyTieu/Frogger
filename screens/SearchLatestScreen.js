import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostTileList from '../components/PostTileList';

export default SearchLatestScreen =({route,navigation})=>{
  const Moment = require('moment');
  const { signOut } = useContext(AuthContext);
  const [profileData] = useContext(Context);
  const sortedPosts = route.params.data.sort(function(a,b){
    var dateA = new Moment(a.date),
      dateB = new Moment(b.date)
    return dateB-dateA
  });
    
    return(
        <View style={{height:'100%'}}>
          <View  style={styles.container}>
            <PostTileList listData ={sortedPosts} navigation={navigation} root="Search"/>
          </View>
          
          
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
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