import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";

export default ProfileTile = (props) => {
    const [profileData] = useContext(Context);
    //const id = 'm1'
    //const profile = profileData.profiles.filter(item => item.id === props.id);

    function followerCount(profileData){
        var followers = 0
        for (let index =0; index <profileData.profiles.length; index++){
            const profile = profileData.profiles[index];
            if (profile.follows.includes(props.data[0].id)){
                followers++;
            }
        }
        return followers
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainContainer}>
                <View style={styles.topCont}>
                    <Image style={styles.profileImage} source={props.data[0].image} />
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
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', paddingRight: 5 }}>{props.data[0].firstName} {props.lastName}</Text>
                    <Text style={{ fontSize: 15, color: 'gray', paddingHorizontal: 2, paddingRight:5 }}>@{props.data[0].userName}</Text>
                    <Text style={{ fontSize: 16, color: 'gray', paddingLeft: 5,paddingRight:5 }}>({props.data[0].gender})</Text>
                    <Text style={{ fontSize: 16, color: 'gray'}}>{props.data[0].job} in</Text>
                    <Text style={{ fontSize: 16, color: 'black', paddingLeft:5, paddingRight: 5 }}>{props.data[0].country}</Text>
                    <Text style={{ fontSize: 16, color: 'black', paddingRight: 5 }}>{props.data[0].bio}</Text>
                    <TouchableOpacity 
                        onPress={() => onFollows(props.data[0].userId)}
                    >
                      <Text style={{ fontWeight:'bold', fontSize: 15, color:'black', paddingRight: 5 }}>{props.data[0].follows.length} Follows </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => onFollowers(props.userId)}
                    >
                       <Text style={{ fontWeight:'bold', fontSize: 15, color:'black', paddingRight: 5 }}>{followerCount(profileData)} Follower</Text>
                    </TouchableOpacity>
                   
                </View >



            </View>
        </View>
    );
}
const onFollows = () => {
    console.log("Go to your Follows");
    
};
const onFollowers = (pickedUserId) => {
        console.log("Go to your Follower List");
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