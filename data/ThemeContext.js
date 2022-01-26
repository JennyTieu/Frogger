import React from "react"
import {DefaultTheme} from '@react-navigation/native';

export const ThemeContext = React.createContext({
  GreenTheme: {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
      primary: '#146356',
      background: '#CEE5D0',
      card: '#A6CF98',
      border: '#146356',
      text: "black"
    }
  },
  PinkTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      background: '#FFC4E1',
      card: '#FF87CA',
      border: '#F2789F',
      text: "black"
    }
  },
  BlueTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1A374D',
      background: '#F9F9F9',
      card: '#B1D0E0',
      border: '#1A374D',
      text: "black"
    },
  },
  DarkTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      background: '#4d4d4d',
      card: '#323232',
      border: '#292929',
      text: 'white'
    },
  },
  PurpleTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7027A0',
      background: '#F0D9FF',
      card: '#BAABDA',
      border: '#D77FA1',
      text: 'black'
    },
  },
  RedTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#BD1616',
      background: '#FDD2BF',
      card: '#FE8F8F',
      border: '#3D0000',
      text: 'black'
    },
  }, 
  TurquoiseTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#056676',
      background: '#EDFFEC',
      card: '#7CD1B8',
      border: '#3E8E7E',
      text: 'black'
    },
  },
});