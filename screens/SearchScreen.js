import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, SearchBar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostTileList from '../components/PostTileList';


export default SearchScreen = ({navigation}) => {

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
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState(true);
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
  let referencesSearchBar = [];
 
  


  return(

    <View style={{height:'100%'}}>
        <View style={styles.topContainer}>
        <Button 
          type="clear"
          icon={searchValue === true ? <Ionicons name="md-search" size={20} color='grey'/> : <Ionicons name="md-arrow-undo-outline" size={22} color='grey'/>}
          onPress={()=>{}}
        />
        <SearchBar 
          placeholder="search ..."
          autoCorrect={false}
          value={searchText}
          containerStyle= {styles.searchBar}
          lightTheme="true"
          searchIcon={false}
          onChangeText={()=>{}}
          onSubmitEditing={()=>{}}
          onClear={()=>{}}
        />
      </View>
      <View  style={styles.container}>
        <PostTileList listData ={sortedPosts} navigation={navigation}/>
      </View>
      
      <TouchableOpacity
          style={styles.floatingButton}
          onPress={()=>{}}
      >
        <Ionicons name='create' size={30} color="white"/>
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
  topContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});