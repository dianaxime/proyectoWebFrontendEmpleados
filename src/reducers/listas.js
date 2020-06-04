import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/listas';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_COMPLETED: {
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
    case types.LISTA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.LISTA_ADD_COMPLETED: {
      const { oldId, lista } = action.payload;
      const newState = omit(state, oldId);
      newState[lista.id] = {
        ...lista,
        isConfirmed: true,
      };
      return newState;
    }
    case types.LISTA_DECREASE_COMPLETED: {
      const { oldId, lista } = action.payload;
      const newState = omit(state, oldId);
      newState[lista.id] = {
        ...lista,
        isConfirmed: true,
      };
      return newState;
    }
    case types.LISTA_INCREASE_COMPLETED: {
      const { oldId, lista } = action.payload;
      const newState = omit(state, oldId);
      newState[lista.id] = {
        ...lista,
        isConfirmed: true,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_STARTED: {
      return true;
    }
    case types.LISTAS_FETCH_COMPLETED: {
      return false;
    }
    case types.LISTAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.LISTAS_FETCH_STARTED: {
      return null;
    }
    case types.LISTAS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.LISTAS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.LISTA_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.LISTA_ADD_COMPLETED: {
      const { oldId, lista } = action.payload;
      return state.map(id => id === oldId ? lista.id : id);
    }
    case types.LISTA_DECREASE_COMPLETED: {
      const { oldId, lista } = action.payload;
      return state.map(id => id === oldId ? lista.id : id);
    }
    case types.LISTA_INCREASE_COMPLETED: {
      const { oldId, lista } = action.payload;
      return state.map(id => id === oldId ? lista.id : id);
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
  order,
});

export const getLista = (state, id) => state.byId[id];
export const getListas = state => state.order.map(id => getLista(state, id));
export const isFetchingListas = state => state.isFetching;
export const getFetchingListasError = state => state.error;
