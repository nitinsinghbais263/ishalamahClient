import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function getProductsListSuccess(response){
  return {
    type: types.GET_PRODUCTS_LIST,
    payload: {
      response
    }
  }
}

export function getProductsListError(error){
  return {
    type: types.GET_PRODUCTS_LIST_ERROR,
    payload: {
      error
    }
  }
}

export function initial(){
  return {
    type: types.GET_INITIAL_PRODUCTS_LIST,
  }
}


export function getProductsList( data ) {

  return function (dispatch) {
    dispatch(initial())
    fetch(`${baseUrl}/product?searchTerm=${data.state.search}&categoryUuid=${data.state.categoryUuid}&status=1`, {
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
        let data = responseJSON.products.data
        dispatch(getProductsListSuccess(data))
      } else if(responseJSON.status == "fail"){
        dispatch(getProductsListError(responseJSON))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}


export function getCategoryListSuccess(response){
  return {
    type: types.GET_CATEGORY_LIST,
    payload: {
      response
    }
  }
}

export function getCategoryListError(error){
  return {
    type: types.GET_CATEGORY_LIST_ERROR,
    payload: {
      error
    }
  }
}

export function getCategoryList( data ) {
  return function (dispatch) {
    fetch(`${baseUrl}/category`, {
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
        let category = responseJSON.category.data
        dispatch(getCategoryListSuccess(category))
      } else if(responseJSON.status == "fail"){
        dispatch(getCategoryListError(responseJSON.error))
      }else{
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      }
    })
    .catch( (error) => {
      i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
    });
  }
}
