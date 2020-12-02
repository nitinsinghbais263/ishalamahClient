import * as types from './types';
import ReactNative from 'react-native';
import {baseUrl} from '../constants/API';
import i18n from '../../lang/i18n';

export function getInvoicesListSuccess(response) {
  return {
    type: types.GET_INVOICES_LIST,
    payload: {
      response,
    },
  };
}

export function getInvoicesListError(error) {
  return {
    type: types.GET_INVOICES_LIST_ERROR,
    payload: {
      error,
    },
  };
}

export function initial() {
  return {
    type: types.GET_INITIAL_INVOICES_LIST,
  };
}

export function getInvoicesList(data) {
  return function(dispatch) {
    dispatch(initial());
    fetch(`${baseUrl}/invoice?all=1&search=${data.state.search}`, {
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
          let data = responseJSON.invoices.data;
          dispatch(getInvoicesListSuccess(data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getInvoicesListError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getInvoiceDetailSuccess(response) {
  return {
    type: types.GET_INVOICE_DETAILS,
    payload: {
      response,
    },
  };
}

export function getInvoiceDetailError(error) {
  return {
    type: types.GET_INVOICE_DETAILS_ERROR,
    payload: {
      error,
    },
  };
}

export function getInvoiceDetail(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/invoice/${data.state.invoiceUuid}`, {
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
          let data = responseJSON.invoice;
          dispatch(getInvoiceDetailSuccess(data));
        } else if (responseJSON.status == 'fail') {
          dispatch(getInvoiceDetailError(responseJSON.message));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function invoiceTransactionSuccess(response) {
  return {
    type: types.CART_INVOICE_TRANSACTION,
    payload: {
      response,
    },
  };
}

export function invoiceTransactionError(error) {
  return {
    type: types.CART_INVOICE_TRANSACTION_ERROR,
    payload: {
      error,
    },
  };
}

export function invoiceTransaction(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/transaction`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: _this.state.token,
      },
      body: JSON.stringify({
        invoiceUuid: data.invoiceUuid,
        status: data.status,
        message: data.message,
        startDate: data.startDate,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(invoiceTransactionSuccess(responseJSON));
          that.props.navigation.navigate('Purchase', {
            message: responseJSON.message,
          });
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.errors);
          dispatch(invoiceTransactionError(responseJSON.error));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function invoicePayInCashSuccess(response) {
  return {
    type: types.PAY_IN_CASH_SUCCESS,
    payload: {
      response,
    },
  };
}

export function invoicePayInCashError(error) {
  return {
    type: types.PAY_IN_CASH_ERROR,
    payload: {
      error,
    },
  };
}

export function invoicePayInCash(_this, data) {
  console.log('cashcheck data', data);
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/pay-in-cash`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: _this.state.token,
      },
      body: JSON.stringify({
        invoiceUuid: data.invoiceUuid,
      }),
    })
      .then(response => {
        if (response.status == 200) {
          dispatch(invoicePayInCashSuccess(response));
          that.props.navigation.navigate('Purchase', {
            message: response.message,
          });
        } else if (response.status == 'fail') {
          alert(response.errors);
          dispatch(invoicePayInCashError(response.error));
        }
      })
      .catch(error => {
        dispatch(invoicePayInCashError(error));
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function getCheckoutIDSuccess(response) {
  return {
    type: types.GET_CHECKOUT_ID_SUCCESS,
    payload: {
      response,
    },
  };
}

export function getCheckoutIDError(error) {
  return {
    type: types.GET_CHECKOUT_ID_ERROR,
    payload: {
      error,
    },
  };
}

export function getCheckoutID(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/initiate-transaction`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: _this.state.token,
      },
      body: JSON.stringify({
        invoiceUuid: data.invoiceUuid,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(getCheckoutIDSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          alert(responseJSON.errors);
          dispatch(getCheckoutIDError(responseJSON.error));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}
