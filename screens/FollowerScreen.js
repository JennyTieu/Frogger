import React, { useContext } from 'react';
import { View, Text, StyleSheet} from "react-native";
import { Context } from '../data/Context';
import MiniProfileTile from '../components/MiniProfileTile';

export default FollowerScreen =(props) => {
    const [profileData] = useContext(Context);
    const persId= props.route.params.userId;
    const profile = profileData.profiles.filter(item => item.id === persId)
    console.log(props)
    
    return (
        <View style={{height:'100%'}}>
            <View>
                <MiniProfileTile listData={profile}/>
            </View>
        </View>
    )
} 