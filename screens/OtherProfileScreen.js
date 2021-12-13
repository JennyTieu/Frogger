import React from "react";
import {View,Text} from 'react-native';

export default OtherProfileScreen =(props) =>{
    console.log(props.itemId);
    return(
        <View>
            <Text>This is user {props.itemId}</Text>
        </View>
    )
}