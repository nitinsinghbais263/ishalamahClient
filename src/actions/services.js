import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function getnextServiceSuccess(response) {
  return {
    type: types.GET_NEXTSERVICE_DATE,
    payload: {
      response,
    },
  };
}

export function getnextServiceError(error) {
  return {
    type: types.GET_NEXTSERVICE_DATE_ERROR,
    payload: {
      error,
    },
  };
}

export function getnextServiceDate(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/next-visit`, {
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
          dispatch(getnextServiceSuccess(responseJSON.data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getnextServiceError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getExpiringServiceSuccess(response) {
  return {
    type: types.GET_EXP_SERVICES,
    payload: {
      response,
    },
  };
}

export function getExpiringServiceError(error) {
  return {
    type: types.GET_EXP_SERVICES_ERROR,
    payload: {
      error,
    },
  };
}

export function getExpiringService(data) {
  const expiringService = '?expiringService=true';

  return function(dispatch) {
    fetch(`${baseUrl}/maintenance-client${expiringService}`, {
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
          dispatch(
            getExpiringServiceSuccess(responseJSON.maintenance_clients.data),
          );
        } else if (responseJSON.status == 'fail') {
          dispatch(getExpiringServiceError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function serviceDetailsSuccess(response) {
  return {
    type: types.GET_SERVICE_DETAILS_SUCCESS,
    payload: {
      response,
    },
  };
}

export function serviceDetailsError(error) {
  return {
    type: types.GET_SERVICE_DETAILS_ERROR,
    payload: {
      error,
    },
  };
}

export function serviceDetails(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/maintenance-client/${data.state.serviceUuid}`, {
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
          dispatch(serviceDetailsSuccess(responseJSON.maintenance_client));
        } else if (responseJSON.status == 'fail') {
          dispatch(serviceDetailsError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getServiceListSuccess(response) {
  return {
    type: types.GET_SERVICES_LIST,
    payload: {
      response,
    },
  };
}

export function getServiceListError(error) {
  return {
    type: types.GET_SERVICES_LIST_ERROR,
    payload: {
      error,
    },
  };
}

export function initial() {
  return {
    type: types.GET_INITIAL_SERVICES_LIST,
  };
}

export function getServicesList(data) {
  return function(dispatch) {
    dispatch(initial());
    fetch(
      `${baseUrl}/maintenance-client?serviceStatus=${
        data.state.categoryStatus
      }&searchTerm=${data.state.search}`,
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
          dispatch(
            getServiceListSuccess(responseJSON.maintenance_clients.data),
          );
        } else if (responseJSON.status == 'fail') {
          dispatch(getServiceListError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getServiceUuidSuccess(response) {
  return {
    type: types.GET_SERVICES_UUID,
    payload: {
      response,
    },
  };
}

export function getServiceUuidError(error) {
  return {
    type: types.GET_SERVICES_UUID_ERROR,
    payload: {
      error,
    },
  };
}

export function getSUuid(_this, data) {
  debugger
  return function(dispatch) {
    fetch(`${baseUrl}/maintenance-client?all=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(getServiceUuidSuccess(responseJSON.maintenance_clients));
        } else if (responseJSON.status == 'fail') {
          dispatch(getServiceUuidError(responseJSON));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getReportFieldsSuccess(response) {
  return {
    type: types.GET_REPORT_FIELDS,
    payload: {
      response,
    },
  };
}

export function getReportFieldsError(error) {
  return {
    type: types.GET_REPORT_FIELDS_ERROR,
    payload: {
      error,
    },
  };
}

export function getReportFields(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/report-fields?all=1`, {
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
          dispatch(getReportFieldsSuccess(responseJSON.fields));
        } else if (responseJSON.status == 'fail') {
          dispatch(getReportFieldsError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function createServiceSuccess(response) {
  return {
    type: types.SERVICE_CREATE,
    payload: {
      response,
    },
  };
}

export function createServiceError(error) {
  return {
    type: types.SERVICE_CREATE_ERROR,
    payload: {
      error,
    },
  };
}

export function createService(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/maintenance-client`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        fullName: data.fullname,
        phone: data.phone,
        email: data.email,
        businessLicense: data.businessLicense,
        addressLabel: data.addresslable,
        address1: data.address1,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipcode,
        startDate: data.startDate,
        coordinate: data.coordinates,
        fields: data.reportFileds,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(createServiceSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.errors[0]);
          dispatch(createServiceError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function renewServiceSuccess(response) {
  return {
    type: types.RENEW_SERVICE,
    payload: {
      response,
    },
  };
}

export function renewServiceError(error) {
  return {
    type: types.RENEW_SERVICE_ERROR,
    payload: {
      error,
    },
  };
}

export function renewService(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/renew`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        serviceUuid: data.uuid,
        fields: data.reportFileds,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          that.props.navigation.navigate('Dashboard');
          dispatch(renewServiceSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.message);
          dispatch(renewServiceError(responseJSON.message));
          that.props.navigation.navigate('Dashboard');
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getCostEstimationSuccess(response) {
  return {
    type: types.SERVICE_COST,
    payload: {
      response,
    },
  };
}

export function getCostEstimationError(error) {
  return {
    type: types.SERVICE_COST_ERROR,
    payload: {
      error,
    },
  };
}

export function getCostEstimation(_this, data) {
  debugger
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/cost-estimation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.token,
      },
      body: JSON.stringify({
        serviceCity: data.serviceCity,
        fields: data.reportFileds,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger
        if (responseJSON.status == 'success') {
          dispatch(getCostEstimationSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.errors[0]);
          dispatch(getCostEstimationError(responseJSON));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        debugger
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}


export function getAddressSuccess(response) {
  return {
    type: types.GET_ADDRESS_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getAddressError(error) {
  return {
    type: types.GET_ADDRESS_ERROR,
    payload: {
      error,
    },
  };
}

export function getAddress(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(
      `${baseUrl}/resolve-coordinate/${data.region.latitude}/${
        data.region.longitude
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: data.token,
        },
      },
    )
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.message == 'Server Error') {
          alert(responseJSON.message);
        } else if (responseJSON) {
          dispatch(getAddressSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.message);
          dispatch(getAddressError(responseJSON));
        } else {
          alert(responseJSON.message);
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };
}


export function sendEmailSuccess(response) {
  return {
    type: types.SEND_EMAIL_SUCCESS,
    payload: {
      response,
    },
  };
}

export function sendEmailError(error) {
  return {
    type: types.SEND_EMAIL_ERROR,
    payload: {
      error,
    },
  };
}

export function sendEmail(data) {
  debugger
  return function(dispatch) {
    fetch(`${baseUrl}/email-service-contract/${data.params.uuid}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: data.state.token,
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        debugger
        if (responseJSON.status == 'success') {
          let data = responseJSON;
          dispatch(sendEmailSuccess(responseJSON.data));
        } else if (responseJSON.status == 'fail') {
          dispatch(sendEmailError(responseJSON.error));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}
