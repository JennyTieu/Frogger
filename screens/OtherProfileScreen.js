import React from "react";
import {View,Text} from 'react-native';

export default OtherProfileScreen =(props) =>{
    return(
        <View>
            <Text>This is user {props.route.params.userId}</Text>
        </View>
    )
}