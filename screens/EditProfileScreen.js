import React ,{ useContext,useState,useEffect, useLayoutEffect} from "react";
import { View ,Text, TouchableWithoutFeedback,Keyboard} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native';
import EditProfileTile from "../components/EditProfileTile";
import { Context } from "../data/Context";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default EditProfileScreen=({navigation}) => {
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

    const [profileData] = useContext(Context);
    const [loggedUser] = profileData.profiles.filter(item => item.id.includes(id));
    console.log(loggedUser)
    const { colors } = useTheme();

    return(
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View>
                <EditProfileTile data={loggedUser} navigation={navigation}/>
            </View>
        </TouchableWithoutFeedback>
        
    );

};