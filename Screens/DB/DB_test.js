import React from 'react';
import { View, Button} from 'react-native';
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
        db.transaction( tx => {
            tx.executeSql('SELECT * FROM privateNotes',[],
                (tx,result)=>{
                    console.log('result.rows',result.rows)
                    for (let index = 0; index < result.rows.length; index++) {
                        console.log(result.rows.item(index))
                    }
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

    const DB_reset = () => {
        db.transaction( tx => {
            tx.executeSql('DELETE FROM publicTodo_table');
            tx.executeSql('DELETE FROM privateNotes');
            tx.executeSql('DELETE FROM auth_table');
        });
    };

    return (
        <View style={{flex:1, justifyContent:'space-evenly'}}>
            <Button title='Şifre Oku' onPress={readUser}/>
            <Button title='Şifre Oluştur' onPress={() => {createUser('sifre')}}/>
            <Button title='Reset' onPress={DB_reset}/>
        </View>
    )
}

export default DB_test;
