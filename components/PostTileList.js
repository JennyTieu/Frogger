import React from "react";
import {StyleSheet, View, FlatList} from 'react-native';
import PostTile from './PostTile'

export default PostTileList =(props) =>{
    return(
        <View style={{flex:1}}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData)=>{
                    return(
                        <PostTile
                            postId ={itemData.item.postId}
                            userId ={itemData.item.userId}
                            date = {itemData.item.date}
                            image= {itemData.item.image}
                            text= {itemData.item.text}
                            audio= {itemData.item.audio}
                            video= {itemData.item.video}
                            upvotes= {itemData.item.upvotes}
                            commentIds= {itemData.item.commentIds}
                        />
                    )
                }}
                style={{width: '100%'}}
                contentContainerStyle={{allignItems: 'center', padding:10}}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});