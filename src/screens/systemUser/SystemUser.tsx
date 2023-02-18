import React, {useCallback, useContext, useState} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {getUserProfiles} from '../../service/user.service';
import {Table, Row, Cols} from 'react-native-table-component';
import wait from '../../service/refreshingTime';
import {useFocusEffect} from '@react-navigation/native';
import {ThemeContextType, themeType} from '../../types/context';
import {ThemeContext} from '../../context';

interface DataType {
  id?: string;
  key?: string;
  username?: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  lastLoggedIn?: string;
  last_login: string;
}

const data = {
  tableHead: ['Name', 'Email', 'Last Logged In'],
};

function SystemUser() {
  const [users, setUsers] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {theme} = useContext(ThemeContext) as ThemeContextType;

  const styles = makeStyles(theme);

  const getAllUserProfiles = async () => {
    setIsLoading(true);
    const userData = await getUserProfiles();
    setIsLoading(false);
    setUsers(userData);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllUserProfiles();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllUserProfiles();
    }, []),
  );

  const dateFunction = (date: string | number | Date) => {
    var d = new Date(date);
    var month = new Intl.DateTimeFormat('en', {month: 'short'}).format(d);
    var day = d.getDate().toString().padStart(2, '0');
    var year = d.getFullYear().toString();
    year = year.substring(2);
    return `${day}-${month}-${year}`;
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Table borderStyle={styles.tableStyle}>
            <Row
              data={data.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            {users.map(user => (
              <Cols
                textStyle={styles.text}
                style={styles.colStyle}
                key={user.id}
                data={[
                  [`${user.firstName} ${user.lastName}`],
                  [user.email],
                  [dateFunction(user.last_login)],
                ]}
                heightArr={[50]}
              />
            ))}
          </Table>
        </ScrollView>
      )}
    </View>
  );
}

export default SystemUser;

const makeStyles = (theme: themeType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      backgroundColor: theme.backGroundColor,
    },
    head: {height: 40, backgroundColor: theme.backGroundCard},
    headText: {margin: 6, color: theme.textColor, fontWeight: '700'},
    text: {margin: 6, color: theme.textColor, fontWeight: '500'},
    tableStyle: {borderWidth: 1, borderColor: '#c8e1ff'},
    colStyle: {backgroundColor: theme.backGroundCard},
  });
};
