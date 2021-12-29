import React from "react"
import {DefaultTheme} from '@react-navigation/native';

export const ThemeContext = React.createContext({
  GreenTheme: {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
      primary: '#146356',
      background: 'white',
      card: '#A6CF98',
      border: '#146356',
      text: "black"
    }
  },
  PinkTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#F2789F',
      background: 'white',
      card: '#F9C5D5',
      border: '#F2789F',
      text: "black"
    }
  },
  BlueTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1A374D',
      background: 'white',
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
});