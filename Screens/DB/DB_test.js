import React from 'react'
import { View, Text, Button} from 'react-native'
import { DB_Initial, DB_reset } from '../../database'
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    location:'default',
    name:'db_todo',
}, () => {
    console.log('Başarılı DB Test');
}, (err) => {
    console.log('Başarısız DB Test',err);
});



const DB_test = () => {
    const readUser = () => {
        DB_Initial()
        let response = undefined;
        db.transaction( tx => {
            tx.executeSql('SELECT * FROM privateNotes',[],
                (tx,result)=>{
                    response = result.rows.item(0);
                    console.log('response:',response);
                    console.log('result.rows:',result.rows.item(0))
                },
                (tx,err)=>{
                    console.log('User Okuma Başarısız');
                }
            )}
        )
    };
    
    const createUser = (password) => {
        db.transaction( tx => { 
            tx.executeSql('INSERT INTO auth_table (password) VALUES(?)', [password], 
                (tx,result)=>{
                    console.log('ekleme başarılı')
                },
                (tx,err)=>{
                    console.log('şifre ekleme başarısız')
                }
        ); } );
    };
    return (
        <View style={{flex:1, justifyContent:'space-evenly'}}>
            <Button title='Şifre Oku' onPress={readUser}/>
            <Button title='Şifre Oluştur' onPress={() => {createUser('sifre')}}/>
            <Button title='Initial' onPress={DB_Initial}/>
            <Button title='Reset' onPress={DB_reset}/>
        </View>
    )
}

export default DB_test;
