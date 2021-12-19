import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";

export default ProfileTile = (props) => {
    const [profileData] = useContext(Context);
    const [userData] = profileData.profiles.filter(item => item.id === props.data[0].id);
    //const id = 'm1'
    //const profile = profileData.profiles.filter(item => item.id === userData.id);
    const onFollows = (pickedUserId) => {
        console.log("Go to your Follows");

    };
    const onFollowers = (pickedUserId) => {
        console.log("Go to your Follower List");
        props.navigation.navigate(props.root, { screen: "Followers", params: { userId: pickedUserId } })
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
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.topCont}>
                    <Image style={styles.profileImage} source={userData.image} />
                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name='create'
                                    size={20}
                                    color='gray'
                                />

                            }
                        />
                    </View>
                </View>
                <View style={styles.userCont}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', paddingRight: 5 }}>{userData.firstName} {userData.lastName}</Text>
                    <Text style={{ fontSize: 15, color: 'gray', paddingHorizontal: 2, paddingRight: 5 }}>@{userData.userName}</Text>
                    <Text style={{ fontSize: 16, color: 'gray', paddingLeft: 5, paddingRight: 5 }}>({userData.gender})</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>{userData.job} in</Text>
                    <Text style={{ fontSize: 16, color: 'black', paddingLeft: 5, paddingRight: 5 }}>{userData.country}</Text>
                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 5 }}>{userData.bio}</Text>
                    <TouchableOpacity

                        onPress={() => onFollows(userData.id)}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', paddingRight: 5 }}>{userData.follows.length} Follows </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onFollowers(userData.id)}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black', paddingRight: 5 }}>{followerCount(profileData)} Follower</Text>
                    </TouchableOpacity>

                </View >



            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    topCont: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
    },
    profileImage: {
        height: 90,
        width: 90,
        backgroundColor: "black",
        borderRadius: 100,
    },
    mainContainer: {
        width: '85%',
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