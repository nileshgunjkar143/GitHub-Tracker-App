import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MyTab from './src/navigation/MyTab';
import AppStatusBar from './src/navigation/AppStatusBar';
import { LogBox } from 'react-native';
import {ThemeContextProvider} from './src/context/ThemeContext';

LogBox.ignoreAllLogs();


const App = () => {
  const THEME_COLOR = '#272447';
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <AppStatusBar backgroundColor={THEME_COLOR} />
        <MyTab />
      </NavigationContainer>
    </ThemeContextProvider>
  );
};

export default App;
