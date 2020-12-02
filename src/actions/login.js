import * as types from './types';
import ReactNative from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';





export function createLoginSuccess(response){
  return {
    type: types.CREATE_LOGIN_SUCCESS,
    payload: {
      response
    }
  }
}

export function createLoginError(error){
  return {
    type: types.CREATE_LOGIN_ERROR,
    payload: {
      error
    }
  }
}

export function getinitialState(){
  return {
    type: types.GET_INITIAL_VALUE
  }
}

export function login(_this, data ) {

  return function (dispatch) {
    var that = _this;

    dispatch(getinitialState())
    fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user: data.phone,
          password: data.password,
          timezone: "Asia/Kolkata",
          type: "client",
          oneSignalPlayerId: data.oneSignalId
      })
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON.status == "success"){
 debugger
        AsyncStorage.setItem('TOKEN', 'Bearer '+responseJSON.user.push_token)
        AsyncStorage.setItem('USER_UUID', responseJSON.user.uuid)
        // AsyncStorage.setItem('PASSWORD', responseJson.user.password)
        dispatch(createLoginSuccess(responseJSON.user))
        that.props.navigation.navigate('Dashboard');
      } else if(responseJSON.status == "fail"){
 debugger
        dispatch(createLoginError(responseJSON.message))
      }else{
         debugger
         i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))

      }
    })
    .catch( (error) => {
      debugger
    i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}
