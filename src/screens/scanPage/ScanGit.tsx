import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Alert,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import {getAllEmployees, scanGithub} from '../../service/employee.service';
import {getAllJobs} from '../../service/jobHistory.service';
import TokenService from '../../service/token.service';
import {JobHistoryType, ScanDataType} from '../../types/jobHistory';
import {message} from '../../shared';
import {useFocusEffect} from '@react-navigation/native';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';
import {ScanEmployees, ScanHistory} from '../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IEmployee} from '../../types/employee';
const {
  scanJob: {inProgress, onSuccess},
} = message;

function ScanGit() {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyles(theme);
  const [jobHistory, setJobHistory] = useState<JobHistoryType[]>([]);
  const [showScanHistory, setShowScanHistory] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getJobHistory = async () => {
    setIsLoading(true);
    const data = await getAllJobs();
    setIsLoading(false);

    const sortData = data.sort(
      (jobFirst: JobHistoryType, jobSecond: JobHistoryType) =>
        new Date(jobSecond.date).getTime() - new Date(jobFirst.date).getTime(),
    );
    setJobHistory(sortData);
  };

  const alert = async (massage: string | undefined) => {
    Alert.alert(
      'Alert',
      massage,
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const handleCheckBoxChange = (checked: boolean, value: string) => {
    const updatedEmployee = [...employees].map((emp: IEmployee) => {
      if (value === emp.id) {
        return {...emp, checked};
      }
      return emp;
    });
    const updatedEmployeeList = [...employeeList].map((emp: IEmployee) => {
      if (value === emp.id) {
        return {...emp, checked};
      }
      return emp;
    });
    setEmployees(updatedEmployee);
    setEmployeeList(updatedEmployeeList);
  };
  const getEmployees = async () => {
    setIsLoading(true);
    const data = await getAllEmployees();
    setIsLoading(false);
    const newData = [...data].map((emp: IEmployee) => ({
      ...emp,
      checked: false,
    }));
    setEmployees(newData);
    setEmployeeList(newData);
  };
  const handleSearchChange = (
    value: React.SetStateAction<string | undefined>,
  ) => {
    setSearchValue(value);
    if (value === ''.trim()) {
      setEmployees(employeeList);
      return;
    }
  };
  const clearFilter = () => {
    const updatedEmployee = [...employees].map((emp: IEmployee) => {
      return {...emp, checked: false};
    });
    setEmployees(updatedEmployee);
    setEmployeeList(updatedEmployee);
  };

  const handleSubmitSearch = () => {
    if (!searchValue) {
      return;
    }
    const newEmployee = employees.filter(
      (emp: IEmployee) =>
        emp.employeeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        emp.github_username.toLowerCase().includes(searchValue.toLowerCase()) ||
        emp.officeEmail.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setEmployees(newEmployee);
  };

  const userdata = TokenService.getLoggedInUserDetails();

  const scanGitManually = async () => {
    const user = await userdata;
    const filteredData: ScanDataType[] = [...employeeList]
      .filter(emp => emp.checked === true)
      .map(emp => ({github_username: emp.github_username, id: emp.id}));
    const response = await scanGithub(user.userId, filteredData);
    if (response.data) {
      alert(inProgress);
      return;
    }
    alert(onSuccess);
    setTimeout(() => {
      getJobHistory();
    });
    setShowScanHistory(true)
  };

  useFocusEffect(
    useCallback(() => {
      getJobHistory();
      getEmployees();
    }, []),
  );

  return (
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <TouchableOpacity onPress={() => setShowScanHistory(false)}>
          <Text
            style={
              showScanHistory
                ? styles.titleTextView
                : styles.titleTextViewActive
            }>
            <AntDesign name="scan1" size={16} /> Scan Employees
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowScanHistory(true)}>
          <Text
            style={
              !showScanHistory
                ? styles.titleTextView
                : styles.titleTextViewActive
            }>
            <MaterialCommunityIcons name="history" size={16} /> Scan History
          </Text>
        </TouchableOpacity>
      </View>

      {showScanHistory ? (
        isLoading ? (
          <ActivityIndicator animating={true} size="large" />
        ) : (
          <ScanHistory
            getJobHistory={getJobHistory}
            jobHistory={jobHistory}
            theme={theme}
          />
        )
      ) : (
        <ScanEmployees
          employees={employees}
          handleSubmitSearch={handleSubmitSearch}
          handleSearchChange={handleSearchChange}
          clearFilter={clearFilter}
          handleCheckBoxChange={handleCheckBoxChange}
          scanGitManually={scanGitManually}
          theme={theme}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}
    </View>
  );
}

export default ScanGit;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {backgroundColor: theme.backGroundColor, flex: 1},
    titleView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // backgroundColor: 'black',
      marginTop: 5,
      padding: 10,
      marginHorizontal: 10,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    titleTextView: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: 1,
      // paddingHorizontal: 5,
      marginTop: 10,
      fontWeight: '600',
      fontSize: 15,
      color: theme.textColor,
    },
    titleTextViewActive: {
      alignSelf: 'center',
      justifyContent: 'center',
      marginLeft: 1,
      // paddingHorizontal: 5,
      marginTop: 10,
      fontWeight: '600',
      fontSize: 15,
      color: '#1890ff',
    },
    iconView: {flexDirection: 'row'},
    iconStyle: {marginHorizontal: 8},
    iconText: {color: theme.textColor},
    scrollView: {
      // backgroundColor: '#20343c',
      margin: 10,
      marginTop: 0,
      borderBottomEndRadius: 12,
      borderBottomStartRadius: 12,
      minHeight: 451,
      padding: 5,
      marginBottom: 150,
    },
    container: {flex: 1, padding: 16, paddingTop: 30},
    head: {height: 40, backgroundColor: theme.backGroundCard},
    headText: {margin: 6, color: theme.textColor, fontWeight: '500'},
    text: {margin: 6, color: theme.textColor},
    colStyle: {backgroundColor: theme.backGroundCard},
  });
};
