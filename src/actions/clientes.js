import * as types from '../types/clientes';


export const startFetchingCliente = () => ({
  type: types.CLIENTE_FETCH_STARTED,
});
export const completeFetchingCliente = (id, cliente) => ({
  type: types.CLIENTE_FETCH_COMPLETED,
  payload: {
    id,
    cliente,
  },
});
export const failFetchingCliente = error => ({
  type: types.CLIENTE_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingCliente = (id, nombreCliente, telefonoCliente, direccionCliente, nitCliente, idUsuario) => ({
  type: types.CLIENTE_ADD_STARTED,
  payload: {
    id,
    nombreCliente,
    telefonoCliente,
    direccionCliente,
    nitCliente,
    idUsuario,
  },
});
export const completeAddingCliente = (oldId, cliente) => ({
  type: types.CLIENTE_ADD_COMPLETED,
  payload: {
    oldId,
    cliente,
  },
});
export const failAddingCliente = (oldId, error) => ({
  type: types.CLIENTE_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingCliente = (id, direccionCliente, telefonoCliente, idUsuario) => ({
  type: types.CLIENTE_UPDATE_STARTED,
  payload: {
    id,
    direccionCliente,
    telefonoCliente,
    idUsuario,
  },
});
export const completeUpdatingCliente = (id, cliente) => ({
  type: types.CLIENTE_UPDATE_COMPLETED,
  payload: {
    id,
    cliente,
  },
});
export const failUpdatingCliente = (id, error) => ({
  type: types.CLIENTE_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});