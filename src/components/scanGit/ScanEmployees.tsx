import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Button, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScanEmployeesList} from '.';
import {themeType} from '../../types/context';
import {ScanEmpPropType} from '../../types/employee';

function ScanEmployees(props: ScanEmpPropType) {
  const {
    employees,
    handleSubmitSearch,
    handleSearchChange,
    clearFilter,
    handleCheckBoxChange,
    scanGitManually,
    theme,
    setSearchValue,
    searchValue,
  } = props;
  const styles = makeStyles(theme);
  return (
    <View>
      <View style={styles.searchWrap}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={val => handleSearchChange(val)}
            placeholder="Search"
            placeholderTextColor={theme.textColor}
          />
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={handleSubmitSearch}>
            <FontAwesome5 name="search" size={22} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={scanGitManually}>
          <Button
            mode="contained"
            color={theme.buttonColor}
            style={styles.scanButton}>
            Scan
          </Button>
        </TouchableOpacity>
      </View>
      <ScanEmployeesList
        employees={employees}
        handleCheckBoxChange={handleCheckBoxChange}
      />
    </View>
  );
}

export default ScanEmployees;
const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    searchWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      // marginHorizontal:10,
    },
    input: {
      flex: 1,
      fontSize: 18,
      marginHorizontal: 5,
      color: theme.textColor,
      paddingLeft: 13,
    },
    search: {
      marginTop: 10,
      backgroundColor: theme.backGroundCard,
      height: 46,
      borderRadius: 30,
      marginLeft: 10,
      marginRight: 1,
      width: '75%',
      flexDirection: 'row',
    },
    iconStyle: {
      // fontSize: 22,
      alignSelf: 'center',
      marginHorizontal: 15,
    },
    scanButton: {
      // fontSize: 37,
      marginVertical: 5,
      marginRight: 8,
      marginTop: 15,
      padding: 0,
    },
  });
};
