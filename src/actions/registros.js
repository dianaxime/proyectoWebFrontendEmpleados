import * as types from '../types/registros';

export const startAddingRegistro = (id, cantidadRegistro, precioUnidadRegistro, subtotalRegistro, descuentoRegistro, totalRegistro, idProducto, idPedido) => ({
    type: types.REGISTRO_ADD_STARTED,
    payload: {
      id, 
      cantidadRegistro,
      precioUnidadRegistro,
      subtotalRegistro,
      descuentoRegistro,
      totalRegistro,
      idProducto,
      idPedido,
    },
});

export const completeAddingRegistro = (oldId, registro) => ({
    type: types.REGISTRO_ADD_COMPLETED,
    payload: {
      oldId,
      registro,
    },
});

export const failAddingRegistro = (oldId, error) => ({
  type: types.REGISTRO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startFetchingRegistros = () => ({
  type: types.REGISTROS_FETCH_STARTED,
});

export const completeFetchingRegistros = (order, entities) => ({
  type: types.REGISTROS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});

export const failFetchingRegistros = error => ({
  type: types.REGISTROS_FETCH_FAILED,
  payload: {
    error,
  },
});
