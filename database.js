import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    location:'default',
    name:'db_todo',

}, () => {
    console.log('Başarılı');
}, (err) => {
    console.log('Başarısız',err);
});

const DB_Initial = () => {
    db.transaction( (tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS publicTodo_table (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(400) NOT NULL, done BIT DEFAULT 0)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS privateNotes (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(2000) NOT NULL)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS auth_table (id INTEGER PRIMARY KEY AUTOINCREMENT, password NVARCHAR(30) NOT NULL)');
        tx.executeSql('INSERT INTO privateNotes (todo) VALUES(?)',['Henüz Not Eklenmedi'])
    },[],()=> console.log('DB initial başarılı'), () => console.log('DB inital başarısız'));
}

const DB_reset = () => {
    db.transaction( tx => {
        tx.executeSql('DELETE FROM publicTodo_table');
        tx.executeSql('DELETE FROM privateNotes');
        tx.executeSql('DELETE FROM auth_table');
    });
};

const readUser = () => {
    let response = {};
    db.transaction( tx => {
        tx.executeSql('SELECT * FROM auth_table',[],
            (tx,result)=>{
                console.log('User Okuma Başarılı');
                response.data = result.rows.item(0) || undefined;
            },
            (tx,err)=>{
                console.log('User Okuma Başarısız');
            }
        )}
    )
    /**
    * response = { data:{ password:'şifre1', id:1 } }
    **/
    return response;
};

const createUser = (password) => {
    db.transaction( tx => { tx.executeSql('INSERT INTO auth_table (password) VALUES(?)', [password]); } );
};


const deletePassword = () =>{ db.transaction( tx => { tx.executeSql('DELETE FROM auth_table'); } ); };

/* Yeniler */



export {
    db,
    DB_Initial,
    DB_reset,
    readUser,
    createUser,
    deletePassword,
};
