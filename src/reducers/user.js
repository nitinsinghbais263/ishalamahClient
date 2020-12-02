import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const user = createReducer({}, {
  [types.GET_USER_DETAILS](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      data: action.payload.response,
      newData: action.payload.response,
      dataError: false,
      newDataError: false,
      update_data: false,
      update_data_error: false,
      profile_pic: false,
      profile_pic_error: false,
      userAddress: false,
    }
  },
  [types.GET_USER_DETAILS_ERROR](state, action) {
    return {
      ...state,
      newData: false,
      data: false,
      dataError: action.payload.error,
      newDataError: action.payload.error,
      update_data: false,
      update_data_error: false,
      profile_pic: false,
      profile_pic_error: false,
      userAddress: false,
    }
  },
  [ types.UPADTE_USER_DETAILS](state, action) {
    return {
      ...state,
      data: false,
      newData: false,
      dataError: false,
      newDataError: false,
      profile_pic: false,
      profile_pic_error: false,
      update_data_error: false,
      userAddress: false,
      update_data: action.payload.response
    }
  },
  [ types.UPADTE_USER_DETAILS_ERROR](state, action) {
    return {
      ...state,
      data: false,
      newData: false,
      dataError: false,
      newDataError: false,
      profile_pic: false,
      profile_pic_error: false,
      update_data: false,
      userAddress: false,
      update_data_error: action.payload.error
    }
  },
  [types.GET_DRAWER_DATA](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      userAddress: false,
      drawer: action.payload.response
    }
  },
  [types.GET_COUNTRY](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      userAddress: false,
      countries: action.payload.response
    }
  },
  [types.GET_STATE](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      newData: false,
      userAddress: false,
      states: action.payload.response
    }
  },
  [types.GET_CITY](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      newData: false,
      userAddress: false,
      cities: action.payload.response
    }
  },
  [types.UPLOAD_PROFILE_PIC](state, action) {
    return {
      ...state,
      data: false,
      newData: false,
      dataError: false,
      newDataError: false,
      update_data: false,
      update_data_error: false,
      profile_pic_error: false,
      userAddress: false,
      profile_pic: action.payload.response
    }
  },
  [types.UPLOAD_PROFILE_PIC_ERROR](state, action) {

    return {
      ...state,
      data: false,
      newData: false,
      dataError: false,
      newDataError: false,
      update_data: false,
      update_data_error: false,
      profile_pic: false,
      userAddress: false,
      profile_pic_error: action.payload.error
    }
  }
});
