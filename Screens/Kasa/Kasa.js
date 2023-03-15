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

const Kasa = ({navigation}) => {

  const [isItRegistered, setIsItRegistered] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');
  const [privNotes, setPrivNotes] = React.useState({todo:'Notlar Bekleniyor...', id:-1});
  const [validPassword, setValidPassword] = React.useState(null)

  const createUser = () => {
    if(passwordInput.length > 0){
      db.transaction( (tx) => { 
        console.log('passwordInput',passwordInput)
        tx.executeSql('INSERT INTO auth_table (password) VALUES(?)', [passwordInput],(tx, result) => {
          console.log('Şifre Oluşturma Başarılı');
          console.log('tx',tx)
          console.log('result',result)
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
},[]);

  return (
    <View style={{backgroundColor:colors.dark_purple,flex:1}}>
      {
        !isLogin ?
        <View style={{flex:1}}>
          <View style={{width:'100%', height:200, alignItems:'center', justifyContent:'center'}}>
            <FontAwesomeIcon icon={faLock} size={150} color={colors.purple}/>
          </View>
          <View style={{width:'100%', height:60}}>
            <Text style={{
              fontSize:isItRegistered ? 24 : 20,
              color:colors.purple,
              textAlign:'center',
              lineHeight:60
            }}>{isItRegistered ? 'Kasayı Açmak İçin Şifre Girin' : 'Kasaya Erişmek İçin Şifre Oluşturun'}</Text>
          </View>
          <View style={{width:'100%', height:60, justifyContent:'center', alignItems:'center'}}>
              <TextInput style={{
                width:300,
                height:50,
                backgroundColor:colors.purple,
                borderRadius:5,
                color:colors.aqua,
              }}
              secureTextEntry={true}
              value={passwordInput}
              onChangeText = { newText => setPasswordInput(newText) }
              onSubmitEditing = {() => {
                isItRegistered ? auth() : createUser();
              }}  
              />
              
          </View>
          <View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={() => {
              isItRegistered ? auth() : createUser();
            }}>
              <View style={{width:170, height:50, backgroundColor:colors.purple, borderRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:colors.aqua, fontSize:24}}>{isItRegistered ? 'Giriş Yap' : 'Şifre Oluştur'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width:'100%', height:Dimensions.get('window').height-420, paddingLeft:30, paddingRight:30, paddingTop:100}}>
              <Text style={{fontSize:26, color:colors.purple, marginBottom:20}}>Burası Özel Kasadır</Text>
              <Text style={{fontSize:22, color:colors.purple, lineHeight:30}}>
                {isItRegistered ? 'Kasayı Görüntülemek İçin Şifre Girin' : 'Kasayı Görüntülemek İçin Şifre Oluşturun'}
              </Text>
          </View>
        </View>
        :
        <View style={{flex:1}}>
          <ScrollView style={{width:'100%', padding:10}}>
            <TextInput 
              style={{
                backgroundColor:colors.purple,
                width:'100%',
                color:colors.aqua,
                fontSize:24,
                borderRadius:5,
                paddingHorizontal:15,
              }}
              multiline={true}
              value={privNotes.todo}
              onChangeText = { newText => {setPrivNotes({...privNotes, todo:newText}); } }
              onBlur = { () => {savePrivNote()} }
            />
          </ScrollView>
          <View style={{width:'100%', height:'20%', justifyContent:'space-around', alignItems:'center', flexDirection:'row'}}>
              <TouchableOpacity
                onPress={() =>{
                  savePrivNote()
                }}
              >
                <View style={{
                  width:120,
                  height:50,
                  backgroundColor:colors.green,
                  borderRadius:5,
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                  <Text style={{
                    fontSize:24,
                    color:colors.dark_purple,
                    fontWeight:600,
                  }}>Kaydet</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{ setIsLogin(false); setPasswordInput(''); }}
              >
                <View style={{
                  width:120,
                  height:50,
                  backgroundColor:colors.red,
                  borderRadius:5,
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                  <Text style={{
                    fontSize:24,
                    color:colors.dark_purple,
                    fontWeight:600,
                  }}>Çık</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default Kasa;
