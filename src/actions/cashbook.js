import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function getCashBookSuccess(response) {
  return {
    type: types.GET_CASH_BOOK,
    payload: {
      response,
    },
  };
}

export function getCashBookError(error) {
  return {
    type: types.GET_CASH_BOOK_ERROR,
    payload: {
      error,
    },
  };
}

export function initial() {
  return {
    type: types.GET_INITIAL_CASH_BOOK,
  };
}

export function getCashBook(data) {
  return function(dispatch) {
    dispatch(initial());
    fetch(
      `${baseUrl}/cash?moduleName=${'client'}&searchTerm=${data.state.search}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.state.token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(getCashBookSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(getCashBookError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}
