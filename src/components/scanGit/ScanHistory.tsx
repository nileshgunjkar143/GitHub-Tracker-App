import React, {useCallback, useContext, useState} from 'react';
import {View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Table, Row, Cols} from 'react-native-table-component';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import wait from '../../service/refreshingTime';

const tableData = {
  tableHead: ['Job Name', 'Date', 'Triggered', 'Status'],
};

function ScanHistory({getJobHistory, jobHistory, theme}: any) {
  const styles = makeStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getJobHistory();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dateFunction = (date: string | number | Date) => {
    var d = new Date(date);
    var month = new Intl.DateTimeFormat('en', {month: 'short'}).format(d);
    var day = d.getDate().toString().padStart(2, '0');
    var year = d.getFullYear().toString();
    year = year.substring(2);
    return `${day}-${month}-${year}`;
  };
  return (
    <View style={styles.scrollView}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
          <Row
            data={tableData.tableHead}
            style={styles.head}
            textStyle={styles.headText}
          />
          {jobHistory.map(
            (item: {
              id: React.Key | null | undefined;
              job: any;
              date: string | number | Date;
              triggered_by: any;
              status: string;
            }) => (
              <Cols
                style={styles.colStyle}
                textStyle={styles.text}
                key={item.id}
                data={[
                  [item?.job],
                  [dateFunction(item?.date)],
                  [item?.triggered_by],
                  [
                    item?.status === 'COMPLETED' ? (
                      <View style={styles.iconView}>
                        <Ionicons
                          name="checkmark-done"
                          color={theme.textColor}
                          size={17}
                          style={styles.iconStyle}
                        />
                        <Text style={styles.iconText}>Done</Text>
                      </View>
                    ) : (
                      <View style={styles.iconView}>
                        <Fontisto
                          name="radio-btn-active"
                          color={theme.textColor}
                          size={17}
                          style={styles.iconStyle}
                        />
                        <Text style={styles.iconText}>Active</Text>
                      </View>
                    ),
                  ],
                ]}
                heightArr={[50]}
              />
            ),
          )}
        </Table>
      </ScrollView>
    </View>
  );
}

export default ScanHistory;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {backgroundColor: theme.backGroundColor, flex: 1},
    titleView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      marginLeft: 10,
      paddingHorizontal: 5,
      marginTop: 5,
      fontWeight: '600',
      fontSize: 20,
      color: theme.textColor,
    },
    buttonStyle: {
      alignSelf: 'center',
      marginRight: 10,
      borderWidth: 0,
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
