import * as types from './types';
import {Alert} from 'react-native';
import {baseUrl} from '../constants/API';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../lang/i18n';

export function createrRegistrationSuccess(response) {
  return {
    type: types.CREATE_REGITRATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function createRegistrationError(error) {
  return {
    type: types.CREATE_REGITRATION_ERROR,
    payload: {
      error,
    },
  };
}

export function getinitialState() {
  return {
    type: types.GET_INITIAL_VALUE,
  };
}

export function resendOtpSuccess(response) {
  return {
    type: types.RESEND_OTP_VERIFICATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function resendOtpError(error) {
  return {
    type: types.RESEND_OTP_VERIFICATION_ERROR,
    payload: {
      error,
    },
  };
}

export function resendOtp(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/resend-otp/${data.otp_to}/${data.otp_type}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(resendOtpSuccess(responseJSON));
        } else if (responseJSON.status == 'fail') {
          dispatch(resendOtpError(responseJSON));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        dispatch(resendOtpError(error));
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function registration(_this, data) {
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        type: data.type,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          AsyncStorage.setItem('USER_UUID', responseJSON.client.user_uuid);
          dispatch(createrRegistrationSuccess(responseJSON.client));
          // that.props.navigation.navigate('Register3', {data: data});
        } else {
          dispatch(createRegistrationError(responseJSON.errors));
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function codeVerificationSuccess(response) {
  return {
    type: types.OTP_VERIFICATION_SUCCESS,
    payload: {
      response,
    },
  };
}

export function codeVerificationError(error) {
  return {
    type: types.OTP_VERIFICATION_ERROR,
    payload: {
      error,
    },
  };
}

export function codeVerification(_this, data) {
  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/verify-phone`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: data.phone,
        otp: data.otp,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(codeVerificationSuccess(responseJSON.client));
          that.props.navigation.navigate('Register4', {data: data});
        } else if (responseJSON.status == 'fail') {
          dispatch(codeVerificationError(responseJSON));
        } else {
          i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
        }
      })
      .catch(error => {
        i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
      });
  };
}

export function createPasswordSuccess(response) {
  return {
    type: types.CREATE_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function createPasswordError(error) {
  return {
    type: types.CREATE_PASSWORD_ERROR,
    payload: {
      error,
    },
  };
}

export function createPassword(_this, data) {
  const user_uuid = data.user_uuid;

  return function(dispatch) {
    var that = _this;
    fetch(`${baseUrl}/store-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        userUuid: data.user_uuid,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: data.phone,
              password: data.password,
              timezone: 'Asia/Kolkata',
              type: 'client',
              oneSignalPlayerId: data.oneSignalId,
            }),
          })
            .then(response => response.json())
            .then(responseJSON => {
              if (responseJSON.status == 'success') {
                AsyncStorage.setItem(
                  'TOKEN',
                  'Bearer ' + responseJSON.user.push_token,
                );
                // AsyncStorage.setItem('USER', responseJSON.user)
                that.props.navigation.navigate('UserProfile');
                // dispatch(createPasswordSuccess(responseJSON.user))
                // dispatch(createLoginSuccess(responseJSON.user))
              } else if (responseJSON.status == 'fail') {
                dispatch(createLoginError(responseJSON.error));
              } else {
                i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))
              }
            })
            .catch(error => {
              // alert("i18n.locale==='ar'? alert(i18n.t('wrong')) : alert(i18n.t('wrong'))3.2")
            });
        } else {
          dispatch(createPasswordError(responseJSON.error));
        }
      });
  };
}

export function forgetPasswordSuccess(response) {
  return {
    type: types.FORGET_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function forgetPasswordError(error) {
  return {
    type: types.FORGET_PASSWORD_ERROR,
    payload: {
      error,
    },
  };
}

export function forgetPassword(_this, data) {
  const user = data.user;
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/forgot-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.user,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          // Actions.forgetpassword2({user:user})
          dispatch(forgetPasswordSuccess(responseJSON));
        } else {
          dispatch(forgetPasswordError(responseJSON));
        }
      });
  };
}

export function resetPasswordSuccess(response) {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    payload: {
      response,
    },
  };
}

export function resetPasswordError(error) {
  return {
    type: types.RESET_PASSWORD_ERROR,
    payload: {
      error,
    },
  };
}

export function resetPassword(_this, data) {
  const user_uuid = data.user_uuid;
  return function(dispatch) {
    var that = _this;

    fetch(`${baseUrl}/reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.user,
        otp: data.otp,
        password: data.password,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          // Actions.login()
          dispatch(resetPasswordSuccess(responseJSON));
        } else {
          dispatch(resetPasswordError(responseJSON));
        }
      })
      .catch(error => {
        dispatch(resetPasswordError(error.response));
      });
  };
}

export function verifyOtp(data) {
  return function(dispatch) {
    fetch(`${baseUrl}/verify-reset-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp: data.otp,
        user: data.user,
      }),
    })
      .then(response => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 'success') {
          dispatch(verifyOtpSuccess(responseJSON));
        } else {
          dispatch(verifyOtpError(responseJSON));
        }
      })
      .catch(error => {
        dispatch(verifyOtpError(error.response));
      });
  };
}

export function verifyOtpSuccess(response) {
  return {
    type: types.VERIFY_OTP_SUCCESS,
    payload: {
      response,
    },
  };
}

export function verifyOtpError(error) {
  return {
    type: types.VERIFY_OTP_ERROR,
    payload: {
      error,
    },
  };
}
