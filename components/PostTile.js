import { Ionicons } from "@expo/vector-icons";
import React,{useContext,useState} from "react";
import {StyleSheet, View, Text, FlatList,Image} from 'react-native';
import { Button } from "react-native-elements";
import { Context } from "../data/Context";


export default PostTile =(props) =>{

    const [profileData] = useContext(Context);
    const [id]=props.userId;
    const [userData] = profileData.profiles.filter(item => item.id === props.userId);
    

    return(
        <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
                <Image style={styles.profileImage} source={userData.image}/>
            </View>
            
            <View style={styles.mainContainer}>
                <View style={styles.userCont}>
                    <Text style={{fontWeight:'bold', fontSize:16, color:'black', paddingRight:5}}>{userData.firstName} {userData.lastName}</Text>
                    <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>@{userData.userName}</Text>
                    <Text style={{ fontSize:15, color:'gray', paddingHorizontal:2}}>• {props.date}</Text>
                </View>
                
                <Text style={{ fontSize:15}}>{props.text}</Text>
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
                        <Text>{props.upvotes.length}</Text>
                    </View>
                    <View style={styles.singleButton}>
                        <Button
                            style={{width:'40%'}}
                            onPress={() => {}}
                            type='clear'
                            icon={
                                <Ionicons
                                    name='heart-outline'
                                    size={30}
                                    color='gray'
                                />
                            }
                        />  
                        <Text>{props.commentIds.length}</Text>
                    </View>
                    
                </View>
            </View>
            
            
        </View>
    );
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
    }
});