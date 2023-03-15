import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLock, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DB_Initial } from './database';
import { Kasa, Todolar, DB_test } from './Screens/allScreens';
import CustomDrawer from './Components/CustomDrawer/CustomDrawer';
import { colors } from './colors';
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

const App = () => {
  React.useEffect(()=>{
    console.log('APP Render Oldu');
  });
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={ props => <CustomDrawer {...props} />}
        screenOptions={DrawerOptions}
      >
        <Drawer.Screen name={'Kasa'}  component={Kasa} options={{
          drawerIcon: (props) => <FontAwesomeIcon icon={faLock} color={colors.aqua}/>,
        }}/>
        <Drawer.Screen name={'Todolar'}  component={Todolar} options={{
          drawerIcon: () => <FontAwesomeIcon icon={faClipboard} color={colors.aqua}/>
        }}/>
        <Drawer.Screen name='DB_Test' component={DB_test}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
