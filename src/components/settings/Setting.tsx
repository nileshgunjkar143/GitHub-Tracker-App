/* eslint-disable @typescript-eslint/no-shadow */
import React, {useContext, useState} from 'react';
import {Alert, SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {
  freq,
  frequency,
  monthData,
  scope,
  settingKeyAndValues,
  weekData,
} from '../../screens/settings/contants';
import {addApplicationSettingData} from '../../service/application-setting';
import {message} from '../../shared';
import {ISettingsData} from '../../types/settings';
import {ThemeContextType, themeType} from '../../types/context';
import {ThemeContext} from '../../context';

const {
  settings: {error, chooseType, succesfullyChanged},
} = message;

const {WEEKLY, MONTHLY} = freq;
const months = monthData();

const days = {
  day_of_month: '1',
  day_of_week: '1',
};
const initialData = {
  key: MONTHLY,
  ...days,
};
const {
  GITHUB_JOB_FREQUENCY,
  GITHUB_JOB_SCHEDULE_DAY_OF_MONTH,
  GITHUB_JOB_SCHEDULE_DAY_OF_WEEK,
  SUMMARY_EMAIL_JOB_FREQUENCY,
  SUMMARY_EMAIL_SCHEDULE_DAY_OF_MONTH,
  SUMMARY_EMAIL_SCHEDULE_DAY_OF_WEEK,
} = settingKeyAndValues;

function Setting({scopeData}: {scopeData: string}) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyles(theme);
console.log(scopeData);
  const {application, user} = scope;
  const [selectData, setSelectData] = useState(initialData);
  const {key, day_of_week, day_of_month} = selectData;

  //   const scopeData = route.params;

  const getFreqandValues = (
    frequency: string,
    dayOfMonth: string,
    dayOfWeek: string,
  ) => {
    const settingFreq = {
      setting_key: frequency,
      setting_value: key,
      scope: application,
    };
    const settingValues = {
      setting_key: key === MONTHLY ? dayOfMonth : dayOfWeek,
      setting_value: key === MONTHLY ? day_of_month : day_of_week,
      scope: application,
    };
    return {settingFreq, settingValues};
  };

  const addAppSettings = async (data: ISettingsData) => {
    const response = await addApplicationSettingData(data);
    if (response.status !== 201) {
      console.log(error);
      return;
    } else {
      Alert.alert('Alert', 'Setting Saved');
    }
  };
  const onFinish = () => {
    if (selectData.key === '') {
      console.log(chooseType);
      return;
    }
    if (user === scopeData) {
      const {settingFreq, settingValues} = getFreqandValues(
        SUMMARY_EMAIL_JOB_FREQUENCY,
        SUMMARY_EMAIL_SCHEDULE_DAY_OF_MONTH,
        SUMMARY_EMAIL_SCHEDULE_DAY_OF_WEEK,
      );
      addAppSettings(settingFreq);
      addAppSettings(settingValues);
    } else if (application === scopeData) {
      const {settingFreq, settingValues} = getFreqandValues(
        GITHUB_JOB_FREQUENCY,
        GITHUB_JOB_SCHEDULE_DAY_OF_MONTH,
        GITHUB_JOB_SCHEDULE_DAY_OF_WEEK,
      );
      addAppSettings(settingFreq);
      addAppSettings(settingValues);
    }
    console.log(succesfullyChanged);
    setSelectData({key: '', ...days});
  };

  const handleOptionChange = (key: string, value: string) => {
    if (key === MONTHLY) {
      setSelectData(prevValue => ({...prevValue, [key]: value}));
    } else {
      setSelectData(prevValue => ({...prevValue, [key]: value}));
    }
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={styles.formView}>
        <View style={styles.boxView}>
          <View>
            <Text style={styles.textStyle}>Choose Frequency Type</Text>
            <View style={styles.dropDown}>
              <Picker
                selectedValue={key}
                // mode="dropdown"
                onValueChange={selectedValue =>
                  handleOptionChange('key', selectedValue)
                }>
                {frequency.map(freq => (
                  <Picker.Item
                    key={freq.value}
                    label={freq.option}
                    value={freq.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {key === MONTHLY && (
            <View>
              <Text style={styles.textStyle}>Choose Day of the Month</Text>
              <View style={styles.dropDown}>
                <Picker
                  selectedValue={day_of_month}
                  onValueChange={selectedValue =>
                    handleOptionChange('day_of_month', selectedValue)
                  }>
                  {months.map((month: any) => (
                    <Picker.Item
                      key={month}
                      label={month.toString()}
                      value={month}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {key === WEEKLY && (
            <View>
              <Text style={styles.textStyle}>Choose Day of the Week</Text>
              <View style={styles.dropDown}>
                <Picker
                  selectedValue={day_of_week}
                  onValueChange={selectedValue =>
                    handleOptionChange('day_of_week', selectedValue)
                  }>
                  {weekData.map(week => (
                    <Picker.Item
                      key={week.value}
                      label={week.option}
                      value={week.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
        </View>
        <Button onPress={onFinish} mode="contained" buttonColor={theme.buttonColor} style={styles.button}>
          <Text style={styles.textButton}>Submit</Text>
        </Button>
      </SafeAreaView>
    </View>
  );
}

export default Setting;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {flex: 1, backgroundColor: theme.backGroundColor},
    textStyle: {
      fontSize: 20,
      color: theme.textColor,
      marginLeft: 25,
      marginVertical: 5,
    },

    formView: {
      margin: 20,
      marginTop: 40,
      padding: 30,
      minHeight: 450,
      borderRadius: 12,
      backgroundColor: 'transparent',
    },
    boxView: {
      margin: 10,
      marginBottom: 35,
    },
    dropDown: {
      backgroundColor: 'white',
      margin: 10,
      marginBottom: 20,
      borderRadius: 6,
    },

    button: {
      alignSelf: 'center',
      borderRadius: 16,
      borderWidth: 0,
      width: 300,
      margin: 10,
    },
    textButton: {
      color: 'white',
      fontWeight: '700',
    },
  });
};
