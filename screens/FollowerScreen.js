import React, { useContext } from 'react';
import { View, Text, StyleSheet} from "react-native";
import { Context } from '../data/Context';
import MiniProfileTileList from '../components/MiniProfileTileList';

export default FollowerScreen =(props) => {
    const [profileData] = useContext(Context);
    const persId= props.route.params.userId;
    const profile = profileData.profiles.filter(item => item.id === persId)
    const followers = profileData.profiles.filter(item => item.follows.includes(persId))
    
    return (
        <View style={{height:'100%'}}>
            <View style = {styles.container}>
                <MiniProfileTileList listData={followers} navigation={props.navigation} root={props.route.params.root}/>
            </View>
        </View>
    )
} 
const styles =StyleSheet.create({
    container: {
        flex: 1
    }
})