import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ProfileTile = (props) => {
    const [id, setId] = useState("")
    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('storedId')
            if (value !== null) {
                // value previously stored
            }
            setId(value);
            setId(value);
        } catch (e) {
            // error reading value
        }
    }, [])
    const [profileData] = useContext(Context);
    const [userData] = profileData.profiles.filter(item => item.id == props.data[0].id);
    const { colors } = useTheme();

    const onFollows = (pickedUserId) => {
        console.log("Go to your Follows of " + pickedUserId);
        props.navigation.navigate(props.root, { screen: "Follows", params: { userId: pickedUserId, root: props.root } })

    };
    const onFollowers = (pickedUserId) => {
        console.log("Go to your Follower List of " + pickedUserId);
        props.navigation.navigate(props.root, { screen: "Followers", params: { userId: pickedUserId, root: props.root } })
    };

    function followerCount(profileData) {
        var followers = 0
        for (let index = 0; index < profileData.profiles.length; index++) {
            const profile = profileData.profiles[index];
            if (profile.follows.includes(userData.id)) {
                followers++;
            }
        }
        return followers
    }

    const editProfile = () => {
        props.navigation.navigate("EditProfile");
    };

    if (userData.id == id) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View style={[styles.topCont, { backgroundColor: colors.background }]}>
                        <Image style={styles.profileImage} source={userData.image} />
                        <View style={styles.singleButton}>
                            <Button
                                onPress={editProfile}
                                type='clear'
                                icon={
                                    <Ionicons
                                        name='create'
                                        size={20}
                                        color={colors.primary}
                                    />

                                }
                            />
                        </View>
                    </View>
                    <View style={styles.userCont}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{userData.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 5 }}>({userData.gender})</Text>
                        <Text style={{ fontSize: 16, color: colors.text }}>{userData.job} in</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 5 }}>{userData.country}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{userData.bio}</Text>
                        <TouchableOpacity

                            onPress={() => onFollows(userData.id)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.text, paddingRight: 5 }}>{userData.follows.length} Follows </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onFollowers(userData.id)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.text, paddingRight: 5 }}>{followerCount(profileData)} Follower</Text>
                        </TouchableOpacity>

                    </View >



                </View>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View style={[styles.topCont, { backgroundColor: colors.background }]}>
                        <Image style={styles.profileImage} source={userData.image} />
                    </View>
                    <View style={styles.userCont}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.text, paddingRight: 5 }}>{userData.firstName} {userData.lastName}</Text>
                        <Text style={{ fontSize: 15, color: colors.text, paddingHorizontal: 2, paddingRight: 5 }}>@{userData.userName}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 5 }}>({userData.gender})</Text>
                        <Text style={{ fontSize: 16, color: colors.text }}>{userData.job} in</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingLeft: 5, paddingRight: 5 }}>{userData.country}</Text>
                        <Text style={{ fontSize: 16, color: colors.text, paddingRight: 5 }}>{userData.bio}</Text>
                        <TouchableOpacity

                            onPress={() => onFollows(userData.id)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.text, paddingRight: 5 }}>{userData.follows.length} Follows </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => onFollowers(userData.id)}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.text, paddingRight: 5 }}>{followerCount(profileData)} Follower</Text>
                        </TouchableOpacity>

                    </View >



                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    topCont: {
        flexDirection: 'row',
        marginVertical: 8,
    },
    profileImage: {
        height: 90,
        width: 90,
        backgroundColor: "black",
        borderRadius: 100,
    },
    mainContainer: {
        width: '90%',
        height: '80%',
        paddingLeft: 10
    },
    userCont: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingBottom: 2,
        width: '110%',
    },
    singleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 170,
        paddingTop: 60,
    },

});