import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default MiniProfileTile = (props) => {
    const { colors } = useTheme();
    const [profileData, setProfileData] = useContext(Context);
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
    const [loggedUser] = profileData.profiles.filter(item => item.id.includes(id));
    //You follow them
    const youFollow = loggedUser.follows.includes(props.id);

    //They follow you
    //const followsYou = profileData.profiles.filter(item => item.follows.includes(loggedUser.id))
    function checkFollower() {
        if (props.follows.includes(loggedUser.id)) {
            return true;
        } else {
            return false
        }
    }
    const onClick = (pickedUserId) => {
        if (pickedUserId !== id && props.route == "Home") {
            console.log("Navigate to User Profile " + pickedUserId);
            props.navigation.navigate("PickedProfile", { screen: "PickedProfile", userId: pickedUserId, root: "Home"});
        } else {
            console.log("Navigate to User Profile " + pickedUserId);
            props.navigation.navigate("PickedProfile", { screen: "PickedProfile", userId: pickedUserId, root: "Profile"});
        }

    };

    const onFollow = (userId) => {
        let itemToChange = profileData.profiles.find(profileItem => profileItem.id === id);
        if (loggedUser.follows.includes(userId)) {
            itemToChange.follows.splice(itemToChange.follows.indexOf(userId), 1);

            setProfileData(profileData => ({
                profiles: profileData.profiles.map(profile => profile.id === id ? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        } else {
            itemToChange.follows.push(userId);

            setProfileData(profileData => ({
                profiles: profileData.profiles.map(profile => profile.id === id ? itemToChange : profile),
                posts: profileData.posts,
                idCounterProfiles: profileData.idCounterProfiles,
                comments: profileData.comments,
                idCounterComments: profileData.idCounterComments,
                idCounterPosts: profileData.idCounterPosts
            }));
        }

    };

    if (props.id == id) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        onPress={() => onClick(props.id)} >
                        <Image style={styles.profileImage} source={props.image} />
                    </TouchableOpacity>

                    <View style={styles.userCont}>
                        <Ionicons
                            name="happy"
                            size={20}
                            color={colors.primary}
                        />
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 60 }}>It's you!</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.firstName} {props.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{props.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.bio}</Text>

                    </View >
                </View>
            </View>
        );
    } 
    //follower + that you follow 
    if (checkFollower() && youFollow) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        onPress={() => onClick(props.id)} >
                        <Image style={styles.profileImage} source={props.image} />
                    </TouchableOpacity>

                    <View style={styles.userCont}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color='gray'
                        />
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 60 }}>Follows you</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.firstName} {props.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{props.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.bio}</Text>

                    </View >
                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { onFollow(props.id) }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name="checkmark-circle"
                                    size={20}
                                    color={colors.primary}
                                />
                            }
                        />
                    </View>

                </View>
            </View>
        );
    }
    if (checkFollower() && !youFollow) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        onPress={() => onClick(props.id)} >
                        <Image style={styles.profileImage} source={props.image} />
                    </TouchableOpacity>

                    <View style={styles.userCont}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color='gray'
                        />
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 60 }}>Follows you</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.firstName} {props.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{props.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.bio}</Text>

                    </View >
                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { onFollow(props.id) }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name="add-circle-outline"
                                    size={20}
                                    color={colors.primary}
                                />

                            }
                        />
                    </View>

                </View>
            </View >
        );
    }
    if (checkFollower()==false && youFollow) {
        return (
            <View style={{ flex: 1 }}>
                <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
                    <TouchableOpacity
                        onPress={() => onClick(props.id)} >
                        <Image style={styles.profileImage} source={props.image} />
                    </TouchableOpacity>

                    <View style={styles.userCont}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.firstName} {props.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{props.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.bio}</Text>

                    </View >
                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { onFollow(props.id) }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name="checkmark-circle"
                                    size={20}
                                    color={colors.primary}
                                />

                            }
                        />
                    </View>

                </View>
            </View>
        );
    }
    if (checkFollower()==false && !youFollow) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        onPress={() => onClick(props.id)} >
                        <Image style={styles.profileImage} source={props.image} />
                    </TouchableOpacity>
    
                    <View style={styles.userCont}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.firstName} {props.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{props.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{props.bio}</Text>
    
                    </View >
                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { onFollow(props.id) }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name="add-circle-outline"
                                    size={20}
                                    color={colors.primary}
                                />
    
                            }
                        />
                    </View>
    
                </View>
            </View>
        );
    
    }
}


const styles = StyleSheet.create({
    profileImage: {
        height: 50,
        width: 50,
        backgroundColor: "black",
        borderRadius: 100,
    },
    mainContainer: {
        width: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        borderColor: 'gray',
        borderBottomWidth: 0.5,
        paddingBottom: 5,
        paddingTop: 10,
    },
    userCont: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '70%',
        paddingLeft: 8,
    },
    singleButton: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingRight: 15,
    },

});