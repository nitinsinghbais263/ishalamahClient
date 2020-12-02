import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function createNotesSuccess(response) {
  return {
    type: types.CREATE_NEW_NOTES,
    payload: {
      response,
    },
  };
}

export function createNotesError(error) {
  return {
    type: types.CREATE_NEW_NOTES_ERROR,
    payload: {
      error,
    },
  };
}

export function createNotes(_this, data) {
  return function(dispatch) {
    var that = _this;
debugger
    fetch(`${baseUrl}/ticket-notes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: data.token,
      },
      // body: JSON.stringify({
      //     ticketUuid: data.uuid,
      //     content: data.content,
      //     privacy: "public",
      //     attachments: data.attachements
      // })
      body: data.formData,
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger
        if (responseJSON.status == 'success') {
          let data = responseJSON.ticket;
          that.props.navigation.navigate('TicketDetails', {data: data});
          dispatch(createNotesSuccess(data));
        } else if (responseJSON.status == 'fail') {
          //alert(responseJSON.message);
          dispatch(createNotesError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function deleteNotesSuccess(response) {
  return {
    type: types.DELETE_NOTE,
    payload: {
      response,
    },
  };
}

export function deleteNotesError(error) {
  return {
    type: types.DELETE_NOTE_ERROR,
    payload: {
      error,
    },
  };
}

export function deleteNotes(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/ticket-notes/${data.uuid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
      .then(response => {
        if (response.status == 204) {
          dispatch(deleteNotesSuccess(response));
          that.props.navigation.navigate('TicketDetails');
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.message);
          dispatch(deleteNotesError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}
