import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import React,{useContext,useState} from "react";
import {StyleSheet, View, Text, FlatList,Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-elements";
import { Context } from "../data/Context";
import OptionsMenu from "react-native-option-menu";
import MenuDropdown from "./MenuDropdown";


export default PostTile =(props) =>{

    const [profileData,setProfileData] = useContext(Context);
    const id='m1'
    const [loggedUser] = profileData.profiles.filter(item => item.id ===id);
    const [userData] = profileData.profiles.filter(item => item.id === props.userId);

    const likedIcon = props.upvotes.includes(id) ? 'heart':'heart-outline';
    const markedIcon = 'bookmark-outline';
    const isFollowed = loggedUser.follows.includes(props.userId);

    const onDelete =(postId)=>{
        console.log("Delete "+postId);
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
            console.log("Navigate to User Profile "+pickedUserId);
        }
        
    };

    const onComment = (pickedPostId) =>{
        console.log("Navigate to CommentScreen "+ pickedPostId);
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

    if(props.image!==null){
        return(
            <View style={styles.itemContainer}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={() => onClick(props.userId)}
                    >
                        <Image style={styles.profileImage} source={userData.image}/>   
                    </TouchableOpacity>
                    
                </View>
                
                <View style={styles.mainContainer}>
                    <View style={styles.userCont}>
                        <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>@{userData.userName}</Text>
                        <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>• {props.date}</Text>
                    </View >
                    
                    <Text style={{ fontSize:15}}>{props.text}</Text>
                    
                    <Image style={styles.postImage} source={props.image}/>
                    
                    <View style={styles.buttonContainer}>
                        <View style={styles.singleButton}>
                            <Button
                                onPress={() => {onComment(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name='chatbubble-outline'
                                        size={30}
                                        color='gray'
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
                                        color='gray'
                                    />
                                }
                            />  
                            <Text>{props.upvotes.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={() => {}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={markedIcon}
                                        size={30}
                                        color='gray'
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
            <View style={styles.itemContainer}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={() => onClick(props.userId)}
                    >
                        <Image style={styles.profileImage} source={userData.image}/>   
                    </TouchableOpacity>
                </View>
                
                <View style={styles.mainContainer}>
                    <View style={styles.userCont}>
                        <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>@{userData.userName}</Text>
                        <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>• {props.date}</Text>
                    </View >
                    
                    <Text style={{ fontSize:15}}>{props.text}</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.singleButton}>
                            <Button
                                onPress={() => {onComment(props.postId)}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name='chatbubble-outline'
                                        size={30}
                                        color='gray'
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
                                        color='gray'
                                    />
                                }
                            />  
                            <Text>{props.upvotes.length}</Text>
                        </View>
                        <View style={styles.singleButton}>
                            <Button
                                style={{width:'40%'}}
                                onPress={() => {}}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name={markedIcon}
                                        size={30}
                                        color='gray'
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
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
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
        backgroundColor: "white",
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