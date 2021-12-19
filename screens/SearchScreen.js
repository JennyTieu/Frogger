import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, SearchBar} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostTileList from '../components/PostTileList';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchTopScreen from './SearchTopScreen';
import SearchLatestScreen from './SearchLatestScreen';
import SearchPeopleScreen from './SearchPeopleScreen';

const Tab = createMaterialTopTabNavigator();
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
  const [allPosts, setAllPosts] = useState(profileData.posts);
  const [allProfiles, setAllProfiles] = useState(profileData.profiles);
  const posts = profileData.posts;
  const profiles = profileData.profiles;
  const sortedPosts = posts.sort(function(a,b){
    var A = a.upvotes.length,
      B = b.upvotes.length
    return B-A
  });
  const trendingPosts = sortedPosts.slice(0,10);


  let postSearchBar = [];
  let profileSearchBar =[];
 
  
  const searchHandler=()=>{
    if (searchText === "") {
      setSearchValue(true);
    } else {
      postSearchBar.length = 0;  
      profileSearchBar.length = 0;  
      for (let i = 0; i < posts.length; i++) {
        if(posts[i].text!==null){
          if (posts[i].text.toLowerCase().includes(searchText.toLowerCase())) {
              postSearchBar.push(posts[i]);
              
           }
        }
      }
      
      for(let j = 0; j <profiles.length; j++){
        if(profiles[j].firstName.toLowerCase().includes(searchText.toLowerCase())||
        profiles[j].lastName.toLowerCase().includes(searchText.toLowerCase())||
        profiles[j].userName.toLowerCase().includes(searchText.toLowerCase())){
          profileSearchBar.push(profiles[j]);
        }
      }
    }
      setAllPosts(postSearchBar);
      setSearchValue(false);
    
  };

  const quitSearchHandler=()=>{
    setAllPosts(posts);
    setSearchValue(true);
  };
  
  const clearSearchBarHandler = () => {
    setSearchText("");
    setAllPosts(posts);
    setSearchValue(true);
  };




  if(searchValue===true){
    return(

      <View style={{height:'100%'}}>
          <View style={styles.topContainer}>
          <Button 
            type="clear"
            icon={searchValue === true ? <Ionicons name="md-search" size={20} color='grey'/> : <Ionicons name="md-arrow-undo-outline" size={22} color='grey'/>}
            onPress={searchValue === true? searchHandler : quitSearchHandler}
          />
          <SearchBar 
            placeholder="search ..."
            autoCorrect={false}
            value={searchText}
            containerStyle= {styles.searchBar}
            lightTheme="true"
            searchIcon={false}
            onChangeText={(val) => setSearchText(val)}
            onClear={clearSearchBarHandler}
          />
        </View>
        <View  style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Top 10 Picks</Text>
          </View>
          
          <PostTileList listData ={trendingPosts} navigation={navigation} root="Search"/>
        </View>
        
      </View>
    );
  }
  else{
    return(

      <View style={{height:'100%'}}>
          <View style={styles.topContainer}>
          <Button 
            type="clear"
            icon={searchValue === true ? <Ionicons name="md-search" size={20} color='grey'/> : <Ionicons name="md-arrow-undo-outline" size={22} color='grey'/>}
            onPress={searchValue === true? searchHandler : quitSearchHandler}
          />
          <SearchBar 
            placeholder="search ..."
            autoCorrect={false}
            value={searchText}
            containerStyle= {styles.searchBar}
            lightTheme="true"
            searchIcon={false}
            onChangeText={(val) => setSearchText(val)}
            onClear={clearSearchBarHandler}
          />
        </View>
        <View  style={styles.container}>
          <Tab.Navigator>
            <Tab.Screen name= "Top" component={SearchTopScreen} initialParams={{data: allPosts}}/>
            <Tab.Screen name= "Latest" component={SearchLatestScreen} initialParams={{data: allPosts}}/>
            <Tab.Screen name= "People" component={SearchPeopleScreen} initialParams={{data: allPosts}}/>
          </Tab.Navigator>
        </View>
        

      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  headerContainer:{
    padding:5,
    backgroundColor:"white",
  },
  header:{
    fontSize:25,
    fontWeight: "bold"
  },
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