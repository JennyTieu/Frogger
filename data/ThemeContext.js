import React from "react"
import {DefaultTheme} from '@react-navigation/native';

export const ThemeContext = React.createContext({
  GreenTheme: {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
      primary: '#146356',
      background: '#dcf5de',
      card: '#A6CF98',
      border: '#146356',
      text: "black",
      placeholderTextColor: "#7C9473"
    }
  },
  PinkTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#8a0f4c',
      background: '#ffe0ef',
      card: '#ffa6d2',
      border: '#F2789F',
      text: "black",
      placeholderTextColor: "#D291BC"
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
      text: "black",
      placeholderTextColor: "#87A7B3"
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
      text: 'white',
      placeholderTextColor: "#9D9D9D"
    },
  },
  PurpleTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7027A0',
      background: '#f3e8fa',
      card: '#BAABDA',
      border: '#D77FA1',
      text: 'black'
    },
  },
  RedTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#9c2828',
      background: '#ffe1d4',
      card: '#ff8f8f',
      border: '#3D0000',
      text: 'black',
      placeholderTextColor: "#BAABDA"
    },
  }, 
  TurquoiseTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#056676',
      background: '#EDFFEC',
      card: '#a6dece',
      border: '#3E8E7E',
      text: 'black',
      placeholderTextColor: "#87A8A4"
    },
  },
});