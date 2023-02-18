import React, {ReactElement, createContext, useState, useEffect} from 'react';
import {ThemeContextType, themeType} from '../types/context';

type ContextProviderProps = {
  children: ReactElement;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const LightColor = {
  backGroundColor: '#f2f2f2',
  textColor: '#2e2a52',
  backGroundCard: 'white',
  buttonColor: '#299bc4',
  iconColor: '#ffffff',
  tabBar: '#4285f4',
};
const DarkColor = {
  backGroundColor: '#2e2a52',
  textColor: '#ffff',
  backGroundCard: '#272447',
  buttonColor: '#299bc4',
  iconColor: '#444369',
  tabBar: '#4285f4',
};

export const ThemeContextProvider = ({children}: ContextProviderProps) => {
  const [mode, setMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<themeType>(LightColor);

  useEffect(() => {
    if (mode === false) {
      setTheme({
        ...theme,
        backGroundColor: LightColor.backGroundColor,
        textColor: LightColor.textColor,
        backGroundCard: LightColor.backGroundCard,
        buttonColor: LightColor.buttonColor,
        iconColor: LightColor.iconColor,
        tabBar: LightColor.tabBar,
      });
    } else {
      setTheme({
        ...theme,
        backGroundColor: DarkColor.backGroundColor,
        textColor: DarkColor.textColor,
        backGroundCard: DarkColor.backGroundCard,
        buttonColor: DarkColor.buttonColor,
        iconColor: DarkColor.iconColor,
        tabBar: DarkColor.tabBar,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <ThemeContext.Provider value={{theme, mode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
