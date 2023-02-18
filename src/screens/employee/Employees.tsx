import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {EmployeeList, EmployeeSearch} from '../../components';
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeBySearch,
} from '../../service/employee.service';
import {IEmployee} from '../../types/employee';
import wait from '../../service/refreshingTime';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';

function Employees({navigation}: any) {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {theme} = useContext(ThemeContext) as ThemeContextType;

  const styles = makeStyles(theme);
  const searchFilteredData = async (value: string) => {
    setIsLoading(true);
    const data = await getEmployeeBySearch(value);
    setIsLoading(false);
    setEmployees(data);
  };

  const getEmployees = async () => {
    setIsLoading(true);
    const data = await getAllEmployees();
    setIsLoading(false);
    setEmployees(data);
  };

  const delEmpHelper = async (empId: string) => {
    const response = await deleteEmployee(empId);
    if (response.status === 200) {
      const copyList = [...employees];
      const newEmployeeList = copyList.filter(
        (emp: IEmployee) => emp.id !== empId,
      );
      setEmployees(newEmployeeList);
    }
  };

  const deleteTheEmployee = (id: string) => {
    delEmpHelper(id);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getEmployees();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    searchFilteredData(inputValue);
  }, [inputValue]);

  useFocusEffect(
    useCallback(() => {
      getEmployees();
    }, []),
  );

  const toggleAddEmployee = () => {
    navigation.navigate('Add Employee');
  };
  const toggleUploadEmployee = () => {
    navigation.navigate('Upload Employees');
  };

  return (
    <View style={styles.mainView}>
      <EmployeeSearch
        setInputValue={setInputValue}
        inputValue={inputValue}
        toggleAddEmployee={toggleAddEmployee}
        toggleUploadEmployee={toggleUploadEmployee}
      />
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <EmployeeList
          employees={employees}
          deleteEmployee={deleteTheEmployee}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </View>
  );
}

export default Employees;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {
      flex: 1,
      paddingBottom: 75,
      backgroundColor: theme.backGroundColor,
    },
  });
};
