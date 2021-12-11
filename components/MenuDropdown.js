import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import React,{useContext,useState} from "react";
import {StyleSheet, View, Text, FlatList,Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-elements";
import { Context } from "../data/Context";
import OptionsMenu from "react-native-option-menu";

export default MenuDropdown =(props) =>{
    const id='m1';
    const otherDropdownOption=props.followed ?["Unfollow", "Cancel"] : ["Follow", "Cancel"];
    

    if(props.data.userId === id){
        return(
            <OptionsMenu 
                customButton={
                    <MaterialIcons
                        name='more-vert'
                        size={30}
                        color='gray'
                    />
                }
                destructiveIndex={1}
                options={["Delete", "Cancel"]}
                actions={[props.onDelete]}
            />
        );
    }
    else{
        return(
            <OptionsMenu 
                customButton={
                    <MaterialIcons
                        name='more-vert'
                        size={30}
                        color='gray'
                    />
                }
                destructiveIndex={1}
                options={otherDropdownOption}
                actions={[props.onFollow]}
            />
        );
    }
}