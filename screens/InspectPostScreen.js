import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet,Image, TextInput ,ScrollView, SafeAreaView} from "react-native";
import { TouchableOpacity } from 'react-native';
import { Button } from "react-native-elements";
import { Context } from '../data/Context';
import moment from "moment";
import MenuDropdown from '../components/MenuDropdown';
import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import CommentList from '../components/CommentList';
import { render } from 'react-dom';
import { useTheme } from '@react-navigation/native';

export default InspectPostScreen =(props) => {
    const { colors } = useTheme();
    const Moment = require('moment');
    const [commentText, setCommentText] = useState("");
    const [profileData, setProfileData] = useContext(Context);
    const id='m1';
    const postId= props.route.params.postId;
    const postData= profileData.posts.filter(item => item.postId === postId);
    const [loggedUser] = profileData.profiles.filter(item => item.id ===id);
    const userOfPost= profileData.profiles.filter(item=> item.id === postData[0].userId);
    const likedIcon = postData[0].upvotes.includes(id) ? 'heart':'heart-outline';
    const markedIcon = loggedUser.bookmarks.includes(postId) ? 'bookmark':'bookmark-outline';
    const isFollowed = loggedUser.follows.includes(postData[0].userId);
    const comments = profileData.comments.filter(item=> postData[0].commentIds.includes(item.commentId));
    const sortedComments = comments.sort(function(a,b){
        var dateA = new Moment(a.date),
            dateB = new Moment(b.date)
        return dateB-dateA
    });

    const onDelete =(post)=>{
        setProfileData(profileData => ({
            profiles: profileData.profiles,
            posts: profileData.posts.filter(postItem =>postItem.postId !== post),
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
            props.navigation.navigate(props.route.params.root,{screen:"PickedProfile", params:{userId:pickedUserId},});
        }
        
    };

    const onComment = (pickedPostId) =>{
        // props.navigation.navigate(props.root,{screen:"InspectPost", params:{postId:pickedPostId},})
        
    };

    const onLike =(pickedPostId) =>{
        let itemToChange =  profileData.posts.find(postItem => postItem.postId === pickedPostId);
        if(postData[0].upvotes.includes(id)){
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
    
        const getHeader =()=>{
            if(postData[0].image!==null){
                return(
                    <View style={[styles.topContainer, {backgroundColor: colors.background, borderColor: colors.primary}]}>
                        <TouchableOpacity
                        style={{flexDirection:'row', width:'100%'}}
                        onPress={()=>{onClick(postData[0].userId)}}
                        >
                            <Image style={styles.profileImage} source={userOfPost[0].image}/>
                            <View>
                            <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingHorizontal:10}}>{userOfPost[0].firstName} {userOfPost[0].lastName}</Text>
                                <Text style={{ fontSize:15, color:'gray', paddingHorizontal:10}}>@{userOfPost[0].userName}</Text>
                                
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize:15, paddingVertical:10}}>{postData[0].text}</Text>
                        <Image style={styles.postImage} source={postData[0].image}/>
                        <Text style={{ fontSize:15, color:'gray',  paddingVertical:10, borderBottomColor:'gray', borderBottomWidth:0.5}}>{moment(postData[0].date).format("h:mm a")} • {moment(postData[0].date).format("D MMM YY")}</Text>
                        <Text style={{ fontSize:15, color:'gray', paddingVertical:10, borderBottomColor:'gray', borderBottomWidth:0.5}}>{postData[0].commentIds.length} Comments  {postData[0].upvotes.length} Upvotes</Text>
                        <View style={styles.buttonContainer}>
                            <View style={styles.singleButton}>
                                <Button
                                    onPress={() => {}}
                                    type='clear'
                                    icon={
                                        <Ionicons
                                            name='chatbubble-outline'
                                            size={30}
                                            color='gray'
                                        />
                                        
                                    }
                                />
                                
                            </View>
                            <View style={styles.singleButton}>
                                <Button
                                    style={{width:'40%'}}
                                    onPress={() => {onLike(postId)}}
                                    type='clear'
                                    icon={
                                        <Ionicons
                                            name={likedIcon}
                                            size={30}
                                            color='gray'
                                        />
                                    }
                                />  
        
                            </View>
                            <View style={styles.singleButton}>
                                <Button
                                    style={{width:'40%'}}
                                    onPress={()=>{onMarked(postId)}}
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
                                <MenuDropdown data={postData[0]}  onDelete={()=>{onDelete(postId)}} onFollow={()=>{onFollow(postData[0].userId)}} followed={isFollowed}/>
                            </View>
                        </View>
                    </View>
                )
            }
            else{
                return (
                    
                        <View style={[styles.topContainer, {backgroundColor: colors.background, borderColor: colors.primary}]}>
                            <TouchableOpacity
                            style={{flexDirection:'row', width:'100%'}}
                            onPress={()=>{onClick(postData[0].userId)}}
                            >
                                <Image style={styles.profileImage} source={userOfPost[0].image}/>
                                <View>
                                <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingHorizontal:10}}>{userOfPost[0].firstName} {userOfPost[0].lastName}</Text>
                                    <Text style={{ fontSize:15, color:'gray', paddingHorizontal:10}}>@{userOfPost[0].userName}</Text>
                                    
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize:15, paddingVertical:10}}>{postData[0].text}</Text>
                            <Text style={{ fontSize:15, color:'gray', paddingVertical:10, borderBottomColor:'gray', borderBottomWidth:0.5}}>{moment(postData[0].date).format("h:mm a")} • {moment(postData[0].date).format("D MMM YY")}</Text>
                            <Text style={{ fontSize:15, color:'gray', paddingVertical:10, borderBottomColor:'gray', borderBottomWidth:0.5}}>{postData[0].commentIds.length} Comments  {postData[0].upvotes.length} Upvotes</Text>
                            <View style={styles.buttonContainer}>
                                <View style={styles.singleButton}>
                                    <Button
                                        onPress={() => {}}
                                        type='clear'
                                        icon={
                                            <Ionicons
                                                name='chatbubble-outline'
                                                size={30}
                                                color='gray'
                                            />
                                            
                                        }
                                    />
                                    
                                </View>
                                <View style={styles.singleButton}>
                                    <Button
                                        style={{width:'40%'}}
                                        onPress={() => {onLike(postId)}}
                                        type='clear'
                                        icon={
                                            <Ionicons
                                                name={likedIcon}
                                                size={30}
                                                color='gray'
                                            />
                                        }
                                    />  
            
                                </View>
                                <View style={styles.singleButton}>
                                    <Button
                                        style={{width:'40%'}}
                                        onPress={()=>{onMarked(postId)}}
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
                                    <MenuDropdown data={postData[0]}  onDelete={()=>{onDelete(postId)}} onFollow={()=>{onFollow(postData[0].userId)}} followed={isFollowed}/>
                                </View>
                            </View>
                            
                            
                        </View>
                    
                )
            
            }
        }
    
    
    return(
        <View style={styles.container}>
            <CommentList listData={sortedComments} navigation={props.navigation} root={props.route.params.root} getHeader={getHeader} />
            <View style={[styles.bottomContainer, {backgroundColor: colors.card}]}>
                <TextInput 
                    style={[styles.input, {backgroundColor: colors.background}]}
                    onChangeText={(val)=> setCommentText(val)}
                    placeholderTextColor={colors.primary}
                    placeholder='Write a comment...'
                    borderColor={colors.primary}
                />
                <Button
                    type='clear'
                    icon={<Ionicons name='send' size={25} color={colors.primary}/>}
                    onPress={()=>{}}
                />
                
            </View>
        </View>
        
    )
}; 

const styles = StyleSheet.create({
    input:{
        width:'90%',
        height:'100%',
        paddingHorizontal:10,
    },
    bottomContainer:{
        padding:10,
        flexWrap:'wrap',
        alignItems:'center',
        justifyContent:'center',
        height:'10%',
        position:'absolute',
        left:0,
        right:0,
        bottom:0
        
    },
    container:{
        height:'100%',
        flex:1,
        flexDirection:'column',
        
    },
    itemContainer:{
        flexWrap:'wrap',
        flexDirection:'column',
        borderBottomWidth:0.5,
    },
    profileImage:{
        height: 50,
        width:50,
        backgroundColor: "black",
        borderRadius: 100,
    },
    topContainer:{
        width:'100%',
        flexDirection:"column",
        borderBottomWidth:0.5,
        padding:10,
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
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    singleButton:{
        flexDirection:'row',
        alignItems: 'center',
    },
    postImage:{
        height:350,
        width:"100%",
        resizeMode:'contain',
        backgroundColor:'black'
    },
});