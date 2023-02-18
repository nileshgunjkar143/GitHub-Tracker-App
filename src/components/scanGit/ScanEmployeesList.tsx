import React, {useContext, useState} from 'react';
import {View, Image, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Card, Checkbox, Text} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';
import {IEmployee} from '../../types/employee';

function ScanEmployeesList({
  employees,
  handleCheckBoxChange,
}: {
  employees: IEmployee[];
  handleCheckBoxChange: any;
}) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyle(theme);

  const titleData = (item: any) => (
    <>
      <Text style={styles.textStyle}>{item.employeeName}</Text>
    </>
  );
  const leftData = (item: any) => (
    <Text style={styles.iconStyle}>
      <Octicons color="green" size={17} name="repo" /> {item.public_repos}
      {'    '}
      <Image source={require('../../assets/gist.png')} /> {item.public_gists}
    </Text>
  );
  const handleCheckBox = (checked: boolean, id: any) => {
    console.log(checked);
    handleCheckBoxChange(checked, id);
  };

  const renderItem = ({item}: any) => {
    return (
      <Card style={styles.cardView}>
        <View style={styles.cardTitle}>
          <Checkbox
            status={item.checked ? 'checked' : 'unchecked'}
            onPress={() => handleCheckBox(!item.checked, item.id)}
          />
          <Card.Title
            title={false}
            subtitle={titleData(item)}
            right={() => leftData(item)}
            subtitleStyle={styles.titleStyle}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

export default ScanEmployeesList;

const makeStyle = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {marginTop: 5, marginBottom: 192},
    cardView: {
      padding: 4,
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 12,
      border: 1,
      marginBottom: 2,
      backgroundColor: theme.backGroundCard,
    },
    titleStyle: {fontSize: 16, color: theme.textColor, marginLeft: -10},
    textStyle: {
      color: theme.textColor,
    },
    iconStyle: {marginLeft: -125,fontSize:17,color:theme.textColor},
    cardTitle: {flexDirection: 'row', alignItems: 'center', marginLeft: 14},
  });
};
