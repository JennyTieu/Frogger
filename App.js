import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from './data/AuthContext';
import MainNavigator from './navigation/MainNavigator';
import LoginScreen from './screens/LoginScreen';
import {Context} from './data/Context';
import{ PROFILES, IDCOUNTERPROFILES, COMMENTS, IDCOUNTERCOMMENTS, POSTS, IDCOUNTERPOSTS} from './data/dummyData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegistrationScreen from './screens/RegistrationScreen';
import Color from './constants/Colors';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const GreenTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#146356',
    background: 'white',
    card: '#A6CF98',
    border: '#146356'
  },
};

const BlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A374D',
    background: 'white',
    card: '#B1D0E0',
    border: '#1A374D'
  },
};

const PinkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F2789F',
    background: 'white',
    card: '#F9C5D5',
    border: '#F2789F'
  },
};

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    background: '#414141',
    card: '#313131',
    border: '#F2789F',
    text: 'white'
  },
};

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [profileData, setProfileData] = useState({
    profiles: PROFILES,
    idCounterProfiles: IDCOUNTERPROFILES,
    comments: COMMENTS,
    idCounterComments: IDCOUNTERCOMMENTS,
    posts: POSTS,
    idCounterPosts: IDCOUNTERPOSTS
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            isSignedUp: true
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isSignedUp: true
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isSignedUp: true,
          };
          case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isSignedUp: false
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      isSignedUp: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        try {
          await AsyncStorage.setItem('storedId', data.id)
        } catch (e) {
          // saving error
        }
      },
      signOut: async (data) => {
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' });
      }, 
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <Context.Provider value ={[profileData, setProfileData]}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={GreenTheme}>
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />

            ) : state.userToken == null ? (

              state.isSignedUp == true ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="SignIn"
                  component={LoginScreen}
                  options={{
                    title: 'Sign in',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                ) : (
                  <Stack.Screen
                  name="SignUp"
                  component={RegistrationScreen}
                  options={{
                    title: 'Sign up',
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
            )) : (
              // User is signed in
              <Stack.Screen name="MainNavigator" component={MainNavigator} options={{headerShown: false}}/>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Context.Provider>
  );
}