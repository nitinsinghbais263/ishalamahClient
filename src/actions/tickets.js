import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function getTicketsSuccess(response) {
  return {
    type: types.GET_TICKETS_LIST,
    payload: {
      response,
    },
  };
}

export function getTicketsError(error) {
  return {
    type: types.GET_TICKETS_LIST_ERROR,
    payload: {
      error,
    },
  };
}

export function initial() {
  return {
    type: types.GET_INITIAL_TICKETS_LIST,
  };
}

export function getTicketsList(data) {
  return function(dispatch) {
    dispatch(initial());
    fetch(
      `${baseUrl}/ticket?all=1&status=${data.state.categoryStatus}&searchTerm=${
        data.state.search
      }`,
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
          dispatch(getTicketsSuccess(responseJSON.tickets.data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getTicketsError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getOngoingTicketsListSuccess(response) {
  return {
    type: types.GET_ONGOING_TICKETS_LIST,
    payload: {
      response,
    },
  };
}

export function getOngoingTicketsListError(error) {
  return {
    type: types.GET_ONGOING_TICKETS_LIST_ERROR,
    payload: {
      error,
    },
  };
}

export function getOngoingTicketsList(data) {
  return function(dispatch) {
    fetch(
      `${baseUrl}/ticket?all=1&status=${data.state.status}&searchTerm=${
        data.state.search
      }`,
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
          dispatch(getOngoingTicketsListSuccess(responseJSON.tickets.data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getOngoingTicketsListError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function createTicketSuccess(response) {
  return {
    type: types.CREATE_NEW_TICKET,
    payload: {
      response,
    },
  };
}

export function createTicketError(error) {
  return {
    type: types.CREATE_NEW_TICKET_ERROR,
    payload: {
      error,
    },
  };
}

export function createTicket(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/ticket`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: data.token,
      },
      body: data.formData,
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON.ticket;
          that.props.navigation.replace('TicketDetails', {data: data});
          dispatch(createTicketSuccess(data));
        } else if (responseJSON.status == 'fail') {
          dispatch(createTicketError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getTicketDetailSuccess(response) {
  return {
    type: types.GET_TICKET_DETAILS,
    payload: {
      response,
    },
  };
}

export function getTicketDetailError(error) {
  return {
    type: types.GET_TICKET_DETAILS_ERROR,
    payload: {
      error,
    },
  };
}

export function getTicketDetail(data) {
  var uuid = data.params.uuid;
  return function(dispatch) {
    fetch(`${baseUrl}/ticket/${uuid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(getTicketDetailSuccess(responseJSON.ticket));
        } else if (responseJSON.status == 'fail') {
          dispatch(getTicketDetailError(responseJSON.error));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

// export function viewTicketDetail( uuid, token ) {
//   return function (dispatch) {
//     fetch(`${baseUrl}/ticket/${uuid}`, {
//       method: 'GET',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           Authorization: token
//       },
//     })
//     .then(response => response.json())
//     .then(responseJSON => {
//       if(responseJSON.status == "success"){
//         let data = responseJSON
//         dispatch(getTicketDetailSuccess(responseJSON.ticket))
//       } else if(responseJSON.status == "fail"){
//         dispatch(getTicketDetailError(responseJSON.error))
//       }
//     })
//     .catch( (error) => {
//       alert("i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))")
//     });
//   }
// }

export function getReportViewSuccess(response) {
  return {
    type: types.GET_REPORT_VIEW_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getReportViewError(error) {
  return {
    type: types.GET_REPORT_VIEW_ERROR,
    payload: {
      error,
    },
  };
}

export function getReportView(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/report-view/${data.state.uuid}/?mobileDownload=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(getReportViewSuccess(responseJSON.path));
        } else if (responseJSON.status == 'fail') {
          dispatch(getReportViewError(responseJSON.error));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function downloadReportSuccess(response) {
  return {
    type: types.DOWNLOAD_REPORT_SUCCESS,
    payload: {
      response,
    },
  };
}

export function downloadReportError(error) {
  return {
    type: types.DOWNLOAD_REPORT_ERROR,
    payload: {
      error,
    },
  };
}

export function downloadReport(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/report-download/${data.state.uuid}&mobileDownload=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(downloadReportSuccess(responseJSON.path));
        } else if (responseJSON.status == 'fail') {
          dispatch(downloadReportError(responseJSON.error));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function ratingTicketSuccess(response) {
  return {
    type: types.RATING_TICKET_SUCCESS,
    payload: {
      response,
    },
  };
}

export function ratingTicketError(error) {
  return {
    type: types.RATING_TICKET_ERROR,
    payload: {
      error,
    },
  };
}

export function ratingTicket(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/ticket/${data.ticketUuid}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        rate: data.rate,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(ratingTicketSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(ratingTicketError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}
