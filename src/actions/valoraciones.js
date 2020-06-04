import * as types from '../types/valoraciones';

export const startFetchingComentarios = id => ({
  type: types.COMENTARIOS_FETCH_STARTED,
  payload: {
    id,
  },
});
export const completeFetchingComentarios = (entities, order) => ({
  type: types.COMENTARIOS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingComentarios = error => ({
  type: types.COMENTARIOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingPuntuacion = id => ({
    type: types.PUNTUACION_FETCH_STARTED,
    payload: {
      id,
    },
});
export const completeFetchingPuntuacion = puntuacion => ({
    type: types.PUNTUACION_FETCH_COMPLETED,
    payload: puntuacion,
});
export const failFetchingPuntuacion = error => ({
    type: types.PUNTUACION_FETCH_FAILED,
    payload: {
      error,
    },
});
  
export const startAddingValoracion = (id, comentarioValoracion, puntuacionValoracion, idEmpleado, idCliente) => ({
  type: types.VALORACION_ADD_STARTED,
  payload: {
    id,
    comentarioValoracion,
    puntuacionValoracion,
    idCliente,
    idEmpleado,
  },
});
export const completeAddingValoracion = (oldId, valoracion) => ({
  type: types.VALORACION_ADD_COMPLETED,
  payload: {
    oldId,
    valoracion,
  },
});
export const failAddingValoracion = (oldId, error) => ({
  type: types.VALORACION_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});
