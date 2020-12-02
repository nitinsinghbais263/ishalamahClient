import createReducer from '../store/configureStore';
import * as types from '../actions/types';

export const tickets = createReducer(
  {},
  {
    [types.GET_INITIAL_TICKETS_LIST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        userAddress: false,
        tickets: false,
        ticketServerError: false,
      };
    },
    [types.GET_TICKETS_LIST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        ticketServerError: false,
        tickets: action.payload.response,
      };
    },
    [types.GET_TICKETS_LIST_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        ticketServerError: action.payload.error,
        tickets: false,
      };
    },
    [types.GET_ONGOING_TICKETS_LIST](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        onGoingTickets: action.payload.response,
      };
    },
    [types.GET_ONGOING_TICKETS_LIST_ERROR](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: action.payload.error,
        onGoingTickets: false,
      };
    },
    [types.CREATE_NEW_TICKET](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        ticketDetail: action.payload.response,
      };
    },
    [types.CREATE_NEW_TICKET_ERROR](state, action) {
      return {
        ...state,
        success: false,
        ticketError: action.payload.error,
        serverError: false,
        ticketDetail: false,
      };
    },
    [types.GET_TICKET_DETAILS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        ticketDetail: action.payload.response,
      };
    },
    [types.GET_REPORT_VIEW_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        reportView: action.payload.response,
      };
    },
    [types.DOWNLOAD_REPORT_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        downloadReport: action.payload.response,
      };
    },
    [types.RATING_TICKET_SUCCESS](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        rating: action.payload.response,
      };
    },
  },
);
