import jwt_decode from 'jwt-decode';
import {localStorageKey} from '../shared/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface MyToken {
  username: string;
  userId: string;
  exp: number;
}
const {key} = localStorageKey;
const getLocalAccessToken = async() => {
  let token = await AsyncStorage.getItem(key);
  if (typeof token === 'string') {
    token = JSON.parse(token);
  }
  return token;
};
const setUserToken = async (token: string) => {
  await AsyncStorage.setItem(key, JSON.stringify(token));
};
const removeUser = () => {
  AsyncStorage.removeItem(key);
};

const getLoggedInUserDetails = async () => {
  const token = await getLocalAccessToken();
  const userDetails = jwt_decode<MyToken>(token!);
  return userDetails;
};

const TokenService = {
  getLocalAccessToken,
  setUserToken,
  removeUser,
  getLoggedInUserDetails,
};
export default TokenService;
