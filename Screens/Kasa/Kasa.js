import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { colors } from '../../colors';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  location:'default',
  name:'db_todo',
}, () => {
  console.log('Başarılı DB Test');
}, (err) => {
  console.log('Başarısız DB Test',err);
});

const Kasa = () => {

  const [isItRegistered, setIsItRegistered] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [privNotes, setPrivNotes] = React.useState({todo:'Notlar Bekleniyor...', id:-1});
  const [validPassword, setValidPassword] = React.useState(null);

  const createUser = () => {
    if (passwordInput.length > 0){
      db.transaction( (tx) => {
        tx.executeSql('INSERT INTO auth_table (password) VALUES(?)', [passwordInput],(tx, result) => {
          console.log('tx',tx);
          console.log('result',result);
          setPasswordInput('');
          setIsItRegistered(true);
          setIsLogin(true);
        });
      });
    }
  };

  const auth = () => {
    console.log('validPassword',validPassword)
    if (validPassword !== null && validPassword === passwordInput) {
      setIsLogin(true);
    }
    else {
      alert('Yanlış Şifre');
      setPasswordInput('');
    }
  };

  const savePrivNote = () => {
    db.transaction( tx => {tx.executeSql('UPDATE privateNotes SET todo = ? WHERE id = ?',[privNotes.todo,privNotes.id],
      (tx, result) => {
        console.log('tx', tx);
        console.log('result', result);
      },
      (tx,err)=> {
        console.log('tx',tx);
        console.log('error',err);
      }
    );});
  };

  React.useEffect(() => {
    db.transaction( tx => {
      tx.executeSql('SELECT * FROM auth_table',[],
        (tx,result)=>{
          console.log('User Okuma Başarılı');
          if (result.rows.item(0) !== undefined) {
            setIsItRegistered(true);
            setValidPassword(result.rows.item(0).password);
          }
        },
        (tx,err)=>{
          console.log('User Okuma Başarısız');
        }
      );
      tx.executeSql('SELECT * FROM privateNotes',[],
        (tx,result)=>{
          console.log('Note okuma başarılı');
          if (result.rows.item(0) !== undefined) {
            setPrivNotes({todo:result.rows.item(0).todo, id: result.rows.item(0).id});
          }
          else {
            setPrivNotes('Henüz Not Girmediniz...');
          }
        },
        (tx,err)=>{
          console.log('Note okuma Başarısız');
        }
      );
    }
  );
},[isLogin]);

  return (
    <View style={KasaStyles.kasaMainContainerStyle}>
      {
        !isLogin ?
        <View style={KasaStyles.kasaSecondContainerStyle}>
          <View style={KasaStyles.faLockContainerStyle}>
            <FontAwesomeIcon icon={faLock} size={150} color={colors.purple}/>
          </View>
          <View style={KasaStyles.authTextContainerStyle}>
            <Text style={KasaStyles.authTextStyle(isItRegistered)}>{isItRegistered ? 'Kasayı Açmak İçin Şifre Girin' : 'Kasaya Erişmek İçin Şifre Oluşturun'}</Text>
          </View>
          <View style={KasaStyles.authInputContainerStyle}>
              <TextInput style={KasaStyles.authInputStyle}
              secureTextEntry={true}
              value={passwordInput}
              onChangeText = { newText => setPasswordInput(newText) }
              onSubmitEditing = {() => {
                isItRegistered ? auth() : createUser();
              }}
              />
          </View>
          <View style={KasaStyles.authButtonContainerStyle}>
            <TouchableOpacity onPress={() => {
              isItRegistered ? auth() : createUser();
            }}>
              <View style={KasaStyles.authButtonBoxStyle}>
                <Text style={KasaStyles.authButtonTextStyle}>{isItRegistered ? 'Giriş Yap' : 'Şifre Oluştur'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={KasaStyles.footerContainer}>
              <Text style={KasaStyles.footerFirstTextStyle}>Burası Özel Kasadır</Text>
              <Text style={KasaStyles.footerSecondTextStyle}>
                {isItRegistered ? 'Kasayı Görüntülemek İçin Şifre Girin' : 'Kasayı Görüntülemek İçin Şifre Oluşturun'}
              </Text>
          </View>
        </View>
        :
        <View style={KasaStyles.kasaSecondContainerStyle}>
          <ScrollView style={KasaStyles.privNoteScrollViewStyle}>
            <TextInput
              style={KasaStyles.privNoteInputStyle}
              multiline={true}
              value={privNotes.todo}
              onChangeText = { newText => {setPrivNotes({...privNotes, todo:newText}); } }
              onBlur = { () => { savePrivNote(); } }
            />
          </ScrollView>
          <View style={KasaStyles.footerButtonsContainerStyle}>
              <TouchableOpacity
                onPress={() =>{
                  savePrivNote();
                }}
              >
                <View style={KasaStyles.footerButtonBoxStyle(colors.green)}>
                  <Text style={KasaStyles.footerButtonTextStyle}>Kaydet</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{ setIsLogin(false); setPasswordInput(''); }}
              >
                <View style={KasaStyles.footerButtonBoxStyle(colors.red)}>
                  <Text style={KasaStyles.footerButtonTextStyle}>Çık</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default Kasa;
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
