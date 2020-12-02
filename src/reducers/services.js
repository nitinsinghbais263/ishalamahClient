import createReducer from '../store/configureStore';
import * as types from '../actions/types';

export const service = createReducer(
  {},
  {
    [types.GET_INITIAL](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        cost: action.payload.response,
      };
    },
    [types.GET_NEXT_SERVICE_DATE](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        data: action.payload.response,
      };
    },
    [types.GET_EXP_SERVICES](state, action) {
      return {
        ...state,
        expServicesError: false,
        userAddress: false,
        expServices: action.payload.response,
      };
    },
    [types.GET_EXP_SERVICES_ERROR](state, action) {
      return {
        ...state,
        expServices: false,
        userAddress: false,
        expServicesError: action.payload.error,
      };
    },
    [types.GET_SERVICE_DETAILS_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        serviceDetail: action.payload.response,
      };
    },

    [types.GET_INITIAL_SERVICES_LIST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        services: false,
        serviceServerError: false,
      };
    },
    [types.GET_SERVICES_LIST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        services: action.payload.response,
      };
    },
    [types.GET_SERVICES_LIST_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        userAddress: false,
        serviceServerError: action.payload.error,
        services: false,
      };
    },
    [types.GET_SERVICES_UUID](state, action) {
      return {
        ...state,
        success: false,
        serviceUuidError: false,
        serverError: false,
        userAddress: false,
        serviceUuid: action.payload.response,
      };
    },
    [types.GET_SERVICES_UUID_ERROR](state, action) {
      return {
        ...state,
        success: false,
        serviceUuidError: true,
        serverError: false,
        userAddress: false,
        serviceUuid: false,
      };
    },
    [types.GET_REPORT_FIELDS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        cost: false,
        userAddress: false,
        reportFileds: action.payload.response,
      };
    },
    [types.SERVICE_CREATE](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        service: action.payload.response,
      };
    },
    [types.RENEW_SERVICE](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        renewService: action.payload.response,
      };
    },
    [types.SERVICE_COST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        cost: action.payload.response,
      };
    },
    [types.SERVICE_COST_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        userAddress: false,
        serverError: action.payload.error,
        cost: false,
      };
    },
    [types.GET_ADDRESS_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: action.payload.response,
      };
    },
    [types.GET_ADDRESS_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: action.payload.error,
        userAddress: false,
      };
    },
    [types.SEND_EMAIL_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        email: action.payload.response,
      };
    },
    [types.SEND_EMAIL_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: action.payload.error,
        email: false,
      };
    },
  },
);
