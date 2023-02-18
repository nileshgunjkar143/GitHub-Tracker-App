import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import {addUserProfile, getIndividualProfile} from '../../service/user.service';
import {Picker} from '@react-native-picker/picker';
import {ThemeContextType, themeType} from '../../types/context';
import {ThemeContext} from '../../context';

function ProfileSetting({navigation}:any) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyles(theme);

  const [inputData, setInputData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
  });
  const getUserProfile = async () => {
    const data = await getIndividualProfile();
    setInputData({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
    });
  };
  const onChange = (name: string, value: string) => {
    setInputData({...inputData, [name]: value});
  };
  const onSubmit = () => {
    const createProfile = async () => {
      await addUserProfile(inputData);
      getUserProfile();
    };
    createProfile();
    navigation?.goBack();
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.formView}>
        <TextInput
          label="First name"
          value={inputData.firstName}
          theme={{
            roundness: 6,
            colors: {primary: 'black', text: 'white', placeholder: 'white'},
          }}
          style={styles.inputTextStyle}
          outlineColor="white"
          onChangeText={val => onChange('firstName', val)}
        />
        <TextInput
          label="Last name"
          theme={{
            roundness: 6,
            colors: {primary: 'black', text: 'white', placeholder: 'white'},
          }}
          value={inputData.lastName}
          style={styles.inputTextStyle}
          outlineColor="white"
          onChangeText={val => onChange('lastName', val)}
        />

        <View style={styles.dropDown}>
          <Text style={styles.labelTextStyle}>Gender</Text>
          <Picker
            selectedValue={inputData.gender}
            mode="dropdown"
            onValueChange={val => onChange('gender', val)}>
            <Picker.Item label="Male" value="MALE" />
            <Picker.Item label="Female" value="FEMALE" />
            <Picker.Item label="Other" value="OTHER" />
          </Picker>
        </View>
        <TextInput
          label="Email"
          theme={{
            roundness: 6,
            colors: {primary: 'black', text: 'white', placeholder: 'white'},
          }}
          value={inputData.email}
          style={styles.inputTextStyle}
          outlineColor="white"
          onChangeText={val => onChange('email', val)}
        />
        <Button
          onPress={onSubmit}
          mode="contained"
          buttonColor={theme.buttonColor}
          style={styles.button}>
          <Text style={styles.textButton}>Save</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ProfileSetting;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {backgroundColor: theme.backGroundColor, flex: 1},
    formView: {
      marginTop: 10,
    },
    inputTextStyle: {
      borderColor: 'black',
      margin: 8,
      borderRadius: 6,
      backgroundColor: 'white',
    },
    dropDown: {
      backgroundColor: 'white',
      margin: 8,
      marginTop: 0,
      borderRadius: 6,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 1,
    },
    labelTextStyle: {
      marginLeft: 14,
      fontSize: 12,
      marginTop: 3,
      marginBottom: -14,
    },
    button: {
      margin: 15,
      alignSelf: 'center',
      borderRadius: 6,
      borderWidth: 0,
      // width: 300,
    },
    textButton: {
      color: 'white',
      fontWeight: '700',
    },
  });
};
