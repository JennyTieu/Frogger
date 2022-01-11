import React, { useState,useContext , useEffect,useLayoutEffect} from "react";
import { StyleSheet, View, TextInput ,Text, TouchableOpacity, Image, ScrollView} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons ,FontAwesome} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Context } from "../data/Context";
import moment from "moment";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from "../models/post";

export default AddPostTile =(props) =>{
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [valueMS, setValueMS] = useState([]);
    const [textInput, setTextInput] = useState("");
    let numOfLines =0;

    

    

    const onChangeMS = (value) => {
        setValueMS(value);
    };

    const changeTextHandler=(enteredText) =>{
        setTextInput(enteredText);
    };

    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setSelectedImage({ localUri: result.uri });
        }
      }
    
      const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setSelectedImage({ localUri: result.uri });
        }
      }
      const addPost = ()=>{
        let newIdCounter = profileData.idCounterPosts +=1;
        let newPosts = profileData.posts;
  
        if(textInput!==null || selectedImage!==null){
          if(selectedImage!==null){
          
            newPosts.push(new Post('p'+newIdCounter,id,moment(),{ uri: selectedImage.localUri },textInput,null,null,[],[]));
            setProfileData(profileData=>({
              profiles: profileData.profiles,
              posts: newPosts,
              idCounterProfiles: profileData.idCounterProfiles,
              comments: profileData.comments,
              idCounterComments: profileData.idCounterComments,
              idCounterPosts: newIdCounter
            }))
          }else{
            newPosts.push(new Post('p'+newIdCounter,id,moment(),null,textInput,null,null,[],[]));
            setProfileData(profileData=>({
              profiles: profileData.profiles,
              posts: newPosts,
              idCounterProfiles: profileData.idCounterProfiles,
              comments: profileData.comments,
              idCounterComments: profileData.idCounterComments,
              idCounterPosts: newIdCounter
            }))
          }
          
        }
        props.navigation.goBack();
        
      }

    return(
        <View style={styles.full}>
            <ScrollView style={{width:'100%', backgroundColor:"#f1f2f6" ,  flexWrap:'wrap'}}>
                <View style={{width:'100%',flexDirection:'row'}}>
                    <View style={styles.ppView}>
                        <Image source={loggedUser.image} style={styles.profileImage}/>
                    </View>
                    <View style={styles.screen}>
                        <View style={styles.topContainer}>
                            <TextInput
                                multiline={true}
                                numberOfLines={numOfLines}
                                placeholder="What's happening?"
                                style={styles.inputBox}
                                underlineColorAndroid = "transparent"
                                autoCapitalize = "none"
                                onChangeText={changeTextHandler}
                                value={textInput}
                                onContentSizeChange={(e) => {
                                    numOfLines = e.nativeEvent.contentSize.height/18;
                                }}
                                />
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={[styles.cameraPreviewBlank]}>
                                {selectedImage === null?(
                                    <View/>
                                ) : (
                                    <TouchableOpacity onPress={() => setSelectedImage(null)}>
                                    <Image
                                        source={{ uri: selectedImage.localUri }}
                                        style={styles.cameraPreview}
                                    />
                                    </TouchableOpacity>
                                )}
                            </View>
                            
                        </View>
                    </View>
                </View>
                
            </ScrollView>
            <View style={styles.lowerBox}>
                <View style={styles.buttonContainer}>
                    <Button type= "clear"
                        icon={
                            <Ionicons
                                name="md-images"
                                size={40}
                                color={colors.primary}
                            />}
                        onPress={showImagePicker} />
                    <Button type= "clear" 
                        icon={
                            <Ionicons
                                name="md-camera"
                                size={40}
                                color={colors.primary}
                            />} 
                        onPress={openCamera} />
                    <Button 
          type="clear" 
          icon={<FontAwesome 
            name="send" 
            size={30} 
            padding={3}
            color={colors.primary}/>} 
          onPress={addPost}
        />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ppView:{
      alignSelf:'flex-start',
      width:'13%',
      alignItems:'center',
      padding:10
    },
    screen: {
        alignSelf:'flex-start',
      flexWrap:'wrap',
      flexDirection:'row',
      padding:10,
      width:'87%',
      backgroundColor: "#f1f2f6",
      alignItems: "center",
    },
    topContainer: {
      width:'100%',
      alignItems:'center'

    },
    bottomContainer: {
      justifyContent:"center",
      alignItems: "center",
    },
    cameraPreview: {
      width: 300,
      height: 300,
      alignItems:'center',
      justifyContent: 'center',
      resizeMode: "contain",
      backgroundColor:"#f1f2f6"
    },
    cameraPreviewBlank: {
      width: 300,
      height: 300,
      alignItems:'center',
      justifyContent: 'center',
      resizeMode: "contain",
    },
    full: {
      width:'100%',
      height:'100%'
      
    },
    inputBox:{
        fontWeight: "bold",
        width: "100%",
        fontSize:15,
        padding:10,
        alignItems: "center",
      },
    lowerBox:{
      width:'100%',
      height:'10%',
      position:'absolute',
      justifyContent:'flex-start',
      bottom:0,
      borderTopWidth:0.5,
      borderTopColor:'gray'
    },
    verticalContainer: {
      alignItems: "center",
    },
    buttonContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    container: {
      paddingTop: 20,
      paddingBottom:30,
      marginLeft: 20,
      marginRight: 20,
      flex: 1,
      width: "100%"
    },
    button: {
      backgroundColor: "white",
    },
    buttonText: {
      fontSize: 20,
    },
    buttonView: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    profileImage:{
        height: 40,
        width:40,
        backgroundColor: "black",
        borderRadius: 100,
    },
  });
  