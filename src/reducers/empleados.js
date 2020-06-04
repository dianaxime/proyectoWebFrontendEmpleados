import omit from 'lodash/omit';
import { combineReducers } from 'redux';

import * as types from '../types/empleados';


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.EMPLEADO_FETCH_COMPLETED: {
      const { id, empleado } = action.payload;
      const newState = omit(state, id);
      newState[empleado.idUsuario] = {
        ...empleado,
        isConfirmed: true,
      };
      return newState;
    }
    case types.EMPLEADO_ADD_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.EMPLEADO_ADD_COMPLETED: {
      const { oldId, empleado } = action.payload;
      const newState = omit(state, oldId);
      newState[empleado.idUsuario] = {
        ...empleado,
        isConfirmed: true,
      };
      return newState;
    }
    case types.EMPLEADO_UPDATE_STARTED: {
        return {
            ...state,
            [action.payload.idUsuario]: {
            ...state[action.payload.idUsuario],
            ...action.payload,
            },
        };
      }
    case types.EMPLEADO_UPDATE_COMPLETED: {
        const { id, empleado } = action.payload;
        const newState = omit(state, id);
        newState[empleado.idUsuario] = {
          ...empleado,
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
    case types.EMPLEADO_FETCH_STARTED: {
      return true;
    }
    case types.EMPLEADO_FETCH_COMPLETED: {
      return false;
    }
    case types.EMPLEADO_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
  switch(action.type) {
    case types.EMPLEADO_FETCH_FAILED: {
      return action.payload.error;
    }
    case types.EMPLEADO_FETCH_STARTED: {
      return null;
    }
    case types.EMPLEADO_FETCH_COMPLETED: {
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

export const getEmpleado = (state, id) => state.byId[id];
export const isFetchingEmpleado = state => state.isFetching;
export const getFetchingEmpleadoError = state => state.error;
