import React, { useState,useContext } from "react";
import { StyleSheet, View, TextInput ,Text, TouchableOpacity, Image, ScrollView} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Context } from "../data/Context";
import moment from "moment";
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default AddPostTile =(props) =>{
    return(
        <ScrollView>
            <View>
                <Text>new Post</Text>
            </View>
        </ScrollView>
    );
};