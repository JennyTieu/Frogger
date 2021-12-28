import React, { useContext, useState } from 'react';
import {View, StyleSheet, Text, ScrollView, Alert, Image, TouchableOpacity} from "react-native";
import {Context} from '../data/Context';
import {AuthContext} from '../data/AuthContext';
import {Button, Input} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown';
import DateField from 'react-native-datefield';
import Profile from '../models/profile'
import moment from 'moment';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

export default RegistrationScreen = ({navigation}) => {
  const { colors } = useTheme();
  const [profileData, setProfileData] = useContext(Context);
  const { signIn, signOut } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPassword2, setCurrentPassword2] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [currentCity, setCurrentCity] = useState("");

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

  const changeTextHandlerEmail = (enteredText) => {
    setCurrentEmail(enteredText);
  };

  const changeTextHandlerPassword = (enteredText) => {
    setCurrentPassword(enteredText);
  };

  const changeTextHandlerPassword2 = (enteredText) => {
    setCurrentPassword2(enteredText);
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
  const [birthday, setBirthday] = useState(null);
  const [ready, setReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setSelectedImage({ localUri: result.uri });
    }
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setSelectedImage({ localUri: result.uri });
    }
  }

  const addProfile = () => {
    if (!ready) {
      if (currentEmail !== "" && currentFirstName !== "" && currentLastName !== "" && currentUserName !== "" && currentCity !== "" && gender !== null && country !== null && currentJob !== "" && selectedImage!==null) {
        if (currentPassword !== currentPassword2) {
          Alert.alert(
            "Error",
            "Your entered passwords do not match",
            [
              {
                text: "Cancel",
              },
            ],
            {
              cancelable: true,          
            }
          );
        } else {
          setReady(true);
          setReady(true);
        }
      } else {
        Alert.alert(
          "Error",
          "Please fill in all fields",
          [
            {
              text: "Cancel",
            },
          ],
          {
            cancelable: true,          
          }
        );
      }
    } else {
      let newIdCounter = profileData.idCounterProfiles +=1;
      let newProfiles = profileData.profiles;
      let newId = 'm'+ newIdCounter;
  
      newProfiles.push(new Profile(newId, currentEmail, currentPassword, currentFirstName, currentLastName, currentUserName, birthday, gender, currentCity, country, { uri: selectedImage.localUri }, currentJob, [], [], []));
      setProfileData(profileData => ({
          profiles: newProfiles,
          idCounterProfiles: newIdCounter,
          comments: profileData.comments,
          idCounterComments: profileData.idCounterComments,
          posts: profileData.posts,
          idCounterPosts: profileData.idCounterPosts
      }));
      signOut()
    }
  }

  return(
    <View style={styles.screenContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.createAccountStyle}>CREATE ACCOUNT</Text>
      </View>
      <View style={styles.middleContainer}>
        <ScrollView>
          <View style={styles.upperScrollContainer}>
          {selectedImage === null ? (
            <Image
              source={require("../data/images/dummyImage.jpg")}
              style={styles.cameraPreviewBlank}
            />
          ) : (
            <TouchableOpacity onPress={() => setSelectedImage(null)}>
              <Image
                source={{ uri: selectedImage.localUri }}
                style={styles.cameraPreview}
              />
            </TouchableOpacity>
          )}
          <Button type= "clear"
            icon={
              <Ionicons
                name="md-images"
                size={30}
                color={colors.primary}
              />}
            onPress={showImagePicker} 
          />
          <Button type= "clear" 
            icon={
              <Ionicons
                name="md-camera"
                size={30}
                color={colors.primary}
              />} 
            onPress={openCamera} 
          />
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
          placeholder="Repeat Password"
          leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
          onChangeText={changeTextHandlerPassword2}
          value={currentPassword2}
          secureTextEntry
        />
        </View>
          <View style={styles.lowerScrollContainer}>
            <Input
              inputStyle={styles.textInputStyle} 
              placeholder="Username"
              //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
              onChangeText={changeTextHandlerUserName}
              value={currentUserName}
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
            <Text style={{fontSize: 15, marginBottom: 5}}>Birthday</Text>
            <DateField
              labelDate="Input date"
              labelMonth="Input month"
              labelYear="Input year"
              defaultValue={new Date()}
              styleInput={styles.inputBorder}
              onSubmit={(value) => setBirthday(moment(value).format("MM/DD/YYYY"))}
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
              placeholder="City"
              //leftIcon={<Ionicons name="md-key-outline" size={28} style={{ marginRight: 10 }}/>}
              onChangeText={changeTextHandlerCity}
              value={currentCity}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Button titleStyle={{color: colors.primary, fontSize: 18}} buttonStyle={{ backgroundColor: colors.card, marginBottom: 5, borderRadius: 10, marginRight: 20, marginLeft: 20 }} title="Continue" type="solid" onPress={addProfile}/>
        <Button titleStyle={{color: colors.primary, fontSize: 18}} buttonStyle={{ backgroundColor: colors.card, borderRadius: 10, marginRight: 20, marginLeft: 20 }} title="Cancel" type="solid" onPress={signOut}/>
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
    justifyContent: "flex-end"
  },
  middleContainer: {
    flex: 4,
    justifyContent: "space-evenly",
    margin: 30,
  },
  bottomContainer: {
    flex: 1,
  },
  upperScrollContainer: {
    marginBottom: 30,
  },
  lowerScrollContainer: {

  },
  createAccountStyle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
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
  cameraPreview: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 50,
    alignItems:'center',
    justifyContent: 'center',
    resizeMode: "cover",
    backgroundColor:"white"
  },
  cameraPreviewBlank: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 50,
    alignItems:'center',
    justifyContent: 'center',
    resizeMode: "contain",
    backgroundColor:"white"
  },
});