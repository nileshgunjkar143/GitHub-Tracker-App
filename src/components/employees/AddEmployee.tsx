import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import {ThemeContext} from '../../context';
import {addEmployee} from '../../service/employee.service';
import {ThemeContextType, themeType} from '../../types/context';

function AddEmployee({navigation}: any) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyle(theme);
  const [formData, setFormData] = useState({
    github_username: '',
    employeeName: '',
    officeEmail: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createEmployee = async () => {
    const response = await addEmployee(formData);
    if (response.status === 201) {
      navigation?.goBack();
    }
  };
  const handleAddQuote = () => {
    //Check for the Name TextInput
    if (!(formData.github_username.trim().length > 3)) {
      setErrorMessage(' Please input your username!');
      return;
    }
    //Check for the Email TextInput
    if (!(formData.employeeName.trim().length >= 1)) {
      setErrorMessage('Please input your Name!');
      return;
    }

    //Check for the Email TextInput
    if (
      !(
        formData.officeEmail.trim().length >= 5 &&
        formData.officeEmail.match(/^\S+@\S+\.\S+$/)
      )
    ) {
      setErrorMessage('Please check your Email!');
      return;
    }
    //Checked Successfully
    setErrorMessage('Success');
    createEmployee();
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.formView}>
      <SafeAreaView>
        <View style={styles.boxView}>
          <TextInput
            style={styles.textinput}
            theme={{
              colors: {primary: '#2e2a52'},
            }}
            underlineColor={'transparent'}
            label="GitHub Username"
            value={formData.github_username}
            onChangeText={val => handleChange('github_username', val)}
          />

          <TextInput
            style={styles.textinput}
            theme={{
              colors: {primary: '#2e2a52'},
            }}
            underlineColor={'transparent'}
            label="Name"
            value={formData.employeeName}
            onChangeText={val => handleChange('employeeName', val)}
          />

          <TextInput
            style={styles.textinput}
            theme={{
              colors: {primary: '#2e2a52'},
            }}
            underlineColor={'transparent'}
            label="Email"
            value={formData.officeEmail}
            onChangeText={val => handleChange('officeEmail', val)}
          />

          <Text
            style={
              errorMessage === 'Success' ? styles.successText : styles.errorText
            }>
            {errorMessage}
          </Text>
        </View>
        <Button
          onPress={handleAddQuote}
          mode="outlined"
          buttonColor={theme.buttonColor}
          style={styles.button}>
          <Text style={styles.textButton}>Add Employee</Text>
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}

export default AddEmployee;

const makeStyle = (theme: themeType) => {
  return StyleSheet.create({
    formView: {
      backgroundColor: theme.backGroundColor,
    },
    boxView: {
      alignItems: 'center',
      margin: 50,
      marginBottom: 0,
      padding: 5,
    },
    textinput: {
      width: 385,
      // color: 'white',
      marginTop: 10,
      borderRadius: 4,
      borderBottomWidth: 0,
    },
    errorText: {
      marginTop: 5,
      color: '#C62424',
      width: '120%',
      paddingHorizontal: 80,
    },
    successText: {
      marginTop: 5,
      color: 'green',
      width: '120%',
      paddingHorizontal: 150,
    },
    button: {
      alignSelf: 'center',
      borderRadius: 12,
      borderWidth: 0,
      // width: 385,
      padding: 4,
    },
    textButton: {
      color: 'white',
      fontWeight: '700',
    },
  });
};
