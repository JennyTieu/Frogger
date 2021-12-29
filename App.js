import React, { useState, useContext } from 'react';
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
import {ThemeContext} from './data/ThemeContext';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

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

  const { PinkTheme, GreenTheme, BlueTheme, DarkTheme, PurpleTheme, RedTheme, TurquoiseTheme } = useContext(ThemeContext)
  const [theme, setTheme] = useState(GreenTheme);

  const toggleGreenTheme = React.useCallback(() => {
    return setTheme(GreenTheme);
  }, [GreenTheme]);

  const togglePinkTheme = React.useCallback(() => {
    return setTheme(PinkTheme);
  }, [PinkTheme]);

  const toggleBlueTheme = React.useCallback(() => {
    return setTheme(BlueTheme);
  }, [BlueTheme]);

  const toggleDarkTheme = React.useCallback(() => {
    return setTheme(DarkTheme);
  }, [DarkTheme]);

  const togglePurpleTheme = React.useCallback(() => {
    return setTheme(PurpleTheme);
  }, [PurpleTheme]);

  const toggleRedTheme = React.useCallback(() => {
    return setTheme(RedTheme);
  }, [RedTheme]);

  const toggleTurquoiseTheme = React.useCallback(() => {
    return setTheme(TurquoiseTheme);
  }, [TurquoiseTheme]);

  const themes = React.useMemo(
    () => ({
      toggleGreenTheme,
      togglePinkTheme,
      toggleBlueTheme,
      toggleDarkTheme,
      togglePurpleTheme,
      toggleRedTheme,
      toggleTurquoiseTheme
    }),
    [toggleGreenTheme, togglePinkTheme, toggleDarkTheme, toggleBlueTheme, togglePurpleTheme, toggleTurquoiseTheme, toggleRedTheme]
  );

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
    const bootstrapAsync = async () => {
      let userToken;
      try {
        
      } catch (e) {
    
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        try {
          await AsyncStorage.setItem('storedId', data.id)
        } catch (e) {
        }
      },
      signOut: async (data) => {
        await AsyncStorage.clear();
        dispatch({ type: 'SIGN_OUT' });
      }, 
      signUp: async (data) => {

        dispatch({ type: 'SIGN_UP', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <Context.Provider value ={[profileData, setProfileData]}>
      <AuthContext.Provider value={authContext}>
        <ThemeContext.Provider value={themes}>
          <NavigationContainer theme={theme}>
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
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Context.Provider>
  );
}