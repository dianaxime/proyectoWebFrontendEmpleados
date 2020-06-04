import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/compras';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_COMPLETED: {
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
    case types.COMPRA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.COMPRA_ADD_COMPLETED: {
      const { oldId, compra } = action.payload;
      const newState = omit(state, oldId);
      newState[compra.id] = {
        ...compra,
        isConfirmed: true,
      };
      return newState;
    }
    case types.COMPRA_EXPIRE_COMPLETED: {
      return omit(state, action.payload.id);
    }
    case types.COMPRAS_END_COMPLETED: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_STARTED: {
      return true;
    }
    case types.COMPRAS_FETCH_COMPLETED: {
      return false;
    }
    case types.COMPRAS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.COMPRA_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.COMPRA_ADD_COMPLETED: {
      const { oldId, compra } = action.payload;
      return state.map(id => id === oldId ? compra.id : id);
    }
    case types.COMPRA_EXPIRE_COMPLETED: {
      return state.filter(id => id !== action.payload.id);
    }
    case types.COMPRAS_END_COMPLETED: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.COMPRAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.COMPRAS_FETCH_STARTED: {
      return null;
    }
    case types.COMPRAS_FETCH_COMPLETED: {
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
  order,
  error,
});

export const getCompra = (state, id) => state.byId[id];
export const getCompras = state => state.order.map(id => getCompra(state, id));
export const isFetchingCompras = state => state.isFetching;
export const getFetchingComprasError = state => state.error;

