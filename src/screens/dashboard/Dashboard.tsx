import React, {useCallback, useContext, useState} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {PieCharts, Cards} from '../../components';
import {getVoilatorsAndVoilationsFixesData} from '../../service/employee-github-history.service';
import {
  employeeMonthAndYearCount,
  getEmployeeCount,
} from '../../service/employee.service';
import {
  IEmployeeMonthlyAndYearlyCount,
  employeeMontlyAndYearlyInitialData,
} from '../../types/employee';
import {IStatsData, statsData} from '../../types/pieCharData';
import {
  IVoilatorsAndVoilationsFixedType,
  initialVoilatorsAndVoilationsFixedData,
} from '../../types/voilators';
import {useFocusEffect} from '@react-navigation/native';
import wait from '../../service/refreshingTime';
import {ThemeContext} from '../../context';
import {ThemeContextType} from '../../types/context';

const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();
const currentMonth = todaysDate.getMonth() + 1;

function Dashboard() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {theme} = useContext(ThemeContext) as ThemeContextType;

  const [voilatorsAndVoilationData, setVoilatorsAndVoilationData] =
    useState<IVoilatorsAndVoilationsFixedType>(
      initialVoilatorsAndVoilationsFixedData,
    );
  const [pieChartStats, setPieChartStats] = useState<IStatsData>(statsData);
  const [employeeCardData, setEmployeeCardData] =
    useState<IEmployeeMonthlyAndYearlyCount>(
      employeeMontlyAndYearlyInitialData,
    );

  const getYearlyMonthlyEmpCount = async () => {
    const data = await employeeMonthAndYearCount(currentMonth, currentYear);
    setEmployeeCardData(data[0]);
  };

  const getFixesAndVoilators = async () => {
    const currentYearForV = new Date().getFullYear();
    const prevYear = currentYearForV - 1;
    const data = await getVoilatorsAndVoilationsFixesData(
      String(prevYear),
      String(currentYear),
    );
    setVoilatorsAndVoilationData(data[0]);
  };

  const findEmpCount = async () => {
    const data = await getEmployeeCount();
    setPieChartStats(data[0]);
  };

  const allDashboarData = async () => {
    // setIsLoading(true);
    await getFixesAndVoilators();
    await findEmpCount();
    await getYearlyMonthlyEmpCount();
    // setIsLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    allDashboarData();
    wait(2000).then(() => setRefreshing(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      allDashboarData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <ScrollView
      style={{backgroundColor: theme.backGroundColor}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <PieCharts stats={pieChartStats} />
      <Cards
        voilatorsAndVoilationData={voilatorsAndVoilationData}
        employeeCardData={employeeCardData}
      />
    </ScrollView>
  );
}

export default Dashboard;
