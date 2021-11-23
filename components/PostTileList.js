import React from "react";
import {StyleSheet, View, FlatList} from 'react-native';
import PostTile from "./PostTile";

export default PostTileList =(props) =>{
    return(
        <View style={{flex:1}}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData)=>{
                    return(
                        <PostTile
                            PostId ={itemData.item.postId}
                            userId ={itemData.item.userId}
                            
                        />
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});