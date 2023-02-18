import React from 'react';
import {StatusBar, View} from 'react-native';

interface Props {
  backgroundColor?: any;
}

const AppStatusBar = ({backgroundColor, ...props}: Props) => {
  return (
    <View style={[backgroundColor]}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default AppStatusBar;
