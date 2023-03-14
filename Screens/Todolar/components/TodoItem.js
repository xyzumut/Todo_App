import { faCheck, faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {Text, View, TouchableOpacity, TextInput, Modal } from 'react-native'
import { colors } from "../../../colors";


const TodoItem = ({done, todo, id, todos, setTodos, addTodo, setAddTodo, db}) => {

    const [edit, setEdit] = React.useState(false)
    const [text, setText] = React.useState(todo)
    const [blurTemp, setBlurTemp] = React.useState(false)
    const [todoDeleteModal, setTodoDeleteModal] = React.useState(true)

    const selectQuery = () => {
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
                    console.log('tx',tx)
                    console.log('error',err)
                }
            )}
        )
    }

    const updateDone = () => {
        let newTodos = todos.map( todosItem => {
            if (todosItem.id === id) {
                return {...todosItem, done:done}
            }
            else {
                return todosItem
            }
        })
        db.transaction( tx => {tx.executeSql('UPDATE publicTodo_table SET done = ?  WHERE id = ?',[done===0 ? 1 : 0, id],
            (tx, result) => {
                // console.log('Çıktı result:',result)
                // console.log('Çıktı tx:',tx)
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
            (tx,error) => {
                console.log('tx',tx)
                console.log('result',error)
            }
        )})
    }

    const updateTodo = () => {
        let newTodos = todos.map( todosItem => {
            if (todosItem.id === id) {
                return {...todosItem, todo:text, done:done}
            }
            else {
                return todosItem
            }
        })
        db.transaction( tx => {tx.executeSql('UPDATE publicTodo_table SET todo = ? WHERE id = ?',[text, id],
            (tx, result) => {
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
            (tx,error) => {
                console.log('tx',tx)
                console.log('result',error)
            }
        )})
        // console.log('yeniTodo:',newTodos[0])
        // setTodos(newTodos)
        console.log('Update Tetiklendi, ilgili itemin idsi:',id)
    }
    const deleteTodo = () => {
        db.transaction( tx => {tx.executeSql('DELETE FROM publicTodo_table WHERE id = ?',[id],
            (tx, result) => {
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
                            console.log('tx',tx)
                            console.log('error',err)
                        }
                    )}
                )
            },
            (tx,err) => {
                console.log('tx',tx)
                console.log('err',err)
            }
        )})
    }

    return(
        <View style={{width:'98%', marginVertical:10 ,minHeight:30, flexDirection:'row', backgroundColor:colors.dark_purple, borderWidth:20, borderRadius:5, borderColor:colors.dark_purple, marginLeft:'auto', marginRight:'auto'}}>

            <TouchableOpacity onPress={ updateDone } style={{width:'10%', alignItems:'center',paddingTop:5,}}>
                <FontAwesomeIcon icon={faCheck} size={20} color={done===0 ? colors.aqua : colors.green}/>
            </TouchableOpacity>

            <View style={{width:'80%'}}>
                {
                !edit
                    ?
                        <TouchableOpacity onPress={() => setEdit(true)} >
                            <Text style={{
                                    fontSize:16, 
                                    textAlign:'center', 
                                    lineHeight:30, 
                                    color:done === 0 ? 'white' : colors.green,
                                    textDecorationLine: done === 1 ? 'line-through' : 'none'
                                }}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                    :
                        <TextInput 
                            maxFontSizeMultiplier={500}
                            multiline={true}
                            style={{fontSize:16,color:colors.orange, lineHeight:30}}
                            value={text}
                            onChangeText={newText => setText(newText)}
                            autoFocus={edit}
                            onBlur={()=> {
                                setEdit(false);
                                setText(text.trim());
                                setBlurTemp(true);
                                updateTodo();
                            }}
                        />
                }
            </View>

            <View style={{width:'10%', alignItems:'center',paddingTop:5}}>
                <TouchableOpacity onPress={() => { 
                    edit ? () => {
                        setEdit(!edit);
                        updateTodo();
                    } : setEdit(!edit);
                }}>
                    <FontAwesomeIcon icon={faEdit} size={!edit ? 20 : 30} color={!edit ? colors.orange : colors.orange2} style={{marginBottom:10}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>{
                        deleteTodo();
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} size={20} color={colors.red}/>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default TodoItem