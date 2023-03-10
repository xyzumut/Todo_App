import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase({
    location:'default',
    name:'db_todo',
}, () => {
    console.log('Başarılı')
}, (err) => {
    console.log('Başarısız')  
})

const DB_Initial = () => {
    db.transaction( (tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS publicTodo_table (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(400) NOT NULL, done BIT DEFAULT 0)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS privateTodo_table (id INTEGER PRIMARY KEY AUTOINCREMENT, todo NVARCHAR(400) NOT NULL, done BIT DEFAULT 0)')
        tx.executeSql('CREATE TABLE IF NOT EXISTS auth_table (id INTEGER PRIMARY KEY AUTOINCREMENT, password NVARCHAR(30) NOT NULL)')
    })  
}

const DB_reset = () => {
    db.transaction( tx => {
        tx.executeSql('DELETE FROM auth_table')
        tx.executeSql('DELETE FROM publicTodo_table')
        tx.executeSql('DELETE FROM privateTodo_table')
    })
};

const readUser = () => {
    let response = {}
    db.transaction( tx => {
        tx.executeSql('SELECT * FROM auth_table',[],
            (tx,result)=>{
                console.log('User Okuma Başarılı')
                response.data = result.rows.item(0) || undefined
            },
            (tx,err)=>{
                console.log('User Okuma Başarısız')
            }
        )}
    )
    /**
    * response = { data:{ password:'şifre1', id:1 } }
    **/
   console.log(response)
    return response
};

const createUser = (password) => {
    db.transaction( tx => {tx.executeSql('INSERT INTO auth_table (password) VALUES(?)',[password])})
};

const readPublicTodo = () => {
    let response = {data:[]}
    db.transaction( tx => {
        tx.executeSql('SELECT * FROM publicTodo_table',[],
            (tx,result)=>{
                console.log('Public Todo Okuma Başarılı')
                for (let index = 0; index < result.rows.length; index++) {
                    response.data = [...response.data, result.rows.item(index)]
                }
            },
            (tx,err)=>{
                console.log('Public Todo Okuma Başarısız')
            }
        )}
    )
    /**
    * response = { data:[ {done:0, todo:'Yapılacak iş1', id:1}, {done:1, todo:'Yapılacak iş2', id:2} ] } 
    **/
    return response
};

const createPublicTodo = (todo) => {
    db.transaction( tx => {tx.executeSql('INSERT INTO publicTodo_table (todo, done) VALUES(?,?)',[todo,0])})
};

const readPrivateTodo = () => {
    let response = {data:[]}
    db.transaction( tx => {
        tx.executeSql('SELECT * FROM privateTodo_table',[],
            (tx,result)=>{
                console.log('Private Todo Okuma Başarılı')
                for (let index = 0; index < result.rows.length; index++) {
                    response.data = [...response.data, result.rows.item(index)]
                }
            },
            (tx,err)=>{
                console.log('Private Todo Okuma Başarısız')
            }
        )}
    )
    /**
    * response = { data:[ {done:0, todo:'Yapılacak iş1', id:1}, {done:1, todo:'Yapılacak iş2', id:2} ] } 
    **/
    return response
};

const createPrivateTodo = (todo) => {
    let response = {}
    db.transaction( tx => {
        tx.executeSql('INSERT INTO privateTodo_table (todo, done) VALUES(?,?)',[todo,0],
            (tx,result)=>{
                console.log('Private Todo Ekleme Başarılı')
            },
            (tx, err) => {
                console.log('Private Todo Ekleme Başarısız')
            }
        )
    })
    return response
};

const deletePassword = () =>{ db.transaction( tx => { tx.executeSql('DELETE FROM auth_table') }) }

export{
    db,
    DB_Initial,
    DB_reset,
    readUser,
    createUser,
    createPublicTodo,
    readPublicTodo,
    createPrivateTodo, 
    readPrivateTodo,
    deletePassword
}