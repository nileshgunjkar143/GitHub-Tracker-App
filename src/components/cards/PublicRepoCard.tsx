import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, DataTable, Title, Paragraph, Text} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IVoilatorsAndVoilationsFixedType} from '../../types/voilators';
import {themeType} from '../../types/context';

type PropsType = {
  voilationData: IVoilatorsAndVoilationsFixedType;
  currentYear: number;
  theme: themeType;
};

function PublicRepoCard({voilationData, currentYear, theme}: PropsType) {
  const styles = makeStyles(theme);
  return (
    <Card style={styles.mainCard}>
      <DataTable.Row style={styles.rowCard}>
        <DataTable.Cell>
          <Card.Content style={styles.cardContentStyle}>
            <View style={styles.iconView}>
              <AntDesign color="#04a671" size={30} name="github" />
              <Text style={styles.iconText}>
                {voilationData?.violations_count}
              </Text>
            </View>
            <Title style={styles.cardTitleStyle}>Public Repos</Title>
          </Card.Content>
        </DataTable.Cell>
        <DataTable.Cell>
          <Card.Content style={styles.cardContentStatusStyle}>
            <Paragraph style={styles.forYear}>
              {' '}
              <AntDesign color="red" size={20} name="arrowdown" />{' '}
              {voilationData?.total_violations_fixed} Removed ({currentYear})
            </Paragraph>
            <Paragraph style={styles.vforMonth}>
              {' '}
              <AntDesign color="green" size={20} name="arrowup" />{' '}
              {voilationData?.max_violations_count} Added ({currentYear})
            </Paragraph>
          </Card.Content>
        </DataTable.Cell>
      </DataTable.Row>
    </Card>
  );
}

export default PublicRepoCard;

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
