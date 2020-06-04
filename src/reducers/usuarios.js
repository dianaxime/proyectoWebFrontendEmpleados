import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/usuarios';


const byId = (state = null, action) => {
  switch(action.type) {
    case types.USUARIO_FETCH_COMPLETED: {
      return action.payload.usuario;
    }
    case types.USUARIO_FETCH_STARTED: {
        return null;
    }
    case types.USUARIO_FETCH_FAILED: {
        return null;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.USUARIO_FETCH_STARTED: {
      return true;
    }
    case types.USUARIO_FETCH_COMPLETED: {
      return false;
    }
    case types.USUARIO_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.USUARIO_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.USUARIO_FETCH_STARTED: {
      return null;
    }
    case types.USUARIO_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  byId,
  isFetching,
  error,
});

export const getUsuario = state => state.byId;
export const isFetchingUsuario = state => state.isFetching;
export const getFetchingUsuarioError = state => state.error;