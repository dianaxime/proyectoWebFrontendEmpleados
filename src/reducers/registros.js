import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/registros';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.REGISTROS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });
      return newState;
    }
    case types.REGISTRO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.REGISTRO_ADD_COMPLETED: {
      const { oldId, registro } = action.payload;
      const newState = omit(state, oldId);
      newState[registro.id] = {
        ...registro,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.REGISTROS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.REGISTRO_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.REGISTRO_ADD_COMPLETED: {
      const { oldId, registro } = action.payload;
      return state.map(id => id === oldId ? registro.id : id);
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.REGISTROS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.REGISTROS_FETCH_STARTED: {
      return null;
    }
    case types.REGISTROS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.REGISTROS_FETCH_STARTED: {
      return true;
    }
    case types.REGISTROS_FETCH_COMPLETED: {
      return false;
    }
    case types.REGISTROS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getRegistro = (state, id) => state.byId[id];
export const getRegistros = state => state.order.map(id => getRegistro(state, id));
export const isFetchingRegistros = state => state.isFetching;
export const getFetchingRegistrosError = state => state.error;
