import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-paper';
import {
  Dashboard,
  SystemUser,
  ScanGit,
  LoginScreen,
  SettingsScreen,
  Employees,
} from '../screens';
import {
  AddEmployee,
  ApplicationSettings,
  ProfileSetting,
  SystemUserSettings,
  UploadEmployees,
} from '../components';
import {useContext} from 'react';
import {ThemeContext} from '../context';
import {ThemeContextType, themeType} from '../types/context';

const Tab = createBottomTabNavigator<any>();
const Stack = createNativeStackNavigator<any>();

const Screens = (theme: themeType) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: theme.backGroundColor, elevation: 5,shadowColor:'black'},
        headerTitleStyle: {color: theme.textColor},
        tabBarStyle: {
          backgroundColor: theme.backGroundColor,
          padding: 5,
          paddingBottom: 2,
          height: 55,
        },
        tabBarActiveTintColor: theme.tabBar,
        tabBarInactiveTintColor: theme.textColor,
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Dashboard"
        options={{
          tabBarLabel: ({focused, color}) => (
            <>
              <Text
                style={{
                  color: focused ? theme.tabBar : color,
                  fontSize: focused ? 14 : 13,
                }}>
                Home
              </Text>
            </>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <FontAwesome size={focused ? 25 : 23} color={color} name="home" />
            );
          },
        }}
        component={Dashboard}
      />
      <Tab.Screen
        name="Employees"
        options={{
          tabBarLabel: ({focused, color}) => (
            <>
              <Text
                style={{
                  color: focused ? theme.tabBar : color,
                  fontSize: focused ? 14 : 13,
                }}>
                Employees
              </Text>
            </>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <Feather size={focused ? 25 : 23} color={color} name="user" />
            );
          },
        }}
        component={Employees}
      />
      <Tab.Screen
        name="System User"
        options={{
          tabBarLabel: ({focused, color}) => (
            <>
              <Text
                style={{
                  color: focused ? theme.tabBar : color,
                  fontSize: focused ? 14 : 13,
                }}>
                Admin
              </Text>
            </>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <Feather size={focused ? 25 : 23} color={color} name="users" />
            );
          },
        }}
        component={SystemUser}
      />
      <Tab.Screen
        name="Scan Git"
        options={{
          tabBarLabel: ({focused, color}) => (
            <>
              <Text
                style={{
                  color: focused ? theme.tabBar : color,
                  fontSize: focused ? 14 : 13,
                }}>
                Scan
              </Text>
            </>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <Ionicons
                size={focused ? 27 : 25}
                color={color}
                name="scan-circle-outline"
              />
            );
          },
        }}
        component={ScanGit}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: ({focused, color}) => (
            <>
              <Text
                style={{
                  color: focused ? theme.tabBar : color,
                  fontSize: focused ? 14 : 13,
                }}>
                Account
              </Text>
            </>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <MaterialCommunityIcons
                size={focused ? 27 : 25}
                color={color}
                name="account-circle"
              />
            );
          },
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};
const MyTab = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const ScreensComponent = () => Screens(theme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: theme.backGroundColor},
        headerTitleStyle: {color: theme.textColor},
        headerTintColor: theme.textColor,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Add Employee" component={AddEmployee} />
      <Stack.Screen name="Upload Employees" component={UploadEmployees} />
      <Stack.Screen
        name="Application Settings"
        component={ApplicationSettings}
      />
      <Stack.Screen name="Profile Setting" component={ProfileSetting} />
      <Stack.Screen
        name="System User Settings"
        component={SystemUserSettings}
      />

      <Stack.Screen
        name="Screens"
        component={ScreensComponent}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MyTab;
