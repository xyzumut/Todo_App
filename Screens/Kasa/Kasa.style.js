import { Dimensions } from "react-native";
import { colors } from "../../colors";
const KasaStyles = {
    kasaMainContainerStyle:{
      backgroundColor:colors.dark_purple,
      flex:1,
    },
    kasaSecondContainerStyle:{
      flex:1,
    },
    faLockContainerStyle:{
      width:'100%',
      height:200,
      alignItems:'center',
      justifyContent:'center',
    },
    authTextContainerStyle:{
      width:'100%',
      height:60,
    },
    authTextStyle: (isItRegistered) => {
      return (
        {
          fontSize:isItRegistered ? 24 : 20,
          color:colors.purple,
          textAlign:'center',
          lineHeight:60,
        }
      );
    },
    authInputContainerStyle:{
      width:'100%',
      height:60,
      justifyContent:'center',
      alignItems:'center',
    },
    authInputStyle:{
      width:300,
      height:50,
      backgroundColor:colors.purple,
      borderRadius:5,
      color:colors.aqua,
    },
    authButtonContainerStyle:{
      width:'100%',
      height:100,
      justifyContent:'center',
      alignItems:'center',
    },
    authButtonBoxStyle:{
      width:170,
      height:50,
      backgroundColor:colors.purple,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center',
    },
    authButtonTextStyle:{
      color:colors.aqua,
      fontSize:24,
    },
    footerContainer:{
      width:'100%',
      height:Dimensions.get('window').height - 420,
      paddingLeft:30,
      paddingRight:30,
      paddingTop:100,
    },
    footerFirstTextStyle:{
      fontSize:26,
      color:colors.purple,
      marginBottom:20,
    },
    footerSecondTextStyle:{
      fontSize:22,
      color:colors.purple,
      lineHeight:30,
    },
    privNoteScrollViewStyle:{
      width:'100%',
      padding:10,
    },
    privNoteInputStyle:{
      backgroundColor:colors.purple,
      width:'100%',
      color:colors.aqua,
      fontSize:24,
      borderRadius:5,
      paddingHorizontal:15,
    },
    footerButtonsContainerStyle:{
      width:'100%',
      height:'20%',
      justifyContent:'space-around',
      alignItems:'center',
      flexDirection:'row',
    },
    footerButtonBoxStyle: (backgroundColor) => {
      return (
        {
          width:120,
          height:50,
          backgroundColor:backgroundColor,
          borderRadius:5,
          justifyContent:'center',
          alignItems:'center',
        }
      );
    },
    footerButtonTextStyle:{
      fontSize:24,
      color:colors.dark_purple,
      fontWeight:600,
    },
};

export default KasaStyles;
