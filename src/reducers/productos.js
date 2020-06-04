import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/productos';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.PRODUCTOS_FETCH_COMPLETED: {
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
    case types.PRODUCTO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.PRODUCTO_ADD_COMPLETED: {
      const { oldId, producto } = action.payload;
      const newState = omit(state, oldId);
      newState[producto.id] = {
        ...producto,
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
    case types.PRODUCTOS_FETCH_STARTED: {
      return true;
    }
    case types.PRODUCTOS_FETCH_COMPLETED: {
      return false;
    }
    case types.PRODUCTOS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.PRODUCTOS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.PRODUCTO_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.PRODUCTO_ADD_COMPLETED: {
      const { oldId, producto } = action.payload;
      return state.map(id => id === oldId ? producto.id : id);
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.PRODUCTOS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PRODUCTOS_FETCH_STARTED: {
      return null;
    }
    case types.PRODUCTOS_FETCH_COMPLETED: {
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
  order,
});

export const getProducto = (state, id) => state.byId[id];
export const getProductos = state => state.order.map(id => getProducto(state, id));
export const isFetchingProductos = state => state.isFetching;
export const getFetchingProductosError = state => state.error;
