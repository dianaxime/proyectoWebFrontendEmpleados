import * as types from '../types/pedidos';

export const startFetchingPedidos = () => ({
  type: types.PEDIDOS_FETCH_STARTED,
});

export const completeFetchingPedidos = (order, entities) => ({
  type: types.PEDIDOS_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});

export const failFetchingPedidos = error => ({
  type: types.PEDIDOS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startFetchingPedidosClientes = cliente => ({
  type: types.PEDIDOS_CLIENTE_FETCH_STARTED,
  payload: cliente,
});

export const completeFetchingPedidosClientes = (order, entities) => ({
  type: types.PEDIDOS_CLIENTE_FETCH_COMPLETED,
  payload: {
    order,
    entities,
  },
});

export const failFetchingPedidosClientes = error => ({
  type: types.PEDIDOS_CLIENTE_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPedido = ( id, estadoPedido, pagoPedido, entregaPedido, recogerPedido, idFactura, idCliente, comprasById) => ({
  type: types.PEDIDO_ADD_STARTED,
  payload: {
    id, 
    pagoPedido,
    estadoPedido,
    entregaPedido, 
    recogerPedido, 
    idFactura,
    idCliente,
    comprasById,
  },
});

export const completeAddingPedido = (oldId, pedido) => ({
  type: types.PEDIDO_ADD_COMPLETED,
  payload: {
    oldId,
    pedido,
  },
});

export const failAddingPedido = (oldId, error) => ({
  type: types.PEDIDO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startEndingPedido = id => ({
  type: types.PEDIDO_END_STARTED,
  payload: {
    id,
  },
});

export const completeEndingPedido = (oldId, pedido) => ({
  type: types.PEDIDO_END_COMPLETED,
  payload: {
    oldId,
    pedido,
  },
});

export const failEndingPedido = error => ({
  type: types.PEDIDO_END_FAILED,
  payload: {
    error,
  },
});

export const startTakingPedido = (id, idEmpleado) => ({
  type: types.PEDIDO_TAKE_STARTED,
  payload: {
    id,
    idEmpleado,
  },
});

export const completeTakingPedido = (oldId, pedido) => ({
  type: types.PEDIDO_TAKE_COMPLETED,
  payload: {
    oldId,
    pedido,
  },
});

export const failTakingPedido = error => ({
  type: types.PEDIDO_TAKE_FAILED,
  payload: {
    error,
  },
});

