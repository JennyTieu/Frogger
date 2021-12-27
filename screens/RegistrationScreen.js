import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';
import DateField from 'react-native-datefield';

export default RegistrationScreen = () => {
  const [profileData, setProfileData] = useContext(Context);
  const { signOut } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [currentCity, setCurrentCity] = useState("");

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

  const changeTextHandlerEmail = (enteredText) => {
    setCurrentEmail(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const changeTextHandlerFirstName = (enteredText) => {
    setCurrentFirstName(enteredText);
  };

  const changeTextHandlerLastName = (enteredText) => {
    setCurrentLastName(enteredText);
  };

  const changeTextHandlerUserName = (enteredText) => {
    setCurrentUserName(enteredText);
  };

  const changeTextHandlerJob = (enteredText) => {
    setCurrentJob(enteredText);
  };

  const changeTextHandlerCity = (enteredText) => {
    setCurrentCity(enteredText);
  };

  const [gender, setGender] = useState(null);
  const [country, setCountry] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const addProfile = (id, email, password, firstName, lastName, userName, birthday, gender, city, country, image, job, bio, follows, bookmarks) =>{
    let newIdCounter = profileData.idCounterProfiles +=1;
    let newProfiles = profileData.profiles;

    newProfiles.push(new Profile('m'+ newIdCounter, currentEmail, currentPassword, currentFirstName, currentLastName, currentUserName, birthday, gender, currentCity, country, image, currentJob, null, null, null));
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
        <Text>Registration</Text>
      </View>
      <View style={styles.middleContainer}>
        <ScrollView>
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="E-Mail"
            leftIcon={<Ionicons name="md-mail-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerEmail}
            value={currentEmail}
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="Password"
            leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
            secureTextEntry
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="First Name"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerFirstName}
            value={currentFirstName}
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="Last Name"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerLastName}
            value={currentLastName}
          />
          <Input
            inputStyle={styles.textInputStyle} 
            placeholder="Username"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerUserName}
            value={currentUserName}
          /> 
          <Text>Birthday</Text>
          <DateField
            labelDate="Input date"
            labelMonth="Input month"
            labelYear="Input year"
            defaultValue={new Date()}
            styleInput={styles.inputBorder}
            onSubmit={(value) => console.log(value)}
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="Job"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerJob}
            value={currentJob}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={genderData}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Gender' : '...'}
            value={gender}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setGender(item.value);
              setIsFocus(false);
            }}
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="City"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerCity}
            value={currentCity}
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
            placeholder={!isFocus ? 'Country' : '...'}
            searchPlaceholder="Search..."
            value={country}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCountry(item.value);
              setIsFocus(false);
            }}
          />
          <Input 
            inputStyle={styles.textInputStyle}
            placeholder="Image"
            //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
            onChangeText={changeTextHandlerPassword}
            value={currentPassword}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button title="Continue" type="solid" icon={<Ionicons name="md-color-palette-outline" size={28} style={{ marginRight: 10 }}/>} onPress={addProfile}/>
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
  titleStyleBirthday: {
    color: "black",
  },
  textInputStyle: {
    marginTop: 10,
    marginBottom: 10
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
    marginTop: 10,
    marginBottom: 10,
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
  inputBorder: {
    width: '30%',
    borderRadius: 8,
    borderColor: '#cacaca',
    borderWidth: 1,
    marginBottom: 20,
  },
});