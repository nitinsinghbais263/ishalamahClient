import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const products = createReducer({}, {
  [types.GET_INITIAL_PRODUCTS_LIST](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      userAddress: false,
      products: false,
      productServerError: false
    }
  },
  [types.GET_PRODUCTS_LIST](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      productServerError: false,
      products: action.payload.response
    }
  },
  [types.GET_PRODUCTS_LIST_ERROR](state, action) {
    
    return {
      ...state,
      success: false,
      error: false,
      productServerError: action.payload.error,
      products: false
    }
  },
  [types.GET_CATEGORY_LIST](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      category: action.payload.response
    }
  }
});
