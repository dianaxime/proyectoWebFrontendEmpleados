import * as types from '../types/facturas';

export const startFetchingFacturas = () => ({
  type: types.FACTURAS_FETCH_STARTED,
});

export const completeFetchingFacturas = (order, entities) => ({
  type: types.FACTURAS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});

export const failFetchingFacturas = error => ({
  type: types.FACTURAS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingFacturasClientes = id => ({
  type: types.FACTURAS_CLIENTE_FETCH_STARTED,
  payload : {
    id,
  },
});

export const completeFetchingFacturasClientes = (order, entities) => ({
  type: types.FACTURAS_CLIENTE_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});

export const failFetchingFacturasClientes = error => ({
  type: types.FACTURAS_CLIENTE_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingFactura = (id, subtotalFactura, ivaFactura, totalFactura, idTienda, idCliente, comprasById) => ({
  type: types.FACTURA_ADD_STARTED,
  payload: {
    id,
    subtotalFactura,
    ivaFactura,
    totalFactura,
    idTienda,
    idCliente,
    comprasById,
  },
});

export const completeAddingFactura = (oldId, factura) => ({
  type: types.FACTURA_ADD_COMPLETED,
  payload: {
    oldId,
    factura,
  },
});

export const failAddingFactura = error => ({
  type: types.FACTURA_ADD_FAILED,
  payload: {
    error,
  },
});

