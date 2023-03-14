import { faCheck, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../../colors';
import todoItemStyles from './todoItem.style';

const TodoItem = ({done, todo, id, setTodos, db}) => {

    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(todo);

    const selectTodoQuery = () => {
        db.transaction( tx => {
            let response = []
            tx.executeSql('SELECT * FROM publicTodo_table',[],
                (tx,result)=>{
                    setTodos([])
                    for (let index = 0; index < result.rows.length; index++) {
                        response = [...response, result.rows.item(index)];
                    }
                    setTodos(response);
                },
                (tx,err)=> {
                    console.log('tx',tx);
                    console.log('error',err);
                }
            );}
        );
    };

    const updateDone = () => {
        db.transaction( tx => {tx.executeSql('UPDATE publicTodo_table SET done = ?  WHERE id = ?',[done === 0 ? 1 : 0, id],
            (tx, result) => {
                selectTodoQuery();
            },
            (tx,err)=> {
                console.log('tx',tx);
                console.log('error',err);
            }
        );});
    };

    const updateTodo = () => {
        db.transaction( tx => {tx.executeSql('UPDATE publicTodo_table SET todo = ? WHERE id = ?',[text, id],
            (tx, result) => {
                selectTodoQuery();
            },
            (tx,err)=> {
                console.log('tx',tx);
                console.log('error',err);
            }
        );});
    };

    const deleteTodo = () => {
        db.transaction( tx => {tx.executeSql('DELETE FROM publicTodo_table WHERE id = ?',[id],
            (tx, result) => {
                selectTodoQuery();
            },
            (tx,err)=> {
                console.log('tx',tx);
                console.log('error',err);
            }
        );});
    };

    return (
        <View style={todoItemStyles.todoItemMainContainerStyle}>

            <TouchableOpacity onPress={ updateDone } style={todoItemStyles.doneIconContainerStyle}>
                <FontAwesomeIcon icon={faCheck} size={20} color={done === 0 ? colors.aqua : colors.green}/>
            </TouchableOpacity>

            <View style={todoItemStyles.switchContainerStyle}>
                {
                !edit
                    ?
                        <TouchableOpacity onPress={() => setEdit(true)} >
                            <Text style={todoItemStyles.todoTextStyle1(done)}>
                                {text}
                            </Text>
                        </TouchableOpacity>
                    :
                        <TextInput
                            maxFontSizeMultiplier={500}
                            multiline={true}
                            style={todoItemStyles.todoTextStyle2}
                            value={text}
                            onChangeText={newText => setText(newText)}
                            autoFocus={edit}
                            onBlur={()=> {
                                setEdit(false);
                                setText(text.trim());
                                updateTodo();
                            }}
                        />
                }
            </View>

            <View style={todoItemStyles.iconContainerStyle}>
                <TouchableOpacity onPress={() => {
                    edit ? () => {
                        setEdit(!edit);
                        updateTodo();
                    } : setEdit(!edit);
                }}>
                    <FontAwesomeIcon icon={faEdit} size={!edit ? 20 : 30} color={!edit ? colors.orange : colors.orange2} style={todoItemStyles.editIconStyle}/>
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
    );
};
export default TodoItem;
