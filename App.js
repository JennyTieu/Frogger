import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {Context} from './data/Context';
import{ PROFILES, IDCOUNTERPROFILES, COMMENTS, IDCOUNTERCOMMENTS, POSTS, IDCOUNTERPOSTS} from './data/dummyData';
import LoginNavigator from './navigation/LoginNavigator';

export default (App) => {
  const [profileData, setProfileData] = useState({
    profiles: PROFILES,
    idCounterProfiles: IDCOUNTERPROFILES,
    comments: COMMENTS,
    idCounterComments: IDCOUNTERCOMMENTS,
    posts: POSTS,
    idCounterPosts: IDCOUNTERPOSTS
  });

  return (
    <Context.Provider value ={[profileData, setProfileData]}>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}