import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, DataTable, Title, Paragraph, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {IEmployeeMonthlyAndYearlyCount} from '../../types/employee';
import {themeType} from '../../types/context';

type PropType = {
  employeeCardData: IEmployeeMonthlyAndYearlyCount;
  currentMonth: string;
  currentYear: number;
  theme: themeType;
};

function EmployeeCard({
  employeeCardData,
  currentMonth,
  currentYear,
  theme,
}: PropType) {
  const styles = makeStyles(theme);
  return (
    <Card style={[styles.mainCard, {backgroundColor: theme.backGroundCard}]}>
      <DataTable.Row style={styles.rowCard}>
        <DataTable.Cell>
          <Card.Content style={styles.cardContentStyle}>
            <View style={styles.iconView}>
              <Feather color="#1890ff" size={30} name="users" />
              <Text style={[styles.iconText, {color: theme.textColor}]}>
                {employeeCardData?.total_employee_count}
              </Text>
            </View>
            <Title style={[styles.cardTitleStyle, {color: theme.textColor}]}>
              Employees
            </Title>
          </Card.Content>
        </DataTable.Cell>
        <DataTable.Cell>
          <Card.Content style={styles.cardContentStatusStyle}>
            <Paragraph style={[styles.forMonth, {color: theme.textColor}]}>
              <AntDesign color="green" size={20} name="arrowup" />{' '}
              {employeeCardData?.employee_monthly_count} Added ({currentMonth}-
              {currentYear})
            </Paragraph>
            <Paragraph style={[styles.forYear, {color: theme.textColor}]}>
              <AntDesign color="green" size={20} name="arrowup" />{' '}
              {employeeCardData?.employee_yearly_count} Added ({currentYear})
            </Paragraph>
          </Card.Content>
        </DataTable.Cell>
      </DataTable.Row>
    </Card>
  );
}

export default EmployeeCard;
const makeStyles = (theme: any) => {
  return StyleSheet.create({
    mainView: {marginHorizontal: 6, marginBottom: 7},
    mainCard: {
      padding: 15,
      marginTop: 10,
      marginHorizontal: 5,
      borderRadius: 12,
      border: 1,
      backgroundColor: theme.backGroundCard,
    },
    rowCard: {
      borderBottomWidth: 0,
      paddingLeft: 0,
      paddingRight: 10,
    },
    cardContentStyle: {paddingLeft: 7},
    cardContentStatusStyle: {paddingRight: 0, paddingLeft: 14},
    cardTitleStyle: {fontSize: 18, fontWeight: '500', color: theme.textColor},
    iconView: {flexDirection: 'row', flexWrap: 'wrap', margin: 4},
    iconText: {
      fontSize: 22,
      marginLeft: 5,
      fontWeight: '400',
      color: theme.textColor,
    },
    forMonth: {
      padding: 2,
    },
    vforMonth: {
      padding: 2,
      color: theme.textColor,
    },
    forYear: {
      padding: 2,
      color: theme.textColor,
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
      backgroundColor: 'white',
      borderRadius: 12,
      margin: 5,
    },
  });
};
