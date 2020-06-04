import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/clientes';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.CLIENTE_FETCH_COMPLETED: {
      const { id, cliente } = action.payload;
      const newState = omit(state, id);
      newState[cliente.idUsuario] = {
        ...cliente,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CLIENTE_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.CLIENTE_ADD_COMPLETED: {
      console.log(action.payload);
      const { oldId, cliente } = action.payload;
      const newState = omit(state, oldId);
      newState[cliente.idUsuario] = {
        ...cliente,
        isConfirmed: true,
      };
      return newState;
    }
    case types.CLIENTE_UPDATE_STARTED: {
        return {
            ...state,
            [action.payload.idUsuario]: {
            ...state[action.payload.idUsuario],
            ...action.payload,
            },
        };
      }
    case types.CLIENTE_UPDATE_COMPLETED: {
        const { id, cliente } = action.payload;
        const newState = omit(state, id);
        newState[cliente.idUsuario] = {
          ...cliente,
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
    case types.CLIENTE_FETCH_STARTED: {
      return true;
    }
    case types.CLIENTE_FETCH_COMPLETED: {
      return false;
    }
    case types.CLIENTE_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.CLIENTE_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.CLIENTE_FETCH_STARTED: {
      return null;
    }
    case types.CLIENTE_FETCH_COMPLETED: {
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

export const getCliente = (state, id) => state.byId[id];
export const isFetchingCliente = state => state.isFetching;
export const getFetchingClienteError = state => state.error;
