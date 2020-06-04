import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/pedidos';

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.PEDIDOS_FETCH_COMPLETED: {
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
    case types.PEDIDOS_CLIENTE_FETCH_COMPLETED: {
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
    case types.PEDIDO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.PEDIDO_ADD_COMPLETED: {
      const { oldId, pedido } = action.payload;
      const newState = omit(state, oldId);
      newState[pedido.id] = {
        ...pedido,
        isConfirmed: true,
      };
      return newState;
    }
    case types.PEDIDO_END_COMPLETED: {
      const { oldId, pedido } = action.payload;
      const newState = omit(state, oldId);
      newState[pedido.id] = {
        ...pedido,
        isConfirmed: true,
      };
      return newState;
    }
    case types.PEDIDO_TAKE_COMPLETED: {
      const { oldId, pedido } = action.payload;
      const newState = omit(state, oldId);
      newState[pedido.id] = {
        ...pedido,
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
    case types.PEDIDOS_FETCH_STARTED: {
      return true;
    }
    case types.PEDIDOS_FETCH_COMPLETED: {
      return false;
    }
    case types.PEDIDOS_FETCH_FAILED: {
      return false;
    }
    case types.PEDIDOS_CLIENTE_FETCH_STARTED: {
      return true;
    }
    case types.PEDIDOS_CLIENTE_FETCH_COMPLETED: {
      return false;
    }
    case types.PEDIDOS_CLIENTE_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
    case types.PEDIDOS_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.PEDIDOS_CLIENTE_FETCH_COMPLETED: {
      return [...action.payload.order];
    }
    case types.PEDIDO_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.PEDIDO_ADD_COMPLETED: {
      const { oldId, pedido } = action.payload;
      return state.map(id => id === oldId ? pedido.id : id);
    }
    case types.PEDIDO_END_COMPLETED: {
      const { oldId, pedido } = action.payload;
      return state.map(id => id === oldId ? pedido.id : id);
    }
    case types.PEDIDO_TAKE_COMPLETED: {
      const { oldId, pedido } = action.payload;
      return state.map(id => id === oldId ? pedido.id : id);
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.PEDIDOS_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PEDIDOS_FETCH_STARTED: {
      return null;
    }
    case types.PEDIDOS_FETCH_COMPLETED: {
      return null;
    }
    case types.PEDIDOS_CLIENTE_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.PEDIDOS_CLIENTE_FETCH_STARTED: {
      return null;
    }
    case types.PEDIDOS_CLIENTE_FETCH_COMPLETED: {
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

export const getPedido = (state, id) => state.byId[id];
export const getPedidos = state => state.order.map(id => getPedido(state, id));
export const isFetchingPedidos = state => state.isFetching;
export const getFetchingPedidosError = state => state.error;