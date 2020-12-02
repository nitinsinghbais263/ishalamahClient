import createReducer from '../store/configureStore'
import * as types from '../actions/types'

export const invoices = createReducer({}, {
  [types.GET_INITIAL_INVOICES_LIST](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      userAddress: false,
      invoices: false,
      invoiceServerError: false
    }
  },
  [types.GET_INVOICES_LIST](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      invoiceServerError: false,
      invoices: action.payload.response
    }
  },
  [types.GET_INVOICES_LIST_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      invoiceServerError: action.payload.error,
      data: false
    }
  },
  [types.GET_INVOICE_DETAILS](state, action) {

    return {
      ...state,
      success: false,
      error: false,
      serverError: false,
      details: action.payload.response
    }
  },
  [types.GET_INVOICE_DETAILS_ERROR](state, action) {
    return {
      ...state,
      success: false,
      error: false,
      serverError: action.payload.error,
      details: false
    }
  },
  [types.CART_INVOICE_TRANSACTION](state, action) {

      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        data: action.payload.response
      }
    },
  [types.CART_INVOICE_TRANSACTION](state, action) {

        return {
          ...state,
          success: false,
          error: false,
          serverError: false,
          payInCash: action.payload.response
        }
      },
      [types.PAY_IN_CASH_SUCCESS](state, action) {

            return {
              ...state,
              success: false,
              error: false,
              serverError: false,
              payInCash: false,
              checkoutId: false,
              cash: action.payload.response
            }
          },
      [types.PAY_IN_CASH_ERROR](state, action) {

                return {
                  ...state,
                  success: false,
                  error: false,
                  serverError: action.payload.response,
                  payInCash: false,
                  checkoutId: false,
                  cash: false
                }
              },
  [types.GET_CHECKOUT_ID_SUCCESS](state, action) {

        return {
          ...state,
          success: false,
          error: false,
          serverError: false,
          payInCash: false,
          checkoutId: action.payload.response
        }
      },
  [types.GET_CHECKOUT_ID_ERROR](state, action) {

            return {
              ...state,
              success: false,
              error: false,
              serverError: action.payload.response,
              payInCash: false,
              checkoutId: false
            }
          }
});
