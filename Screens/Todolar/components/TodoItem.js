import { faCheck, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {Text, View, TouchableOpacity} from 'react-native'
import { colors } from "../../../colors";

const TodoItem = ({isChecked, todo}) => {
    return(
        <View style={{width:'98%', marginVertical:10 ,minHeight:30, flexDirection:'row', backgroundColor:colors.dark_purple, borderWidth:20, borderRadius:5, borderColor:colors.dark_purple, marginLeft:'auto', marginRight:'auto'}}>
            <TouchableOpacity onPress={() => alert('selam')} style={{width:'10%', alignItems:'center',paddingTop:5,}}>
                <FontAwesomeIcon icon={faCheck} size={20} color={colors.aqua}/>
            </TouchableOpacity>
                    
            <View style={{width:'80%'}}>
                <Text style={{fontSize:16, textAlign:'center', lineHeight:30, color:'white'}}>
                        Selam bebek mugo ben kelebek, benim adım umut sen beni unut
                </Text>
            </View>
                    
            <TouchableOpacity onPress={() => alert('selam')} style={{width:'10%', alignItems:'center',paddingTop:5}}>
                <FontAwesomeIcon icon={faEllipsisVertical} size={20} color={colors.aqua}/>
            </TouchableOpacity>
        </View>
    )
}
export default TodoItem