import createReducer from '../store/configureStore';
import * as types from '../actions/types';

export const notes = createReducer(
  {},
  {
    [types.CREATE_NEW_NOTES](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        notes: action.payload.response,
      };
    },
    [types.CREATE_NEW_NOTES_ERROR](state, action) {
      return {
        ...state,
        success: false,
        notesError: action.payload.error,
        serverError: false,
        notes: false,
      };
    },
    [types.DELETE_NOTE](state, action) {
      return {
        ...state,
        success: false,
        error: false,
        serverError: false,
        deleteNote: action.payload.response,
      };
    },
  },
);
