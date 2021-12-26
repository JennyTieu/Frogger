import React from "react";
import { View, FlatList } from "react-native";
import MiniProfileTile from './MiniProfileTile'

export default MiniProfileTileList = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => {
                    return (
                        <MiniProfileTile
                            id = {itemData.item.id}
                            bio = {itemData.item.bio}
                            city = {itemData.item.city}
                            country = {itemData.item.country}
                            email = {itemData.item.id}
                            bookmarks = {itemData.item.bookmarks}
                            firstName = {itemData.item.firstName}
                            lastName = {itemData.item.lastName}
                            userName = {itemData.item.userName}
                            follows = {itemData.item.follows}
                            gender = {itemData.item.gender}
                            image = {itemData.item.image}
                            job = {itemData.item.job}
                            navigation = {props.navigation}
                            root = {props.root}
                    />
                    )
                }}
                style = {{width: '100%'}}
                contentContainerStyle={{allignItems: 'center'}}
            />
        </View>
    )
}