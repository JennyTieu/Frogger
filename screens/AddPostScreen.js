import React ,{ useLayoutEffect} from "react";
import { View ,Text, TouchableWithoutFeedback,Keyboard} from "react-native";
import AddPostTile from "../components/AddPostTile";
import { FontAwesome } from "@expo/vector-icons";
import {Button} from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

export default addPostScreen=({navigation}) => {

    const { colors } = useTheme();

    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View>
                <AddPostTile navigation={navigation}/>
            </View>
        </TouchableWithoutFeedback>
        
    );

};