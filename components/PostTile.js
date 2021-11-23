import React from "react";
import {StyleSheet, View, Text, FlatList,Image} from 'react-native';

export default PostTile =(props) =>{
    return(
        <View>
            <Text>{props.id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});