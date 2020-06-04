import * as types from '../types/compras';

export const startFetchingCompras = cliente => ({
  type: types.COMPRAS_FETCH_STARTED,
  payload: {
    cliente
  },
});
export const completeFetchingCompras = (order, entities) => ({
  type: types.COMPRAS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});
export const failFetchingCompras = error => ({
  type: types.COMPRAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingCompra = (id, cantidadCompra, estadoCompra, subtotalCompra, descuentoCompra, idProducto, idCliente) => ({
  type: types.COMPRA_ADD_STARTED,
  payload: {
    id,
    cantidadCompra,
    estadoCompra,
    subtotalCompra,
    descuentoCompra,
    idProducto,
    idCliente,
  },
});
export const completeAddingCompra = (oldId, compra) => ({
  type: types.COMPRA_ADD_COMPLETED,
  payload: {
    oldId,
    compra,
  },
});
export const failAddingCompra = (oldId, error) => ({
  type: types.COMPRA_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startExpiringCompra = id => ({
  type: types.COMPRA_EXPIRE_STARTED,
  payload: {
    id,
  },
});
export const completeExpiringCompra = id => ({
  type: types.COMPRA_EXPIRE_COMPLETED,
  payload: {
    id,
  }
});

export const failExpiringCompra = error => ({
  type: types.COMPRA_EXPIRE_FAILED,
  payload: {
    error,
  },
});

export const startEndingCompras = cliente => ({
  type: types.COMPRAS_END_STARTED,
  payload: {
    cliente,
  },
});
export const completeEndingCompras = () => ({
  type: types.COMPRAS_END_COMPLETED,
});

export const failEndingCompras = error => ({
  type: types.COMPRAS_END_FAILED,
  payload: {
    error,
  },
});

export const startPutingCompras = (cliente, tienda, comprasById)  => ({
  type: types.COMPRAS_PUT_STARTED,
  payload: {
    cliente,
    tienda,
    comprasById,
  },
});
export const completePutingCompras = () => ({
  type: types.COMPRAS_PUT_COMPLETED,
});

export const failPutingCompras = error => ({
  type: types.COMPRAS_PUT_FAILED,
  payload: {
    error,
  },
});
