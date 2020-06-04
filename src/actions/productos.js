import * as types from '../types/productos';

export const startFetchingProductos = () => ({
  type: types.PRODUCTOS_FETCH_STARTED,
});
export const completeFetchingProductos = (order, entities) => ({
  type: types.PRODUCTOS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});
export const failFetchingProductos = error => ({
  type: types.PRODUCTOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingProducto = (id, nombreProducto, precioProducto, descripcionProducto, descuentoProducto) => ({
  type: types.PRODUCTO_ADD_STARTED,
  payload: {
    id,
    nombreProducto,
    precioProducto,
    descripcionProducto,
    descuentoProducto,
  },
});
export const completeAddingProducto = (oldId, producto) => ({
  type: types.PRODUCTO_ADD_COMPLETED,
  payload: {
    oldId,
    producto,
  },
});
export const failAddingProducto = (oldId, error) => ({
  type: types.PRODUCTO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});
