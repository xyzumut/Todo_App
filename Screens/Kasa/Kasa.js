import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../colors';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import KasaStyles from './Kasa.style';

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

