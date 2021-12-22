import React from "react";
import {StyleSheet, View, FlatList} from 'react-native';
import CommentTile from "./CommentTile";

export default CommentList =(props) =>{
    return(
        <View>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.commentId}
                renderItem={(itemData)=>{
                    return(
                        <CommentTile
                            commentId= {itemData.item.commentId}
                            userId = {itemData.item.userId}
                            date ={itemData.item.date}
                            comment={itemData.item.comment}
                            navigation={props.navigation}
                            root={props.root}
                        />
                    )
                }}
                style={{width: '100%'}}
                contentContainerStyle={{allignItems: 'center'}}
                ListHeaderComponent={props.getHeader}
            />
        </View>
    )
};