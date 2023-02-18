import {View, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import styles from '../../style/piechartsStyle';
import {Text} from 'react-native-paper';
import {IStatsData} from '../../types/pieCharData';
import {useContext} from 'react';
import {ThemeContext} from '../../context';
import {ThemeContextType} from '../../types/context';

type PropType = {
  stats: IStatsData;
};
function EmployeePieChart({stats}: PropType) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const employeesData = [
    {
      name: 'Voilators',
      population: Number(stats.violatorscount),
      color: '#57d5ab',
      legendFontColor: '#57d5ab',
      legendFontSize: 15,
    },
    {
      name: 'Non Voilators',
      population: Number(stats.employeecount) - Number(stats.violatorscount),
      color: '#2496ff',
      legendFontColor: '#2496ff',
      legendFontSize: 15,
    },
  ];
  return (
    <View>
      <Text
        style={[
          styles.header,
          {backgroundColor: theme.backGroundCard, color: theme.textColor},
        ]}>
        Employees
      </Text>
      <PieChart
        data={employeesData}
        width={Dimensions.get('window').width - 27}
        height={200}
        chartConfig={{
          backgroundColor: '#1cc910',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          backgroundColor: theme.backGroundCard,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          margin: 7,
          paddingTop: 10,
          marginTop: 0,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[0, -15]}
        absolute
      />
    </View>
  );
}

export default EmployeePieChart;
