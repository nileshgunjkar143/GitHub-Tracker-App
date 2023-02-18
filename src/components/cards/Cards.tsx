import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context';
import {ThemeContextType} from '../../types/context';
import {IEmployeeMonthlyAndYearlyCount} from '../../types/employee';
import {IVoilatorsAndVoilationsFixedType} from '../../types/voilators';
import EmployeeCard from './EmployeeCard';
import PublicRepoCard from './PublicRepoCard';
import VoilatorsCard from './VoilatorsCard';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const todaysDate = new Date();
const currentYear = todaysDate.getFullYear();
const currentMonth = month[todaysDate.getMonth()];

type PropTypes = {
  voilatorsAndVoilationData: IVoilatorsAndVoilationsFixedType;
  employeeCardData: IEmployeeMonthlyAndYearlyCount;
};

function Cards({voilatorsAndVoilationData, employeeCardData}: PropTypes) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyles();
  return (
    <View style={styles.mainView}>
      <EmployeeCard
        employeeCardData={employeeCardData}
        currentMonth={currentMonth}
        currentYear={currentYear}
        theme={theme}
      />
      <PublicRepoCard
        voilationData={voilatorsAndVoilationData}
        currentYear={currentYear}
        theme={theme}
      />
      <VoilatorsCard
        voilatorsData={voilatorsAndVoilationData}
        currentYear={currentYear}
        theme={theme}
      />
    </View>
  );
}

export default Cards;

const makeStyles = () => {
  return StyleSheet.create({
    mainView: {marginHorizontal: 6, marginBottom: 7},
  });
};
