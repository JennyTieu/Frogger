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
    }
  },
  BlueTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1A374D',
      background: 'white',
      card: '#B1D0E0',
      border: '#1A374D'
    },
  },
  DarkTheme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      background: '#414141',
      card: '#313131',
      border: '#F2789F',
      text: 'white'
    },
  },
});