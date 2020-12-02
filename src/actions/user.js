import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../lang/i18n';

export function getUserDetailsSuccess(response){
  return {
    type: types.GET_USER_DETAILS,
    payload: {
      response
    }
  }
}

export function getUserDetailsError(error){
  return {
    type: types.GET_USER_DETAILS_ERROR,
    payload: {
      error
    }
  }
}

export function getUserDetails( _this, data ) {

  return function (dispatch) {
    fetch(`${baseUrl}/get-user-profile`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.message == 'Token Expired' || responseJSON.message == 'Unauthenticated.'){

         Alert.alert(responseJSON.message)
         AsyncStorage.removeItem('TOKEN')
         .then(function (value) {
           _this.props.navigation.navigate('Splash');
         })
       } else if(responseJSON.status == "success"){

        dispatch(getUserDetailsSuccess(responseJSON.user))
      } else if(responseJSON.status == "fail"){
        dispatch(getUserDetailsError(responseJSON.error))
      }else{

      }
    })
    .catch( (error) => {

    });
  }
}


export function updateUserDetailsSuccess(response){
  return {
    type: types.UPADTE_USER_DETAILS,
    payload: {
      response
    }
  }
}

export function updateUserDetailsError(error){
  return {
    type: types.UPADTE_USER_DETAILS_ERROR,
    payload: {
      error
    }
  }
}

export function updateUserDetails(_this, data ) {
  return function (dispatch) {
    var that = _this;

    fetch(`${baseUrl}/profile-detail-update`, {
      method: 'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
      body: JSON.stringify({
          fullName: data.fullname,
          address1: data.address1,
          address2: data.address2,
          city: data.city_name,
          state: data.state_name,
          country: data.country_name,
          zipCode: data.zip_code,
          email: data.email,
          profileImage:  data.image,
          currentPassword: data.currentPassword
      })
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.status == "success"){
        dispatch(updateUserDetailsSuccess(responseJSON))
        that.props.navigation.navigate('Dashboard');
      } else if(responseJSON.status == "fail"){
        dispatch(updateUserDetailsError(responseJSON.errors[0]))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}


export function getDrawerDataSuccess(response){
  return {
    type: types.GET_DRAWER_DATA,
    payload: {
      response
    }
  }
}

export function getDrawerDataError(error){
  return {
    type: types.GET_DRAWER_DATA_ERROR,
    payload: {
      error
    }
  }
}

export function getDrawerData( data ) {
  return function (dispatch) {
    fetch(`${baseUrl}/client-dashboard`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.state.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {
      if(responseJSON.status == "success"){
        dispatch(getDrawerDataSuccess(responseJSON))
      } else if(responseJSON.status == "fail"){
        dispatch(getDrawerDataError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}



export function getCountrySuccess(response){
  return {
    type: types.GET_COUNTRY,
    payload: {
      response
    }
  }
}

export function getCountryError(error){
  return {
    type: types.GET_COUNTRY_ERROR,
    payload: {
      error
    }
  }
}

export function getCountry(_this, data ) {

  return function (dispatch) {

    var that = _this;
    fetch(`${baseUrl}/countries?searchTerm=${data.search}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.status == "success"){
        let countries = responseJSON.countries
        dispatch(getCountrySuccess(countries))
      } else if(responseJSON.status == "fail"){
        dispatch(getCountryError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}


export function getStateSuccess(response){

  return {
    type: types.GET_STATE,
    payload: {
      response
    }
  }
}

export function getStateError(error){
  return {
    type: types.GET_STATE_ERROR,
    payload: {
      error
    }
  }
}

export function getState(_this, data ) {

  const countryId = data.countryId
  return function (dispatch) {

    var that = _this;
    fetch(`${baseUrl}/states/${countryId}?searchTerm=${data.search}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.status == "success"){
        let states = responseJSON.states
        dispatch(getStateSuccess(states))
      } else if(responseJSON.status == "fail"){
        dispatch(getStateError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}


export function getCitySuccess(response){

  return {
    type: types.GET_CITY,
    payload: {
      response
    }
  }
}

export function getCityError(error){
  return {
    type: types.GET_CITY_ERROR,
    payload: {
      error
    }
  }
}

export function getCity(_this, data ) {

  const stateId = data.stateId
  return function (dispatch) {

    var that = _this;
    fetch(`${baseUrl}/cities/${stateId}?searchTerm=${data.search}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token
      },
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.status == "success"){
        let cities = responseJSON.cities
        dispatch(getCitySuccess(cities))
      } else if(responseJSON.status == "fail"){
        dispatch(getCityError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}



export function uploadProfileSuccess(response){
  return {
    type: types.UPLOAD_PROFILE_PIC,
    payload: {
      response
    }
  }
}

export function uploadProfileError(error){
  return {
    type: types.UPLOAD_PROFILE_PIC_ERROR,
    payload: {
      error
    }
  }
}

export function uploadProfile(_this, data ) {

  return function (dispatch) {
    var that = _this;
    fetch(`${baseUrl}/upload-profile-image`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          // 'Content-Type': 'application/json',
          Authorization: data.token
      },
      body: data.formData
    })
    .then(response => response.json())
    .then(responseJSON => {

      if(responseJSON.status == "success"){

        let profile = responseJSON
        dispatch(uploadProfileSuccess(profile))
      } else if(responseJSON.status == "fail"){
        dispatch(uploadProfileError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      alert(error)
    });
  }
}
