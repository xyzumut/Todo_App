import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import SQLite from 'react-native-sqlite-storage'
import { db, DB_Initial, createUser, readUser, DB_reset, createPublicTodo, readPublicTodo, createPrivateTodo, readPrivateTodo, deletePassword } from './database';


const App = () => {
  React.useEffect(()=>{
    DB_Initial()
  },[])
  console.log('RENDER OLDU')
  return (
    <View>
      <Text>Selam</Text>
      <Button title='Listele' onPress={readUser}/>
      <Button title='Ekle' onPress={() => createUser('şifre1')}/>
      <Button title='Reset' onPress={DB_reset}/>
      <Button title='Public Todo Ekle' onPress={() => createPublicTodo('Yemek Yap')}/>
      <Button title='Public Todo Listele' onPress={readPublicTodo}/>
      <Button title='Private Todo Ekle' onPress={() => createPrivateTodo('Yemek Yap')}/>
      <Button title='Private Todo Listele' onPress={readPrivateTodo}/>
      <Button title='Şifreyi Kaldır' onPress={deletePassword}/>
    </View>
  );
};

export default App;
