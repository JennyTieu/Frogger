import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, } from "react-native";
import { Context } from '../data/Context';
import { AuthContext } from '../data/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostTileList from '../components/PostTileList';

export default BookmarkScreen = ({ route, navigation }) => {
    const [id, setId] = useState("")
    useEffect(async () => {
        try {
            const value = await AsyncStorage.getItem('storedId')
            if (value !== null) {
                // value previously stored
            }
            setId(value);
            setId(value);
        } catch (e) {
            // error reading value
        }
    }, [])

    const [profData] = useContext(Context);
    const [postData] = useContext(Context);
    const [profile] = profData.profiles.filter(item => item.id == id);

    var bookmarks = []
    if (profile != undefined) {
        bookmarks = profile.bookmarks
    }
    const posts = postData.posts.filter(item => bookmarks.includes(item.postId));
    return (
        <View style={{ height: '100%' }}>
            <View style={styles.container}>
                <PostTileList listData={posts} navigation={navigation} root="Profile" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})