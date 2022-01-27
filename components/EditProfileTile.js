import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Context } from "../data/Context";
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import {Button, Input} from "react-native-elements";
import { Dropdown } from 'react-native-element-dropdown';
import DateField from 'react-native-datefield';
import moment from 'moment';

export default EditProfileTile = (props) => {
  
  const { colors } = useTheme();
  const [profileData, setProfileData] = useContext(Context);
  const [valueMS, setValueMS] = useState([]);

  let numOfLines = 0;

  const countryData = [
    { label: 'Germany', value: 'Germany' },
    { label: 'Italy', value: 'Italy' },
    { label: 'France', value: 'France' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Russia', value: 'Russia' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Austria', value: 'Austria' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Sweden', value: 'Sweden' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'Greece', value: 'Greece' },
  ];

  const genderData = [
    { label: 'M', value: 'M' },
    { label: 'F', value: 'F' },
  ];

  const [loggedUser] = profileData.profiles.filter(item => item.id === props.data.id);

  const userFirstName = props.data.firstName;
  const userLastName = props.data.lastName;
  const userBio= props.data.bio;
  const userJob = props.data.job;
  const userCountry = props.data.country;
  const userGender= props.data.gender;
  const userCity= props.data.city;
  const userBirthday= props.data.birthday;

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [jobInput, setJobInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [countryInput, setCountryInput] = useState(null);
  const [genderInput, setGenderInput] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [birthdayInput, setBirthdayInput] = useState(null);

  const changeFirstNameHandler = (enteredText) => {
    setFirstNameInput(enteredText);
  };
  const changeLastNameHandler = (enteredText) => {
    setLastNameInput(enteredText);
  };
  const changeBioHandler = (enteredText) => {
    setBioInput(enteredText);
  };
  const changeJobHandler = (enteredText) => {
    setJobInput(enteredText);
  };
  const changeCityHandler = (enteredText) => {
    setCityInput(enteredText);
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setSelectedImage({ localUri: result.uri });
    }
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setSelectedImage({ localUri: result.uri });
    }
  }
  const editProfile = () => {
    var profileToChange = profileData.profiles.find(profileItem => profileItem.id === props.data.id);
    if (selectedImage !== null) {
      profileToChange.image = { uri: selectedImage.localUri }
    }
    if(firstNameInput!==""){
      profileToChange.firstName = firstNameInput
    }
    if(lastNameInput!==""){
      profileToChange.lastName = lastNameInput
    }
    if(genderInput!==null){
      profileToChange.gender = genderInput  
    }
    if(bioInput!==""){
      profileToChange.bio = bioInput
    }
    if(jobInput!==""){
      profileToChange.job = jobInput
    }
    if(cityInput!==""){
      profileToChange.city = cityInput
    }
    if(countryInput!==null){
      profileToChange.country = countryInput
    }
    if(birthdayInput!==""){
      profileToChange.birthday = birthdayInput
    }

    setProfileData(profileData => ({
      profiles: profileData.profiles,
      posts: profileData.posts,
      idCounterProfiles: profileData.idCounterProfiles,
      comments: profileData.comments,
      idCounterComments: profileData.idCounterComments,
      idCounterPosts: profileData.idCounterPosts
    }))
    console.log(profileToChange)
    props.navigation.goBack();
  }

  if (selectedImage != null) {
    return (
      <View style={styles.screenContainer}>
        <View style={[styles.topContainer, {borderBottomColor: colors.primary}]}>
          <Text style={{fontSize: 16, fontWeight: "bold", color: colors.text, marginBottom: 10}}>Profile picture</Text>
          <TouchableOpacity onPress={showImagePicker} >
            <Image source={{uri : selectedImage.localUri}} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
          <ScrollView>
          <Text style={{fontWeight: "bold", color: colors.text}}>First Name</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userFirstName}
              inputStyle= {{color: colors.text}}
              onChangeText={changeFirstNameHandler}
              value={firstNameInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Last Name</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userLastName}
              inputStyle= {{color: colors.text}}
              onChangeText={changeLastNameHandler}
              value={lastNameInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Birthday</Text>
            <DateField
              labelDate="Input date"
              labelMonth="Input month"
              labelYear="Input year"
              defaultValue={new Date(userBirthday)}
              styleInput={[styles.inputBorder, {borderColor: colors.primary, color: colors.text}]}
              onSubmit={(value) => setBirthdayInput(moment(value).format("MM/DD/YYYY"))}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Gender</Text>
            <Dropdown
              style={[styles.dropdown, {borderColor: colors.primary}, isFocus && { borderColor: colors.borde }]}
              placeholderStyle={[styles.placeholderStyle, {color: colors.placeholderTextColor}]}
              selectedTextStyle={[styles.selectedTextStyle, {color: colors.text}]}
              data={genderData}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? userGender : '...'}
              value={genderInput}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGenderInput(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Biography</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userBio}
              inputStyle= {{color: colors.text}}
              onChangeText={changeBioHandler}
              value={bioInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Job</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userJob}
              inputStyle= {{color: colors.text}}
              onChangeText={changeJobHandler}
              value={jobInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>City</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userCity}
              inputStyle= {{color: colors.text}}
              onChangeText={changeCityHandler}
              value={cityInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Location</Text>
            <Dropdown
              style={[styles.dropdown,, {borderColor: colors.primary}, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={[styles.placeholderStyle, {color: colors.placeholderTextColor}]}
              selectedTextStyle={[styles.selectedTextStyle, {color: colors.text}]}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={countryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? userCountry : '...'}
              searchPlaceholder="Search..."
              value={countryInput}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCountryInput(item.value);
                setIsFocus(false);
              }}
            />
          </ScrollView>
        </View>
        <View style={[styles.bottomContainer, {borderTopColor: colors.primary}]}>
          <Button
            type="clear"
            icon={<Ionicons name="md-send" size={30} style={{ marginRight: 10,color: colors.primary}}/>}
            onPress={editProfile}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.screenContainer}>
        <View style={[styles.topContainer, {borderBottomColor: colors.primary}]}>
          <Text style={{fontSize: 16, fontWeight: "bold", color: colors.text, marginBottom: 10}}>Profile picture</Text>
          <TouchableOpacity onPress={showImagePicker} >
            <Image source={loggedUser.image} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.middleContainer}>
          <ScrollView>
            <Text style={{fontWeight: "bold", color: colors.text}}>First Name</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userFirstName}
              inputStyle= {{color: colors.text}}
              onChangeText={changeFirstNameHandler}
              value={firstNameInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Last Name</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userLastName}
              inputStyle= {{color: colors.text}}
              onChangeText={changeLastNameHandler}
              value={lastNameInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Birthday</Text>
            <DateField
              labelDate="Input date"
              labelMonth="Input month"
              labelYear="Input year"
              defaultValue={new Date(userBirthday)}
              styleInput={[styles.inputBorder, {borderColor: colors.primary, color: colors.text}]}
              onSubmit={(value) => setBirthdayInput(moment(value).format("MM/DD/YYYY"))}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Gender</Text>
            <Dropdown
              style={[styles.dropdown, {borderColor: colors.primary}, isFocus && { borderColor: colors.borde }]}
              placeholderStyle={[styles.placeholderStyle, {color: colors.placeholderTextColor}]}
              selectedTextStyle={[styles.selectedTextStyle, {color: colors.text}]}
              data={genderData}
              maxHeight={100}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? userGender : '...'}
              value={genderInput}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGenderInput(item.value);
                setIsFocus(false);
              }}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Biography</Text>
            <Input 
              multiline={true}
              numberOfLines={numOfLines}
              onContentSizeChange={(e) => {
                numOfLines = e.nativeEvent.contentSize.height / 18;
              }}
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userBio}
              inputStyle= {{color: colors.text}}
              onChangeText={changeBioHandler}
              value={bioInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Job</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userJob}
              inputStyle= {{color: colors.text}}
              onChangeText={changeJobHandler}
              value={jobInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>City</Text>
            <Input 
              inputStyle={styles.textInputStyle}
              placeholderTextColor = {colors.placeholderTextColor}
              placeholder={userCity}
              inputStyle= {{color: colors.text}}
              onChangeText={changeCityHandler}
              value={cityInput}
            />
            <Text style={{fontWeight: "bold", color: colors.text}}>Location</Text>
            <Dropdown
              style={[styles.dropdown,, {borderColor: colors.primary}, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={[styles.placeholderStyle, {color: colors.placeholderTextColor}]}
              selectedTextStyle={[styles.selectedTextStyle, {color: colors.text}]}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={countryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? userCountry : '...'}
              searchPlaceholder="Search..."
              value={countryInput}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCountryInput(item.value);
                setIsFocus(false);
              }}
            />
          </ScrollView>
        </View>
        <View style={[styles.bottomContainer, {borderTopColor: colors.primary}]}>
          <Button
            type="clear"
            icon={<Ionicons name="md-send" size={30} style={{ marginRight: 10,color: colors.primary}}/>}
            onPress={editProfile}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%"
  },
  topContainer: {
    flex: 2,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  middleContainer: {
    flex: 5,
    justifyContent: "space-evenly",
    margin: 30,
  }, 
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    borderTopWidth: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    backgroundColor: "black",
    borderRadius: 100,
    marginBottom: 10
  },
  dropdown: {
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputBorder: {
    width: '30%',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
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
});