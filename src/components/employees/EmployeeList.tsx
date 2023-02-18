import React, {useContext} from 'react';
import {
  FlatList,
  View,
  Image,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';
import Octicons from 'react-native-vector-icons/Octicons';
import {IEmployee} from '../../types/employee';
import {ThemeContext} from '../../context';
import {ThemeContextType, themeType} from '../../types/context';

type EmployeeListPropType = {
  employees: IEmployee[];
  deleteEmployee: (id: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

function EmployeeList(Props: EmployeeListPropType) {
  const {employees, deleteEmployee, onRefresh, refreshing} = Props;
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const styles = makeStyle(theme);

  const handleDelete = (id: string) => {
    alert(id);
  };

  const alert = async (id: string) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteEmployee(id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const subTitleData = (item: {public_repos: number; public_gists: number}) => (
    <>
      <Octicons color="green" size={17} name="repo" /> {item.public_repos}
      {'     '}
      <Image source={require('../../assets/gist.png')} /> {item.public_gists}
    </>
  );

  const renderItem = ({item}: any) => {
    return (
      <Card style={styles.cardView}>
        <Card.Title
          title={item.employeeName}
          subtitle={subTitleData(item)}
          titleStyle={styles.titleStyle}
          subtitleStyle={styles.subtitleStyle}
          left={(props: any) =>
            item.avatar_url ? (
              <Avatar.Image
                {...props}
                source={{
                  uri: item.avatar_url,
                }}
                style={{width: 40, height: 40}}
              />
            ) : (
              <Avatar.Icon
                size={40}
                icon={require('../../assets/account.png')}
              />
            )
          }
          right={(props: any) => (
            <IconButton
              iconColor="#ed494d"
              {...props}
              icon="delete"
              onPress={() => {
                handleDelete(item.id);
              }}
            />
          )}
        />
      </Card>
    );
  };
  return (
    <View style={styles.scrollView}>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export default EmployeeList;

const makeStyle = (theme: themeType) => {
  return StyleSheet.create({
    mainView: {flex: 1, paddingBottom: 75},
    scrollView: {marginTop: 10},
    cardView: {
      padding: 4,
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 12,
      border: 1,
      marginBottom: 2,
      backgroundColor: theme.backGroundCard,
    },
    titleStyle: {fontSize: 16, fontWeight: '700', color: theme.textColor},
    subtitleStyle: {fontSize: 17, color: theme.textColor},
  });
};
