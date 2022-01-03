import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Context } from "../data/Context";
import { useTheme } from '@react-navigation/native';


export default EditProfileTile = (props) => {
  const { colors } = useTheme();
  const [profileData, setProfileData] = useContext(Context);
  const [selectedImage, setSelectedImage] = useState(null);
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
    let profileToChange = profileData.profiles.find(profileItem => profileItem.id === props.data.id);
    setProfileData(profileToChange => ({
      birthday: profileToChange.birthday,
      bookmarks: profileToChange.bookmarks,
      city: profileToChange.city,
      email: profileToChange.email,
      follows: profileToChange.follows,
      id: profileToChange.id,
      image: profileToChange.image,
      password: profileToChange.password,
      username: profileToChange.userName,
      gender: genderInput,
      firstName: firstNameInput,
      lastName: lastNameInput,
      bio: bioInput,
      job: jobInput,
      country: countryInput
    }))
    console.log(profileToChange.firstName)
    props.navigation.goBack();
  }
  
  const [loggedUser] = profileData.profiles.filter(item => item.id.includes(props.data.id));
  const [firstNameInput, setFirstNameInput] = useState(loggedUser.firstName);
  const [lastNameInput, setLastNameInput] = useState(loggedUser.lastName);
  const [bioInput, setBioInput] = useState(loggedUser.bio);
  const [jobInput, setJobInput] = useState(loggedUser.job);
  const [countryInput, setCountryInput] = useState(loggedUser.country);
  const [genderInput, setGenderInput] = useState(loggedUser.gender);


  return (
    <View style={styles.full}>
      <ScrollView style={{ width: '100%', backgroundColor: "#f1f2f6", flexWrap: 'wrap' }}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <View style={styles.ppView}>
            <Image source={loggedUser.image} style={styles.profileImage} />
          </View>
          <View style={styles.screen}>
            <View style={styles.topContainer}>
              <View style={styles.topElements}>
                <Text fontStyle='bold'>First Name</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={firstNameInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeFirstNameHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
                <Text fontStyle='bold'>Last Name</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={lastNameInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeLastNameHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
                <Text fontStyle='bold'>Gender</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={genderInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeGenderHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
                <Text fontStyle='bold'>Biography</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={bioInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeBioHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
                <Text fontStyle='bold'>Job</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={jobInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeJobHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
                <Text fontStyle='bold'>Location</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={numOfLines}
                  value={countryInput}
                  style={styles.inputBox}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={changeCountryHandler}
                  onContentSizeChange={(e) => {
                    numOfLines = e.nativeEvent.contentSize.height / 18;
                  }}
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={[styles.cameraPreviewBlank]}>
                {selectedImage === null ? (
                  <View />
                ) : (
                  <TouchableOpacity onPress={() => setSelectedImage(null)}>
                    <Image
                      source={{ uri: selectedImage.localUri }}
                      style={styles.cameraPreview}
                    />
                  </TouchableOpacity>
                )}
              </View>

            </View>
          </View>
        </View>

      </ScrollView >
      <View style={styles.lowerBox}>
        <View style={styles.buttonContainer}>
          <Button type="clear"
            icon={
              <Ionicons
                name="md-images"
                size={40}
                color="gray"
              />}
            onPress={showImagePicker} />
          <Button type="clear"
            icon={
              <Ionicons
                name="md-camera"
                size={40}
                color="gray"
              />}
            onPress={openCamera} />
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
    backgroundColor: "#f1f2f6",
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
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: "contain",
    backgroundColor: "#f1f2f6"
  },
  cameraPreviewBlank: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 40,
    width: 40,
    backgroundColor: "black",
    borderRadius: 100,
  },
});
