import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Context } from "../data/Context";
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";

export default EditProfileTile = (props) => {
  
  const { colors } = useTheme();
  const [profileData, setProfileData] = useContext(Context);
  const [valueMS, setValueMS] = useState([]);

  let numOfLines = 0;

  const onChangeMS = (value) => {
    setValueMS(value);
  };

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
  const changeCountryHandler = (enteredText) => {
    setCountryInput(enteredText);
  };
  const changeGenderHandler = (enteredText) => {
    setGenderInput(enteredText);
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
    if(genderInput!==""){
      profileToChange.gender = genderInput
      
    }
    if(bioInput!==""){
      profileToChange.bio = bioInput
      
    }
    if(jobInput!==""){
      profileToChange.job = jobInput
      
    }
    if(countryInput!==""){
      profileToChange.country = countryInput
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

  const [loggedUser] = profileData.profiles.filter(item => item.id === props.data.id);

  const userFirstName = props.data.firstName;
  const userLastName = props.data.lastName;
  const userBio= props.data.bio;
  const userJob = props.data.job;
  const userCountry = props.data.country;
  const userGender= props.data.gender;

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [jobInput, setJobInput] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  if (selectedImage != null) {
    return (
      <View style={styles.full}>
        <ScrollView style={{ width: '100%', backgroundColor: colors.background, flexWrap: 'wrap' }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <TouchableOpacity onPress={showImagePicker} >
              <Image source={{uri : selectedImage.localUri}} style={styles.profileImage} />
            </TouchableOpacity>

            <View style={[styles.screen, {backgroundColor: colors.background}]}>
              <View style={styles.topContainer}>
                <View style={styles.topElements}>
                  <Text style={{fontWeight: "bold", color: colors.text}}>First Name</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userFirstName}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={firstNameInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeFirstNameHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Last Name</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userLastName}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={lastNameInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeLastNameHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Gender</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userGender}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={genderInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeGenderHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Biography</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userBio}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={bioInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeBioHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Job</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userJob}
                    placeholderTextColor = {colors.text}
                    numberOfLines={numOfLines}
                    value={jobInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeJobHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Location</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userCountry}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={countryInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeCountryHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                </View>
              </View>
            </View>
          </View>


        </ScrollView >
        <View style={styles.lowerBox}>
          <View style={styles.buttonContainer}>
            <Button
              type="clear"
              icon={<FontAwesome
                name="send"
                size={30}
                padding={3}
                color={colors.primary} />}
              onPress={editProfile}
            />
          </View>
        </View>
      </View >
    );
  } else {
    return (
      <View style={styles.full}>
        <ScrollView style={{ width: '100%', backgroundColor: colors.background, flexWrap: 'wrap' }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <TouchableOpacity onPress={showImagePicker} >
              <Image source={loggedUser.image} style={styles.profileImage} />
            </TouchableOpacity>
          
            <View style={styles.screen}>
              <View style={styles.topContainer}>
                <View style={styles.topElements}>
                  <Text style={{fontWeight: "bold", color: colors.text}}>First Name</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userFirstName}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={firstNameInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeFirstNameHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Last Name</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userLastName}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={lastNameInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeLastNameHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Gender</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userGender}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={genderInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeGenderHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Biography</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userBio}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={bioInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeBioHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Job</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userJob}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={jobInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeJobHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                  <Text style={{fontWeight: "bold", color: colors.text}}>Location</Text>
                  <TextInput
                    multiline={true}
                    placeholder ={userCountry}
                    placeholderTextColor = {colors.text}
                    inputStyle= {{color: colors.text}}
                    numberOfLines={numOfLines}
                    value={countryInput}
                    style={[styles.inputBox, {color: colors.text}]}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={changeCountryHandler}
                    onContentSizeChange={(e) => {
                      numOfLines = e.nativeEvent.contentSize.height / 18;
                    }}
                  />
                </View>
              </View>
            </View>
          </View>


        </ScrollView >
        <View style={styles.lowerBox}>
          <View style={styles.buttonContainer}>
            <Button
              type="clear"
              icon={<FontAwesome
                name="send"
                size={30}
                padding={3}
                color={colors.primary} />}
              onPress={editProfile}
            />
          </View>
        </View>
      </View >
    );
  }
};

const styles = StyleSheet.create({
  ppView: {
    alignSelf: 'flex-start',
    width: '20%',
    alignItems: 'center',
    padding: 10
  },
  screen: {
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
    width: '87%',
    alignItems: "center",
  },
  topContainer: {
    width: '100%',

  },
  topElements: {
    height: '100%',
    alignItems: 'flex-start'
  },

  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cameraPreview: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#f1f2f6"
  },
  cameraPreviewBlank: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  full: {
    width: '100%',
    height: '100%'

  },
  inputBox: {
    fontWeight: "bold",
    width: "100%",
    fontSize: 15,
    padding: 10,
    alignItems: "center",
  },
  lowerBox: {
    width: '100%',
    height: '10%',
    position: 'absolute',
    justifyContent: 'flex-start',
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: 'gray'
  },
  verticalContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    width: "100%"
  },
  button: {
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 20,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  profileImage: {
    height: 60,
    width: 60,
    backgroundColor: "black",
    borderRadius: 100,
  },
});
