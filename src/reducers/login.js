import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const logIn = createReducer({}, {
  [types.GET_INITIAL_VALUE](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      data: false
    }
  },
  [types.CREATE_LOGIN_SUCCESS](state, action) {
    return {
      ...state,
      success: true,
      error: false,
      message: 'Successfull..',
      data: action.payload.response
    }
  },
  [types.CREATE_LOGIN_ERROR](state, action) {
    
    return {
      ...state,
      success: false,
      error: true,
      serverError: action.payload.error
    }
  }
});
