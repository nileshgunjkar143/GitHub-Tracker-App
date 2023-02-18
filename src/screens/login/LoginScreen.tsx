/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {UserType} from '../../types/user';
import {
  ActivityIndicator,
  Button,
  HelperText,
  MD2Colors,
  TextInput,
} from 'react-native-paper';
import AuthService from '../../service/authService';
import TokenService from '../../service/token.service';

const LoginScreen = ({navigation}: any) => {
  const [loginData, setLoginData] = useState<UserType>({
    username: '',
    password: '',
  });
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const {username, password} = loginData;

  const handleChange = (name: string, val: string) => {
    setLoginData({
      ...loginData,
      [name]: val,
    });
  };

  const alert = async () => {
    Alert.alert(
      'Error',
      'Please enter valid email address and password',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const authUser = async (username: string, password: string) => {
    try {
      setLoader(true);
      const auth = await AuthService.login(username, password);
      const tokenData = auth?.data.accessToken;
      setLoader(false);
      await TokenService.setUserToken(tokenData);
       navigation.navigate('Screens');
    } catch (e) {
      console.log(e);
      setLoader(false);
      alert();
    }
  };

  const handleSubmit = async () => {
    try {
      if (username && password) {
        setError(false);
        authUser(username, password);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: '#ffffff'}}>
      <ImageBackground
        source={require('../../assets/loginBackground.png')}
        style={{
          height: Dimensions.get('window').height / 2.5,
        }}
      />
      <View style={styles.bottomView}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Welcome To</Text>
          <Text style={styles.welcomeText}>GitHub Tracker App</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.username}
              label="Username"
              mode="outlined"
              value={loginData.username}
              onChangeText={val => handleChange('username', val)}
            />
            <TextInput
              style={styles.password}
              label="Password"
              mode="outlined"
              secureTextEntry={show}
              right={
                <TextInput.Icon
                  icon={show ? 'eye' : 'eye-off'}
                  onPress={() => setShow(!show)}
                />
              }
              value={loginData.password}
              onChangeText={val => handleChange('password', val)}
            />
            <HelperText style={{margin: 10}} type="error" visible={error}>
              Please enter your username and password!
            </HelperText>
          </View>
          <View style={styles.buttonGroup}>
            <Button
              style={styles.loginBtn}
              buttonColor="#16242a"
              mode="contained"
              onPress={handleSubmit}>
              <Text>Login</Text>
            </Button>
          </View>
          <View>
            {loader && (
              <ActivityIndicator
                size={30}
                animating={true}
                color={MD2Colors.red800}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#16242a',
    fontSize: 27,
    textAlign: 'center',
    fontWeight: '500',
  },
  welcomeView: {padding: 40},
  buttonGroup: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  password: {
    margin: 5,
  },
  username: {
    margin: 5,
  },
  inputView: {marginTop: 50},
  loginBtn: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
    borderRadius: 20,
    margin: 5,
    marginTop: 0,
  },
});
