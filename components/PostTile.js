import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import React,{useContext,useState, useEffect} from "react";
import {StyleSheet, View, Text, FlatList,Image, TouchableOpacity} from 'react-native';
import { Button, colors } from "react-native-elements";
import { Context } from "../data/Context";
import MenuDropdown from "./MenuDropdown";
import moment from "moment";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default PostTile =(props) =>{
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

    const { colors } = useTheme();
    const [profileData,setProfileData] = useContext(Context);
    const [loggedUser] = profileData.profiles.filter(item => item.id.includes(id));
    const [userData] = profileData.profiles.filter(item => item.id === props.userId);
    const likedIcon = props.upvotes.includes(id) ? 'heart':'heart-outline';
    const markedIcon = loggedUser.bookmarks.includes(props.postId) ? 'bookmark':'bookmark-outline';
    const isFollowed = loggedUser.follows.includes(props.userId);

    const onDelete =(postId)=>{
        setProfileData(profileData => ({
            profiles: profileData.profiles,
            posts: profileData.posts.filter(postItem =>postItem.postId !== postId),
            idCounterProfiles: profileData.idCounterProfiles,
            comments: profileData.comments,
            idCounterComments: profileData.idCounterComments,
            idCounterPosts: profileData.idCounterPosts
        }))
    };

    const onFollow =(userId)=>{
        let itemToChange = profileData.profiles.find(profileItem => profileItem.id === id);
        if (loggedUser.follows.includes(userId)){
            itemToChange.follows.splice(itemToChange.follows.indexOf(userId),1);

            setProfileData(profileData =>({
                profiles: profileData.profiles.map(profile => profile.id === id? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }else{
            itemToChange.follows.push(userId);

            setProfileData(profileData =>({
                profiles: profileData.profiles.map(profile => profile.id === id? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }
        
    };
    
    const onClick = (pickedUserId) => {
        if(pickedUserId!== id){
            props.navigation.navigate(props.root,{screen:"PickedProfile", params:{userId:pickedUserId, root:props.root},});
        }
        
    };
    
    const onComment = (pickedPostId) =>{
        props.navigation.navigate(props.root,{screen:"InspectPost", params:{postId:pickedPostId,  root:props.root},})
        
    };

    const onLike =(pickedPostId) =>{
        let itemToChange =  profileData.posts.find(postItem => postItem.postId === pickedPostId);
        if(props.upvotes.includes(id)){
            itemToChange.upvotes.splice(itemToChange.upvotes.indexOf(id),1);

            setProfileData(profileData => ({
                profiles: profileData.profiles,
                posts: profileData.posts.map(post => post.postId === pickedPostId? itemToChange : post),
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }
        else{
            itemToChange.upvotes.push(id);
            setProfileData(profileData => ({
                profiles: profileData.profiles,
                posts: profileData.posts.map(post => post.postId === pickedPostId? itemToChange : post),
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }
    };

    const onMarked = (pickedPostId) =>{
        let itemToChange = profileData.profiles.find(profileItem => profileItem.id === id);
        if(itemToChange.bookmarks.includes(pickedPostId)){
            itemToChange.bookmarks.splice(itemToChange.bookmarks.indexOf(pickedPostId),1);
            setProfileData(profileData =>({
                profiles: profileData.profiles.map(profile => profile.id === id? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }else{
            itemToChange.bookmarks.push(pickedPostId);
            setProfileData(profileData =>({
                profiles: profileData.profiles.map(profile => profile.id === id? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }
        

    };

    if(props.image!==null){
        return(
            <View style={[styles.itemContainer, {backgroundColor: colors.background}]}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={() => onClick(props.userId)}
                    >
                        <Image style={styles.profileImage} source={userData.image}/>   
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.mainContainer}>
                    <View style={styles.userCont}>
                        <Text style={{fontWeight:'bold', fontSize:16, color:colors.text, paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize:15, color: colors.text, paddingHorizontal:2}}>@{userData.userName}</Text>
                        <Text style={{ fontSize:15, color:colors.text, paddingHorizontal:2}}>• {moment(props.date).fromNow()}</Text>
                    </View >
                    
                    <Text style={{ fontSize:15, color: colors.text}}>{props.text}</Text>
                    
                    <Image style={styles.postImage} source={props.image}/>
                    
                    <View style={[styles.buttonContainer, {backgroundColor: colors.background}]}>
                        <View style={styles.singleButton}>
                            <Button
                                onPress={() => {onComment(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name='chatbubble-outline'
                                        size={30}
                                        color={colors.primary}
                                    />
                                    
                                }
                            />
                            <Text>{props.commentIds.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={() => {onLike(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={likedIcon}
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                            />  
                            <Text>{props.upvotes.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={()=>{onMarked(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={markedIcon}
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                            />  
                        </View>
                        
                        <View style={styles.singleButton}>
                            <MenuDropdown data={props}  onDelete={()=>{onDelete(props.postId)}} onFollow={()=>{onFollow(props.userId)}} followed={isFollowed}/>
                        </View>
                    </View>
                </View>
                
                
            </View>
        );
    }else{
        return(
            <View style={[styles.itemContainer, {backgroundColor: colors.background}]}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={() => onClick(props.userId)}
                    >
                        <Image style={styles.profileImage} source={userData.image}/>   
                    </TouchableOpacity>
                </View>
                
                <View style={styles.mainContainer}>
                    <View style={styles.userCont}>
                        <Text style={{fontWeight:'bold', fontSize:16, color:colors.text, paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize:15, color:colors.text, paddingHorizontal:2}}>@{userData.userName}</Text>
                        <Text style={{ fontSize:15, color:colors.text, paddingHorizontal:2}}>• {moment(props.date).fromNow()}</Text>
                    </View >
                    
                    <Text style={{ fontSize:15, color: colors.text}}>{props.text}</Text>
                    <View style={[styles.buttonContainer, {backgroundColor: colors.background}]}>
                        <View style={styles.singleButton}>
                            <Button
                                onPress={() => {onComment(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name='chatbubble-outline'
                                        size={30}
                                        color={colors.primary}
                                    />
                                    
                                }
                            />
                            <Text>{props.commentIds.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={() => {onLike(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={likedIcon}
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                            />  
                            <Text>{props.upvotes.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={()=>{onMarked(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={markedIcon}
                                        size={30}
                                        color={colors.primary}
                                    />
                                }
                            />  
                        </View>
                        <View style={styles.singleButton}>
                            <MenuDropdown data={props}  onDelete={()=>{onDelete(props.postId)}} onFollow={()=>{onFollow(props.userId)}} followed={isFollowed}/>   
                        </View>
                    </View>
                </View>
                
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer:{
        flexWrap:'wrap',
        flex:1,
        flexDirection:'row',
        padding:15,
        borderBottomWidth:0.5
    },
    profileImage:{
        height: 50,
        width:50,
        backgroundColor: "black",
        borderRadius: 100,
    },
    leftContainer:{
        width:'15%'
    },
    mainContainer:{
        width:'85%',
        paddingLeft: 10
    },
    userCont:{
        flexWrap:'wrap',
        flexDirection:'row',
        paddingBottom:2,
        width:'100%',
    },
    buttonContainer:{
        flex: 1,
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    singleButton:{
        flexDirection:'row',
        alignItems: 'center',
        paddingRight:30
    },
    postImage:{
        height:350,
        width:"100%",
        resizeMode:'contain',
        backgroundColor:'black'
    },
});