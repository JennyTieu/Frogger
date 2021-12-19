import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";

export default ProfileTile = (props) => {
    const [profileData] = useContext(Context);
    const id = 'm1';
    const [loggedUser] = profileData.profiles.filter(item => item.id === id);
    const [userData] = profileData.profiles.filter(item => item.id === id);
    const isFollowed = loggedUser.follows.includes(props.userId);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.topCont}>
                    <TouchableOpacity
                        onPress={() => onClick(props.userId)}
                    >
                        <Image style={styles.profileImage} source={userData.image} />
                    </TouchableOpacity>

                    <View style={styles.singleButton}>
                        <Button
                            onPress={() => { }}
                            type='clear'
                            icon={
                                <Ionicons
                                    name='add-circle'
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
                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 5 }}>{userData.bio}</Text>

                </View >
            </View>
        </View >
    );
}

const onClick = (pickedUserId) => {
    if (pickedUserId !== id) {
        console.log("Navigate to User Profile " + pickedUserId);
    }

};

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