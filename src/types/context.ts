import React from 'react';
export interface themeType {
  backGroundColor: string;
  textColor: string;
  backGroundCard: string;
  buttonColor: string;
  iconColor: string;
  tabBar: string;
}
export type ThemeContextType = {
  theme: themeType;
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
};
