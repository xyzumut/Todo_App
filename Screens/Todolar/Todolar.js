import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator, TextInput } from 'react-native';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import TodoItem from './components/TodoItem';
import todosMainStyles from './Todolar.style';
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({
    location:'default',
    name:'db_todo',
}, () => {
    console.log('Başarılı');
}, (err) => {
    console.log('Başarısız:',err);
});

const Todolar = () => {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [addTodo, setAddTodo] = React.useState('');
    const [screenLoading, setScreenLoading] = React.useState(true);
    const [todos, setTodos] = React.useState([]);

    const addTodos = () => {
        db.transaction( tx => {tx.executeSql('INSERT INTO publicTodo_table (todo, done) VALUES(?,?)',[addTodo,0],
            () => {
                console.log('ekleme başarılı');
                setModalVisible(false);
                setAddTodo('');
                db.transaction( tx => {
                    let response = [];
                    tx.executeSql('SELECT * FROM publicTodo_table',[],
                        (tx,result)=>{
                            setTodos([]);
                            for (let index = 0; index < result.rows.length; index++) {
                                response = [...response, result.rows.item(index)];
                            }
                            setTodos(response);
                        },
                        (tx,err)=> {
                            console.log('Todo Listelenemedi');
                        }
                    );}
                );
            },
            () => console.log('Ekleme Başarısız')
        );});
    };

    React.useEffect(()=>{
        let response = [];
        db.transaction( tx => {
            tx.executeSql('SELECT * FROM publicTodo_table',[],
                (tx,result)=>{
                    for (let index = 0; index < result.rows.length; index++) {
                        response = [...response, result.rows.item(index)];
                    }
                    if (response.length !== 0) {
                        setTodos(response);
                    }
                    setScreenLoading(false);
                    console.log('Select Çalıştı, tx:',tx);
                },
                (tx,err)=> {
                    console.log('Todo Listelenemedi',err);
                }
            );}
        );
    },[]);

    return (
        <View style={todosMainStyles.todosMainContainerStyle}>
            <View style={todosMainStyles.todoAddContainerStyle}>
                <TouchableOpacity
                    style={todosMainStyles.todoAddButtonStyle}
                    onPress = { () => {setModalVisible(true);} }
                >
                    <FontAwesomeIcon
                        icon={faAdd}
                        size={35}
                        style={todosMainStyles.faAddIconStyle}
                    />
                    <Text style={todosMainStyles.todoAddTextStyle}>Todo Ekle</Text>
                </TouchableOpacity>
            </View>

            {
                screenLoading
                ?
                <ActivityIndicator size={'large'} style={todosMainStyles.spinnerStyle} />
                :
                <ScrollView style={todosMainStyles.scroolViewStyle}>
                {
                    todos.length > 0 ? todos.map( (todoItem, index) => {
                        return (
                            <TodoItem
                                todo={todoItem.todo}
                                done={todoItem.done}
                                key={index}
                                id={todoItem.id}
                                setTodos={setTodos}
                                db={db}
                            />
                        );
                    })
                    :
                    <View>
                        <Text style = {todosMainStyles.todoDontFoundStyle} > Henüz Todo Eklenmedi! </Text>
                    </View>
                }
                </ScrollView>
            }

            <Modal visible = {modalVisible} animationType = {'slide'} transparent = {true} >
                <View style = {todosMainStyles.modalMainContainerStyle} >
                    <Text style = {todosMainStyles.modalAddedTodoTextStyle} >Eklenecek Todoyu Girin:</Text>
                    <TextInput
                        value = {addTodo}
                        onChangeText = { newText => setAddTodo(newText) }
                        autoFocus = {true}
                        style = {todosMainStyles.modalTodoAddInputStyle}
                        onSubmitEditing = {addTodos}
                    />
                    <View style={todosMainStyles.modalButtonGroupsStyle}>
                        <TouchableOpacity
                            onPress={ addTodos }
                        >
                            <View
                                style={todosMainStyles.modalButtonsContainerStyle('add')}
                            >
                                <Text style={todosMainStyles.modalButtonsTextStyle}> Ekle </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={ () => {
                                setModalVisible(false);
                                setAddTodo('');
                            }}
                        >
                            <View style={todosMainStyles.modalButtonsContainerStyle('exit')} >
                                <Text style={todosMainStyles.modalButtonsTextStyle}> Kapat </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Todolar;
