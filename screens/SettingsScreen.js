import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Pressable, ScrollView} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import {ThemeContext} from '../data/ThemeContext';

export default SettingsScreen = ({navigation}) => {
  const { signOut } = useContext(AuthContext);

  const { togglePinkTheme, toggleGreenTheme, toggleBlueTheme, toggleDarkTheme, togglePurpleTheme, toggleTurquoiseTheme, toggleRedTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

  const [profileData] = useContext(Context);
  const ids = profileData.profiles.filter(item => item.id);
  var id = "";

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
      try {
        const value = await AsyncStorage.getItem('storedId')
        if(value !== null) {
          // value previously stored
        }
        id = value
      } catch(e) {
        // error reading value
      }
  }, [])

  return(
    <View style={[styles.screenContainer, {backgroundColor: colors.background}]}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={[styles.modalStyle, {backgroundColor: colors.background}]}
      >
          <View style={{backgroundColor: colors.background, borderWidth: 2, borderColor: colors.border, margin: 10, borderRadius: 30}}>
            <ScrollView>
              <Button title="Back" titleStyle={{color: colors.text, fontSize: 18}} buttonStyle={{ justifyContent: 'flex-start', backgroundColor: colors.card, marginBottom: 20, marginTop: 20}} type="solid" icon={<Ionicons name="md-arrow-back" size={28} style={{ marginRight: 10 }}/>} onPress={() => (setModalVisible(!modalVisible))}/>
              <Button title="Pink"titleStyle={{color: 'black'}}  buttonStyle={{ backgroundColor: "#F9C5D5", marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (togglePinkTheme())}/>  
              <Button title="Green" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: '#A6CF98', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (toggleGreenTheme())}/>  
              <Button title="Blue" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: '#B1D0E0', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (toggleBlueTheme())}/>  
              <Button title="Purple" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: '#BAABDA', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (togglePurpleTheme())}/>
              <Button title="Red" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: '#B42B51', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (toggleRedTheme())}/>
              <Button title="Turquoise" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: '#7CD1B8', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (toggleTurquoiseTheme())}/>
              <Button title="Dark" titleStyle={{color: 'black'}} buttonStyle={{ backgroundColor: 'grey', marginBottom: 20, margin: 20, borderRadius: 30}} type="solid" onPress={() => (toggleDarkTheme())}/>  
            </ScrollView>
          </View>
        </Modal>
      <View style={styles.topContainer}>
      
      </View>
      <View style={styles.middleContainer}>
        <Button title="Design" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card}} type="clear" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={() => (setModalVisible(!modalVisible))}/>
        <Button title="Account" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-person-circle-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={() => (console.log("Account"))}/>
        <Button title="Info" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-information-circle-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={() => (navigation.navigate("Info"))}/>
        <Button title="Help" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-help-buoy-outline" size={28} style={{ marginRight: 10, color: colors.primary }}/>} onPress={() => (navigation.navigate("Help"))}/>
        <Button title="Sign out" titleStyle={{color: colors.text}} buttonStyle={{ justifyContent: 'flex-start', borderBottomWidth:1, borderBottomColor: colors.card }} type="clear" icon={<Ionicons name="md-exit-outline" size={28} style={{ marginRight: 10, color: colors.primary}}/>} onPress={signOut}/>
      </View>
      <View style={styles.bottomContainer}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center"
  },
  middleContainer: {
    flex: 7,
    justifyContent: "space-evenly",
  },
  bottomContainer: {
    flex: 1
  },
  modalStyle: {
    justifyContent: "center",
    alignContent: "center",
  },
});