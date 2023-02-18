import React, {useCallback, useContext, useState} from 'react';
import {
  TouchableOpacity,
  View,
  ToastAndroid,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import {Avatar, Card, Text} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AuthService from '../../service/authService';
import {getIndividualProfile} from '../../service/user.service';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';
import {useFocusEffect} from '@react-navigation/native';

function SettingsScreen({navigation}: any) {
  const [userData, setUserData] = useState({firstName: '', lastName: ''});
  const {mode, setMode, theme} = useContext(ThemeContext) as ThemeContextType;

  const styles = makeStyles(theme);

  const getUserProfile = async () => {
    const data = await getIndividualProfile();
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };
  const handleSignOut = () => {
    AuthService.logout();
    navigation.navigate('Login');
    ToastAndroid.show('You have successfully Sign Out', ToastAndroid.SHORT);
  };

  const onToggleTheme = () => {
    setMode(!mode);
  };
  const RightContentAccount = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Profile Setting')}>
      <SimpleLineIcons
        color={theme.textColor}
        style={styles.rightContentIconStyle}
        size={13}
        name="arrow-right"
      />
    </TouchableOpacity>
  );

  const RightContentOfUserSetting = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('System User Settings')}>
      <SimpleLineIcons
        color={theme.textColor}
        style={styles.rightContentIconStyle}
        size={13}
        name="arrow-right"
      />
    </TouchableOpacity>
  );
  const RightContentAppSetting = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Application Settings')}>
      <SimpleLineIcons
        color={theme.textColor}
        style={styles.rightContentIconStyle}
        size={13}
        name="arrow-right"
      />
    </TouchableOpacity>
  );
  const RightContentOfSignOut = () => (
    <TouchableOpacity onPress={handleSignOut}>
      <SimpleLineIcons
        color={theme.textColor}
        style={styles.rightContentIconStyle}
        size={13}
        name="arrow-right"
      />
    </TouchableOpacity>
  );
  const RightContentOfDarkMode = () => (
    <Switch
      thumbColor={mode ? '#6750a4' : 'white'}
      value={mode}
      onValueChange={onToggleTheme}
    />
  );
  const LeftContentAccount = () => (
    <Avatar.Icon
      style={styles.leftContentIconStyle}
      size={52}
      color="#a7a4c2"
      icon="account"
    />
  );
  const LeftContentOfAppSetting = () => (
    <Avatar.Icon
      style={styles.leftContentIconStyle}
      size={50}
      color="#a7a4c2"
      icon="application-settings-outline"
    />
  );
  const LeftContentOfUserSetting = () => (
    <Avatar.Icon
      style={styles.leftContentIconStyle}
      size={50}
      color="#a7a4c2"
      icon="cog"
    />
  );
  const LeftContentOfDarkMode = () => (
    <Avatar.Icon
      style={[styles.leftContentIconStyle, {transform: [{rotate: '320deg'}]}]}
      size={50}
      color="#a7a4c2"
      icon="moon-waning-crescent"
    />
  );
  const LeftContentOfSignOut = () => (
    <Avatar.Icon
      style={styles.leftContentIconStyle}
      size={50}
      color="#a7a4c2"
      icon="logout"
    />
  );

  useFocusEffect(
    useCallback(() => {
      getUserProfile();
    }, []),
  );

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.settingView}>
        <Card style={styles.cardView}>
          <Card.Title
            title={`${userData?.firstName} ${userData?.lastName}`}
            titleStyle={styles.accountCardTitle}
            subtitleStyle={styles.accountSubTitle}
            subtitle="Personal Info"
            left={LeftContentAccount}
            right={RightContentAccount}
          />
        </Card>
      </View>
      <View style={styles.settingView}>
        <Text style={styles.textStyle}>Settings</Text>
        <Card style={styles.cardView}>
          <Card.Title
            title={false}
            subtitle="Application Settings"
            subtitleStyle={styles.settingCardTitle}
            left={LeftContentOfAppSetting}
            right={RightContentAppSetting}
          />
          <Card.Title
            title={false}
            subtitle="System User Settings"
            subtitleStyle={styles.settingCardTitle}
            left={LeftContentOfUserSetting}
            right={RightContentOfUserSetting}
          />
          <Card.Title
            title={false}
            subtitle="Dark Mode"
            subtitleStyle={styles.settingCardTitle}
            left={LeftContentOfDarkMode}
            right={RightContentOfDarkMode}
          />
          <Card.Title
            title={false}
            subtitle="Sign Out"
            subtitleStyle={{
              color: '#ff738b',
              marginLeft: 20,
              fontWeight: '800',
              fontSize: 16,
            }}
            left={LeftContentOfSignOut}
            right={RightContentOfSignOut}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

export default SettingsScreen;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {flex: 1, backgroundColor: theme.backGroundColor},
    settingView: {
      marginTop: 10,
      margin: 10,
      borderRadius: 12,
      alignContent: 'flex-start',
      padding: 10,
      marginHorizontal: 0,
      paddingHorizontal: 5,
    },
    cardView: {
      margin: 10,
      marginVertical: 15,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadowColor: 'transparent',
    },
    textStyle: {
      fontSize: 20,
      color: theme.textColor,
      marginLeft: 25,
      marginVertical: 5,
    },
    accountCardTitle: {color: theme.textColor, marginLeft: 20, fontSize: 18},
    settingCardTitle: {color: theme.textColor, marginLeft: 20, fontSize: 16},
    accountSubTitle: {color: '#a7a4c2', marginLeft: 20, fontSize: 12},
    rightContentIconStyle: {
      borderRadius: 13,
      padding: 15,
      paddingLeft: 16,
      backgroundColor: theme.iconColor,
    },
    leftContentIconStyle: {backgroundColor: theme.iconColor, marginRight: 50},
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
      backgroundColor: '#f0f2f5',
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
