import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const cash = createReducer({}, {
  [types.GET_INITIAL_CASH_BOOK](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      userAddress: false,
      cashbook: false,
      cashbookServerError: false
    }
  },
  [types.GET_CASH_BOOK](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      cashbook: action.payload.response
    }
  },
  [types.GET_CASH_BOOK_ERROR](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      cashbookServerError: action.payload.error,
      cashbook: false
    }
  }
});
