import React, { useContext } from 'react';
import { View, Text, StyleSheet} from "react-native";
import { Context } from '../data/Context';
import MiniProfileTileList from '../components/MiniProfileTileList';

export default FollowsScreen =(props) => {
    const [profileData] = useContext(Context);
    const persId= props.route.params.userId;
    const profile = profileData.profiles.filter(item => item.id === persId)[0]
    const follows = profileData.profiles.filter(item => profile.follows.includes(item.id))
    return (
        <View style={{height:'100%'}}>
            <View style = {styles.container}>
                <MiniProfileTileList listData={follows} navigation={props.navigation} root={props.route.params.root}/>
            </View>
        </View>
    )
} 
const styles =StyleSheet.create({
    container: {
        flex: 1
    }
})