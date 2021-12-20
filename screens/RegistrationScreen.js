import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';

export default RegistrationScreen = () => {
  const [profileData, setProfileData] = useContext(Context);
  const { signIn, signUp } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");

  const countryData = [
    { label: 'Germany', value: '1' },
    { label: 'Italy', value: '2' },
    { label: 'France', value: '3' },
    { label: 'USA', value: '4' },
    { label: 'Russia', value: '5' }
  ];

  const genderData = [
    { label: 'M', value: '1' },
    { label: 'F', value: '2' },
  ];

  const changeTextHandlerUserName = (enteredText) => {
    setCurrentUserName(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

  const addProfile = (id, email, password, firstName, lastName, userName, birthday, gender, city, country, image, job, bio, follows, bookmarks) =>{
    let newIdCounter = profileData.idCounterProfiles +=1;
    let newProfiles = profileData.profiles;

    newProfile.push(new Profile('m'+ newIdCounter, email, password, firstName, lastName, userName, birthday, gender, city, country, image, job, bio, follows, bookmarks));
    setProfileData(profileData => ({
        profiles: newProfiles,
        idCounterProfiles: newIdCounter,
        comments: profileData.comments,
        idCounterComments: profileData.idCounterComments,
        posts: profileData.posts,
        idCounterPosts: profileData.idCounterPosts
    }));
  navigation.goBack();  
}

  return(
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
      </View>
      <View style={styles.middleContainer}>
        <ScrollView>
          <Input 
            placeholder="mail"
            leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerUserName}
            value={currentUserName}
          />
          <Input 
            placeholder="password"
            leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="First Name"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="Last Name"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="Username"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="Birthday"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="First Name"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={genderData}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Input 
            placeholder="City"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <Input 
            placeholder="Image"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            placeholder="Job"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button title="Continue" type="solid" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10 }}/>} onPress={() => signIn({ username, password })}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  topContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  middleContainer: {
    flex: 7,
    justifyContent: "space-evenly",
    margin: 30,
  },
  bottomContainer: {
    flex: 1
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});