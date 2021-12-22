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

    return(
        <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
                    <TouchableOpacity 
                        onPress={() => {}}
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
    )
};

const styles = StyleSheet.create({
    itemContainer:{
        flexWrap:'wrap',
        flex:1,
        flexDirection:'row',
        backgroundColor: 'white',
        padding:15,
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