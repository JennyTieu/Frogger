import { Ionicons , MaterialIcons} from "@expo/vector-icons";
import React,{useContext,useState, useEffect} from "react";
import {StyleSheet, View, Text, FlatList,Image, TouchableOpacity} from 'react-native';
import { Button } from "react-native-elements";
import { Context } from "../data/Context";
import OptionsMenu from "react-native-option-menu";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default MenuDropdown =(props) =>{
    const [id, setId] = useState("")

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('storedId')
      if(value !== null) {
        // value previously stored
      }
      setId(value);
      setId(value);
    } catch(e) {
      // error reading value
    }
  }, [])
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