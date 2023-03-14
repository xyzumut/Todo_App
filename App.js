// import 'react-native-gesture-handler';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLock, faClipboard, faAddressBook} from '@fortawesome/free-solid-svg-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createPublicTodo, DB_Initial, DB_reset, readPublicTodo} from './database';
import { Kasa, Todolar } from './Screens/allScreens';
import CustomDrawer from './Components/CustomDrawer/CustomDrawer';
import { colors } from './colors';
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const DrawerOptions = {
  drawerActiveTintColor:colors.aqua,
  drawerInactiveTintColor:colors.aqua,
  drawerActiveBackgroundColor:colors.aquaShadow,
  headerStyle:{
    backgroundColor:colors.purple,
  },
  headerTintColor:colors.dark_purple,
}


const App = () => {
  React.useEffect(()=>{
    // DB_Initi  },[])
    console.log('APP Render Oldu')
  })
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={ props => <CustomDrawer {...props} />}
        screenOptions={DrawerOptions}
        
      > 
         <Drawer.Screen name='Todolar'  component={Todolar} options={{
            drawerIcon: () => <FontAwesomeIcon icon={faClipboard} color={colors.aqua}/>
         }}/> 
         <Drawer.Screen name='Kasa'  component={Kasa} options={{
            drawerIcon: (props) => <FontAwesomeIcon icon={faLock} color={colors.aqua}/>
         }}/> 
       </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;