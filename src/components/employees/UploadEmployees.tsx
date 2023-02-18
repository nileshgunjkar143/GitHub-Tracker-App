import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-paper';
import {ThemeContext} from '../../context';
import {uploadEmployeeData} from '../../service/employee.service';
import {ThemeContextType, themeType} from '../../types/context';

const UploadEmployees = ({navigation}: any) => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyles(theme);
  const [singleFile, setSingleFile] = useState<any>(null);

  const uploadFile = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      if (singleFile[0]?.type !== 'text/comma-separated-values') {
        Alert.alert('Alert', 'Please check file type');
      } else {
        // If file selected then create FormData
        const formData = new FormData();

        for (const file of singleFile) {
          console.log(file);
          formData.append('file', file as any);
        }
        await uploadEmployeeData(formData);
        try {
        } catch (err) {
          console.log(err);
        } finally {
          // setUploading(false);
          console.log('completed');
          Alert.alert('Alert', 'Completed');
          navigation?.goBack();
        }
      }
    } else {
      // If no file selected the show alert
      Alert.alert('Alert', 'Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
      });
      if (res[0]?.type !== 'text/comma-separated-values') {
        Alert.alert('Alert', 'Please check file type');
      }
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        Alert.alert('Alert', 'Canceled');
      } else {
        // For Unknown Error
        Alert.alert('Alert', 'Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={styles.mainView}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.titleText}>Upload Employees</Text>
      </View>
      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile[0]?.name}
          {'\n'}
          Type: {singleFile[0]?.type}
          {'\n'}
          {/* File Size: {singleFile[0]?.size} */}
          {/* {'\n'} */}
        </Text>
      ) : (
        <Text style={styles.textStyle}>Note: Please select .csv file</Text>
      )}
      <Button mode="contained" style={styles.buttonStyle} onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </Button>
      <Button mode="contained" style={styles.buttonStyle} onPress={uploadFile}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </Button>
    </View>
  );
};
export default UploadEmployees;
const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.backGroundColor,
    },
    buttonStyle: {
      borderWidth: 0,
      height: 40,
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 15,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    textStyle: {
      color: theme.textColor,
      fontSize: 15,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      textAlign: 'center',
    },
    titleText: {
      fontSize: 30,
      textAlign: 'center',
      marginBottom: 50,
      color: theme.textColor,
    },
  });
};
