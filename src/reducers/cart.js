import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const cart = createReducer({}, {
  [types.ADD_TO_CART](state, action) {
    return {
      ...state,
      totalError: false,
      total: action.payload.response
    }
  },
  [types.ADD_TO_CART_ERROR](state, action) {
    return {
      ...state,
      total: false,
      totalError: action.payload.error
    }
  },
  [types.GET_ITEM_TOTAL](state, action) {

    return {
      ...state,
      dataError: false,
      data: action.payload.response
    }
  },
  [types.GET_ITEM_TOTAL_ERROR](state, action) {
    return {
      ...state,
      data: false,
      dataError: action.payload.error
    }
  },
  [types.GET_CART_ITEM](state, action) {
    return {
      ...state,
      itemsError: false,
      items: action.payload.response
    }
  },
  [types.GET_CART_ITEM_ERROR](state, action) {
    return {
      ...state,
      items: false,
      itemsError: action.payload.error
    }
  },
  [types.GET_TAX_SUCCESS](state, action) {
    return {
      ...state,
      taxError: false,
      tax: action.payload.response
    }
  },
  [types.GET_TAX_ERROR](state, action) {
    return {
      ...state,
      tax: false,
      taxError: action.payload.error
    }
  },
  [types.REMOVE_ITEM_FROM_CART](state, action) {
    return {
      ...state,
      removedItemsError: false,
      removedItems: action.payload.response
    }
  },
  [types.REMOVE_ITEM_FROM_CART_ERROR](state, action) {
    return {
      ...state,
      removedItems: false,
      removedItemsError: action.payload.error
    }
  },
  [types.CHECKOUT_CART](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
    }
  },
  [types.CHECKOUT_CART_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
    }
  },
  [types.GET_LATEST_ORDERS](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      latestOrdersError: false,
      latestOrders: action.payload.response
    }
  },
  [types.GET_LATEST_ORDERS_ERROR](state, action) {

    return {
      ...state,
      latestOrdersError: action.payload.error,
      latestOrders: false
    }
  },
  [types.REORDER_ITEMS](state, action) {
    return {
      ...state,
      reorderError: false,
      reorder: action.payload.response
    }
  },
  [types.REORDER_ITEMS_ERROR](state, action) {
    return {
      ...state,
      reorder: false,
      reorderError: action.payload.error
    }
  },
});
