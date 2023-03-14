import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { colors } from '../../colors'
import TodoItem from './components/TodoItem'
import { readPublicTodo, createPublicTodo, DB_reset, DB_Initial} from '../../database'

import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({
    location:'default',
    name:'db_todo',
}, () => {
    console.log('Başarılı')
}, (err) => {
    console.log('Başarısız')  
})

const Todolar = () => {

    const [modalVisible, setModalVisible] = React.useState(false)
    const [addTodo, setAddTodo] = React.useState('')
    const [screenLoading, setScreenLoading] = React.useState(true)
    const [todos, setTodos] = React.useState([])
    console.log('Todolar Render Oldu')

    const addTodos = () => {
        db.transaction( tx => {tx.executeSql('INSERT INTO publicTodo_table (todo, done) VALUES(?,?)',[addTodo,0],
            () => {
                console.log('ekleme başarılı')
                setModalVisible(false)
                setAddTodo('')
                db.transaction( tx => {
                    let response = []
                    tx.executeSql('SELECT * FROM publicTodo_table',[],
                        (tx,result)=>{
                            setTodos([])
                            for (let index = 0; index < result.rows.length; index++) {
                                response = [...response, result.rows.item(index)]
                            }
                            setTodos(response)
                        },
                        (tx,err)=> {
                            console.log('Todo Listelenemedi')
                        }
                    )}
                )
            },
            () => console.log('Ekleme Başarısız')
        )})
    }

    React.useEffect(()=>{
        let response = []
        db.transaction( tx => {
            tx.executeSql('SELECT * FROM publicTodo_table',[],
                (tx,result)=>{
                    for (let index = 0; index < result.rows.length; index++) {
                        response = [...response, result.rows.item(index)]
                    }
                    console.log('response',response)
                    if (response.length !== 0) {
                        setTodos(response)
                    }
                    setScreenLoading(false)
                    console.log('Select Çalıştı')
                },
                (tx,err)=> {
                    console.log('Todo Listelenemedi')
                    alert('Selam')
                }
            )}
        )
      },[])

    
    return (
        <View style={{backgroundColor:colors.dark_purple,flex:1}}>
            <View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity
                    style={{flexDirection:'row', backgroundColor:colors.purple, width:210,height:60,justifyContent:'space-between', 
                    alignItems:'center', borderRadius:5, paddingHorizontal:10}}
                    onPress = { () => {setModalVisible(true)} }
                >
                    <FontAwesomeIcon 
                        icon={faAdd} 
                        size={35} 
                        style={{
                            color:colors.aqua,
                            padding:5,
                            borderRadius:100
                        }}
                    />
                    <Text style={{color:colors.aqua, fontSize:30}}>Todo Ekle</Text>
                </TouchableOpacity>
            </View>

            {
                screenLoading 
                ?
                <ActivityIndicator size={'large'} style={{marginLeft:'auto', marginRight:'auto', marginBottom:'auto', marginTop:'auto', width:'100%', height:'100%'}} />
                :
                <ScrollView style={{width:'100%', height:'100%',backgroundColor:colors.purple}}>
                {
                    todos.length > 0 ? todos.reverse().map( (todoItem, index) => {
                        return(
                            <TodoItem 
                                todo={todoItem.todo} 
                                done={todoItem.done} 
                                key={index} 
                                id={todoItem.id}
                                todos={todos}
                                setTodos={setTodos}
                                addTodo={addTodo}
                                setAddTodo={setAddTodo}
                                db={db}
                            />
                        )
                    })
                    :
                    <View>
                        <Text style={{textAlign:'center', marginTop:50, fontSize:24, color:colors.aqua, fontWeight:700}}>Henüz Todo Eklenmedi!</Text>
                    </View>
                }
                </ScrollView>
            }
            
            <Modal visible={modalVisible} animationType='slide' transparent={true}>
                <View style={{marginRight:'auto', marginLeft:'auto', marginTop:100, backgroundColor:colors.aquaShadow, width:'90%', minHeight:200, borderRadius:5, paddingTop:20}}>
                    <Text
                        style={{
                            fontSize:18,
                            color:colors.dark_purple,
                            fontWeight:'800',
                            marginBottom:40,
                            marginLeft:25
                        }}
                    >Eklenecek Todoyu Girin:</Text>
                    <TextInput 
                        value={addTodo}
                        onChangeText = { newText => setAddTodo(newText) }
                        autoFocus={modalVisible}
                        style={{width:300, height:40, backgroundColor:colors.dark_purple, color:colors.aqua ,marginLeft:'auto', marginRight:'auto'}}
                        onSubmitEditing = {addTodos}
                    />
                    <View style={{
                        flexDirection:'row',
                        width:'100%',
                        justifyContent:'space-around',
                        marginTop:20
                    }}>
                        <TouchableOpacity
                            onPress={ addTodos }
                        >
                            <View
                                style={{
                                    paddingVertical:10, 
                                    width:100, 
                                    backgroundColor:colors.orange,
                                    borderRadius:5
                                }}
                            >
                                <Text style={{
                                    textAlign:'center' ,
                                    fontSize:20,
                                    fontWeight:700,
                                }}>Ekle</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => {
                                setModalVisible(false)
                                setAddTodo('')
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical:10, 
                                    width:100, 
                                    backgroundColor:colors.red,
                                    borderRadius:5
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign:'center' ,
                                        fontSize:20,
                                        fontWeight:700,
                                    }}
                                >Kapat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default Todolar