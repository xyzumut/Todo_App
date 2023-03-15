import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLock, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import { Kasa, Todolar } from './Screens/allScreens';
import CustomDrawer from './CustomDrawer/CustomDrawer';
import { colors } from './colors';

const db = SQLite.openDatabase({
  location:'default',
  name:'db_todo',
}, () => {
  console.log('Başarılı DB Test');
}, (err) => {
  console.log('Başarısız DB Test',err);
});

const Drawer = createDrawerNavigator();

const DrawerOptions = {
  drawerActiveTintColor:colors.aqua,
  drawerInactiveTintColor:colors.aqua,
  drawerActiveBackgroundColor:colors.aquaShadow,
  headerStyle:{
    backgroundColor:colors.purple,
  },
  headerTintColor:colors.dark_purple,
};

const DB_Initial = () => {
  db.transaction( (tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS publicTodo_table (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(400) NOT NULL, done BIT DEFAULT 0)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS privateNotes (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(2000) NOT NULL)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS auth_table (id INTEGER PRIMARY KEY AUTOINCREMENT, password NVARCHAR(30) NOT NULL)');
      tx.executeSql('SELECT * FROM privateNotes',[],
      (tx,result)=>{
        console.log('Note okuma başarılı', result.rows.item(0));
        if (result.rows.item(0) === undefined) {
          
          tx.executeSql('INSERT INTO privateNotes (todo) VALUES(?)',['Henüz Not Eklenmedi'])
        }
      },
      (tx,err)=>{
        console.log('Note okuma Başarısız');
      }
    );
  },[],()=> console.log('DB initial başarılı'), () => console.log('DB inital başarısız'));
}

const App = () => {
  React.useEffect(()=>{
    DB_Initial()
  });
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={ props => <CustomDrawer {...props} />}
        screenOptions={DrawerOptions}
      >
        <Drawer.Screen name={'Todolar'}  component={Todolar} options={{
          drawerIcon: () => <FontAwesomeIcon icon={faClipboard} color={colors.aqua}/>
        }}/>
        <Drawer.Screen name={'Kasa'}  component={Kasa} options={{
          drawerIcon: (props) => <FontAwesomeIcon icon={faLock} color={colors.aqua}/>,
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
