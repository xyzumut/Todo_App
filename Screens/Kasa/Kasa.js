import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { colors } from '../../colors';
import { faLock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Kasa = () => {

  const [isItRegistered, setIsItRegistered] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

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
              }}/>
          </View>
          <View style={{width:'100%', height:100, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity>
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
              }}
              multiline={true}
            />
          </ScrollView>
          <View style={{width:'100%', height:'20%', justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity
                onPress={() =>{

                }}
              >
                <View style={{
                  width:200,
                  height:50,
                  backgroundColor:colors.purple,
                  borderRadius:5,
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                  <Text style={{
                    fontSize:24,
                    color:colors.aqua,
                    fontWeight:600,
                  }}>Kaydet</Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default Kasa;
