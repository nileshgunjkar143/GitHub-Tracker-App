import React, {useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
  StyleSheet,
} from 'react-native';
import {IStatsData} from '../../types/pieCharData';
import {EmployeePieChart, RepoPieChart} from '.';

type PropType = {
  stats: IStatsData;
};

function PieCharts({stats}: PropType) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = makeStyles();

  let {width: windowWidth, height: windowHeight} = useWindowDimensions();
  windowHeight = windowHeight - 390;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.scrollContainer, {height: windowHeight}]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          <>
            <EmployeePieChart stats={stats} />
            <RepoPieChart stats={stats} />
          </>
        </ScrollView>
      </View>
      <View style={styles.indicatorContainer}>
        {[0, 1].map((num, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View key={num} style={[styles.normalDots, {width}]} />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default PieCharts;

const makeStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 13,
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },

    scrollContainer: {
      shadowColor: '#6A6C6E',
      shadowOffset: {
        width: 10,
        height: -10,
      },
      shadowOpacity: 1,
      // marginTop:100
      marginHorizontal: 6,
    },
    indicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    normalDots: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#14bfda',
      marginHorizontal: 4,
    },
  });
};
