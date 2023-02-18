import React, {Dispatch, SetStateAction, useContext} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';

interface props {
  toggleAddEmployee: () => void;
  toggleUploadEmployee: () => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const EmployeeSearch = (props: props) => {
  const {setInputValue, inputValue, toggleAddEmployee, toggleUploadEmployee} =
    props;
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyle(theme);
  return (
    <View style={styles.searchWrap}>
      <View style={styles.search}>
        <FontAwesome5
          name="search"
          color={theme.textColor}
          style={styles.iconStyle}
        />
        <TextInput
          style={styles.input}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Search"
          placeholderTextColor={theme.textColor}
        />
      </View>
      <TouchableOpacity onPress={toggleAddEmployee}>
        <Ionicons
          name="add-circle"
          color={theme.buttonColor}
          style={styles.addButton}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleUploadEmployee}>
        <FontAwesome
          style={styles.uploadButton}
          color={theme.buttonColor}
          name="cloud-upload"
        />
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeSearch;

const makeStyle = (theme: themeType) => {
  return StyleSheet.create({
    searchWrap: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      fontSize: 18,
      marginHorizontal: 5,
      color: theme.textColor,
    },
    search: {
      marginTop: 10,
      backgroundColor: theme.backGroundCard,
      height: 46,
      borderRadius: 30,
      marginLeft: 18,
      marginRight: 8,
      width: '75%',
      flexDirection: 'row',
    },
    iconStyle: {
      fontSize: 22,
      alignSelf: 'center',
      marginHorizontal: 15,
    },
    addButton: {
      fontSize: 40,
      marginVertical: 5,
      marginRight: 4,
      marginTop: 15,
    },
    uploadButton: {
      fontSize: 34,
      marginVertical: 5,
      marginRight: 15,
      marginTop: 15,
    },
  });
};
