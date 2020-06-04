import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/tiendas';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TIENDAS_FETCH_COMPLETED: {
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
    case types.TIENDA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TIENDA_ADD_COMPLETED: {
      const { oldId, tienda } = action.payload;
      const newState = omit(state, oldId);
      newState[tienda.id] = {
        ...tienda,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TIENDA_UPDATE_STARTED: {
        return {
            ...state,
            [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload,
            },
        };
      }
    case types.TIENDA_UPDATE_COMPLETED: {
        const { oldId, tienda } = action.payload;
        const newState = omit(state, oldId);
        newState[tienda.id] = {
          ...tienda,
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
    case types.TIENDAS_FETCH_STARTED: {
      return true;
    }
    case types.TIENDAS_FETCH_COMPLETED: {
      return false;
    }
    case types.TIENDAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.TIENDAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.TIENDAS_FETCH_STARTED: {
      return null;
    }
    case types.TIENDAS_FETCH_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.TIENDAS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.TIENDA_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.TIENDA_ADD_COMPLETED: {
      const { oldId, tienda } = action.payload;
      return state.map(id => id === oldId ? tienda.id : id);
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

export const getTienda = (state, id) => state.byId[id];
export const getTiendas = state => state.order.map(id => getTienda(state, id));
export const isFetchingTiendas = state => state.isFetching;
export const getFetchingTiendasError = state => state.error;