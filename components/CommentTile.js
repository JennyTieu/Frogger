import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import React,{useContext,useState} from "react";
import {StyleSheet, View, Text, FlatList,Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-elements";
import { Context } from "../data/Context";
import MenuDropdown from "./MenuDropdown";
import moment from "moment";

export default CommentTile =(props) =>{

    const [profileData,setProfileData] = useContext(Context);
    const id='m1';
    const [loggedUser] = profileData.profiles.filter(item => item.id ===id);
    const [userData] = profileData.profiles.filter(item => item.id === props.userId);
    const isFollowed = loggedUser.follows.includes(props.userId);

    const onDelete =(commentId)=>{
        setProfileData(profileData => ({
            profiles: profileData.profiles,
            posts: profileData.posts,
            idCounterProfiles: profileData.idCounterProfiles,
            comments: profileData.comments.filter(commentItem =>commentItem.commentId !== commentId),
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

    
    return(
        <View style={styles.itemContainer}>
            <View style={styles.container}>

            
                <View style={styles.leftContainer}>
                        <TouchableOpacity 
                            onPress={() => {onClick(props.userId)}}
                        >
                            <Image style={styles.profileImage} source={userData.image}/>   
                        </TouchableOpacity>
                        
                </View>
                    
                    <View style={styles.mainContainer}>
                        <View style={styles.userCont}>
                            <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                            <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>@{userData.userName}</Text>
                            <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>• {moment(props.date).fromNow()}</Text>
                            
                        </View >
                        
                        <Text style={{ fontSize:15}}>{props.comment}</Text>
                
                        
                </View>
            </View>
            <View style={styles.buttonContainer}>
                        
                            <View style={styles.singleButton}>
                                <MenuDropdown data={props}  onDelete={()=>{onDelete(props.commentId)}} onFollow={()=>{onFollow(props.userId)}} followed={isFollowed}/>
                            </View>
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flexWrap:'wrap',
        flex:7,
        flexDirection:'row',
        backgroundColor: 'white',
        width:'95%',
        paddingVertical:10,
        paddingLeft:10
    },
    itemContainer:{
        flexWrap:'wrap',
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        borderColor:'gray',
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
        flex:1,
        width: '5%',
        paddingTop:5,
        backgroundColor: "white",
    },
    singleButton:{
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