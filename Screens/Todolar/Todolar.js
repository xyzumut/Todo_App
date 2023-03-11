import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { faAdd, faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { colors } from '../../colors'
import TodoItem from './components/TodoItem'
const Todolar = () => {
    return (
        <View style={{backgroundColor:colors.dark_purple,flex:1}}>
            <View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity
                    style={{flexDirection:'row', backgroundColor:colors.purple, width:210,height:60,justifyContent:'space-between', 
                    alignItems:'center', borderRadius:5, paddingHorizontal:10}}
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
            <ScrollView style={{width:'100%', height:'100%',backgroundColor:colors.purple}}>
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </ScrollView>
        </View>
    )
}

export default Todolar