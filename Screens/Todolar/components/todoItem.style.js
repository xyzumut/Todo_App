import { colors } from '../../../colors';

const todoItemStyles = {
    todoItemMainContainerStyle:{
        width:'98%',
        marginVertical:10,
        minHeight:30,
        flexDirection:'row',
        backgroundColor:colors.dark_purple,
        borderWidth:20,
        borderRadius:5,
        borderColor:colors.dark_purple,
        marginLeft:'auto',
        marginRight:'auto',
    },
    doneIconContainerStyle:{
        width:'10%',
        alignItems:'center',
        paddingTop:5,
    },
    switchContainerStyle:{
        width:'80%',
    },
    todoTextStyle1:(done) =>{
        return ({
            fontSize:16,
            textAlign:'center',
            lineHeight:30,
            color:done === 0 ? 'white' : colors.green,
            textDecorationLine: done === 1 ? 'line-through' : 'none',
        });
    },
    todoTextStyle2:{
        fontSize:16,
        color:colors.orange,
        lineHeight:30,
    },
    iconContainerStyle:{
        width:'10%',
        alignItems:'center',
        paddingTop:5,
    },
    editIconStyle:{
        marginBottom:10,
    },
};

export default todoItemStyles;
