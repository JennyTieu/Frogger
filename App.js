import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import {ProfileContext} from './data/Context';
import{ PROFILES, IDCOUNTERPROFILES} from './data/dummyData';
import LoginNavigator from './navigation/LoginNavigator';

export default (App) => {
  const [profileData, setProfileData] = useState({
    profiles: PROFILES,
    idCounterProfiles: IDCOUNTERPROFILES
  });

  return (
    <ProfileContext.Provider value ={[profileData, setProfileData]}>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </ProfileContext.Provider>
  );
}