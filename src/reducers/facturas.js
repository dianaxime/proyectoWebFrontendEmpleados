import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/facturas';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.FACTURAS_FETCH_COMPLETED: {
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
    case types.FACTURAS_CLIENTE_FETCH_COMPLETED: {
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
    case types.FACTURA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.FACTURA_ADD_COMPLETED: {
      const { oldId, factura } = action.payload;
      const newState = omit(state, oldId);
      newState[factura.id] = {
        ...factura,
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
    case types.FACTURAS_FETCH_STARTED: {
      return true;
    }
    case types.FACTURAS_FETCH_COMPLETED: {
      return false;
    }
    case types.FACTURAS_FETCH_FAILED: {
      return false;
    }
    case types.FACTURAS_CLIENTE_FETCH_STARTED: {
      return true;
    }
    case types.FACTURAS_CLIENTE_FETCH_COMPLETED: {
      return false;
    }
    case types.FACTURAS_CLIENTE_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.FACTURAS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.FACTURAS_CLIENTE_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.FACTURA_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.FACTURA_ADD_COMPLETED: {
      const { oldId, factura } = action.payload;
      return state.map(id => id === oldId ? factura.id : id);
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.FACTURAS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.FACTURAS_FETCH_STARTED: {
      return null;
    }
    case types.FACTURAS_FETCH_COMPLETED: {
      return null;
    }
    case types.FACTURAS_CLIENTE_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.FACTURAS_CLIENTE_FETCH_STARTED: {
      return null;
    }
    case types.FACTURAS_CLIENTE_FETCH_COMPLETED: {
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

export const getFactura = (state, id) => state.byId[id];
export const getFacturas = state => state.order.map(id => getFactura(state, id));
export const isFetchingFacturas = state => state.isFetching;
export const getFetchingFacturasError = state => state.error;
