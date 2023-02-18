import {useContext} from 'react';
import {View, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import {ThemeContext} from '../../context';
import styles from '../../style/piechartsStyle';
import {ThemeContextType} from '../../types/context';
import {IStatsData} from '../../types/pieCharData';

type PropType = {
  stats: IStatsData;
};

function RepoPieChart({stats}: PropType) {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const publicRepoData = [
    {
      name: 'Public Gists',
      population: Number(stats.publicgistcount),
      color: '#57d5ab',
      legendFontColor: '#57d5ab',
      legendFontSize: 15,
    },
    {
      name: 'Public Repos',
      population: Number(stats.publicrepocount),
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
        Public Repo
      </Text>
      <PieChart
        data={publicRepoData}
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
          paddingTop: 10,
          margin: 7,
          marginTop: 0,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[0, -16]}
        absolute
      />
    </View>
  );
}

export default RepoPieChart;
