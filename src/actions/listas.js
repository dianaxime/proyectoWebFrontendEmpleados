import * as types from '../types/listas';

export const startFetchingListas = () => ({
  type: types.LISTAS_FETCH_STARTED,
});
export const completeFetchingListas = (order, entities) => ({
  type: types.LISTAS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});
export const failFetchingListas = error => ({
  type: types.LISTAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingLista = (id, cantidadLista, turnoLista, idProducto, idEncargado) => ({
  type: types.LISTA_ADD_STARTED,
  payload: {
    id,
    cantidadLista,
    turnoLista,
    idProducto,
    idEncargado,
  },
});

export const completeAddingLista = (oldId, lista) => ({
  type: types.LISTA_ADD_COMPLETED,
  payload: {
    oldId,
    lista,
  },
});

export const failAddingLista = error => ({
  type: types.LISTA_ADD_FAILED,
  payload: {
    error,
  },
});

export const startDecreasingLista = (id, cantidad) => ({
  type: types.LISTA_DECREASE_STARTED,
  payload: {
    id,
    cantidad,
  },
});

export const completeDecreasingLista = (oldId, lista) => ({
  type: types.LISTA_DECREASE_COMPLETED,
  payload: {
    oldId,
    lista,
  },
});

export const failDecreasingLista = error => ({
  type: types.LISTA_DECREASE_FAILED,
  payload: {
    error,
  },
});

export const startIncreasingLista = (id, cantidad) => ({
  type: types.LISTA_INCREASE_STARTED,
  payload: {
    id,
    cantidad,
  },
});

export const completeIncreasingLista = (oldId, lista) => ({
  type: types.LISTA_INCREASE_COMPLETED,
  payload: {
    oldId,
    lista,
  },
});

export const failIncreasingLista = error => ({
  type: types.LISTA_INCREASE_FAILED,
  payload: {
    error,
  },
});
