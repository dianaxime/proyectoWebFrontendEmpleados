import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/ofertas';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.OFERTA_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.OFERTA_ADD_COMPLETED: {
      const { oldId, oferta } = action.payload;
      const newState = omit(state, oldId);
      newState[oferta.id] = {
        ...oferta,
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
    case types.OFERTA_ADD_STARTED: {
      return [...state, action.payload.id];
    }
    case types.OFERTA_ADD_COMPLETED: {
      const { oldId, oferta } = action.payload;
      return state.map(id => id === oldId ? oferta.id : id);
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.OFERTA_ADD_FAILED: {
      return action.payload.error;
    }
    case types.OFERTA_ADD_STARTED: {
      return null;
    }
    case types.OFERTA_ADD_COMPLETED: {
      return null;
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  byId,
  order,
  error,
});

export const getOferta = (state, id) => state.byId[id];
export const getOfertas = state => state.order.map(id => getOferta(state, id));
