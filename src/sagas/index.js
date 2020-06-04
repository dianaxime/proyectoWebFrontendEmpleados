import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
  watchRegisterStarted,
} from './auth';

import {
  watchClienteFetch,
  watchAddCliente,
  watchUpdateCliente,
} from './clientes';

import {
  watchEmpleadoFetch,
  watchAddEmpleado,
  watchUpdateEmpleado,
} from './empleados';

import {
  watchProductosFetch,
  watchAddProducto,
} from './productos';

import {
  watchFetchCompras,
  watchAddCompra,
  watchEndCompras,
  watchExpireCompra,
  watchPutCompras,
} from './compras';

import {
  watchFetchTiendas,
  watchAddTienda,
  watchUpdateTienda,
} from './tiendas';

import {
  watchFetchListas,
  watchAddLista,
  watchDecreaseLista,
  watchIncreaseLista,
} from './listas';

import {
  watchAddOferta,
} from './ofertas';

import {
  watchAddRegistro,
  watchFetchRegistros,
} from './registros';

import {
  watchAddFactura,
  watchFetchFacturas,
  watchFetchFacturasClientes,
} from './facturas';

import {
  watchAddPedido,
  watchEndPedido,
  watchTakePedido,
  watchFetchPedidos,
  watchFetchPedidosClientes,
} from './pedidos';

import { watchFetchUsuarioStarted } from './usuarios';

import {
  watchAddValoracion,
  watchFetchComentarios,
  watchfetchPuntuacion,
} from './valoraciones';

function* mainSaga() {
  yield all([
    /* Auth */
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchRegisterStarted),
    fork(watchFetchUsuarioStarted),
    /* Clientes */
    fork(watchClienteFetch),
    fork(watchAddCliente),
    fork(watchUpdateCliente),
    /* Empleados */
    fork(watchEmpleadoFetch),
    fork(watchAddEmpleado),
    fork(watchUpdateEmpleado),
    /* Productos */
    fork(watchProductosFetch),
    fork(watchAddProducto),
    /* Compras */
    fork(watchFetchCompras),
    fork(watchAddCompra),
    fork(watchExpireCompra),
    fork(watchEndCompras),
    fork(watchPutCompras),
    /* Tiendas */
    fork(watchFetchTiendas),
    fork(watchAddTienda),
    fork(watchUpdateTienda),
    /* Listas */
    fork(watchFetchListas),
    fork(watchAddLista),
    fork(watchIncreaseLista),
    fork(watchDecreaseLista),
    /* Ofertas */
    fork(watchAddOferta),
    /* Registros */
    fork(watchAddRegistro),
    fork(watchFetchRegistros),
    /* Facturas */
    fork(watchAddFactura),
    fork(watchFetchFacturas),
    fork(watchFetchFacturasClientes),
    /* Pedidos */
    fork(watchAddPedido),
    fork(watchFetchPedidos),
    fork(watchFetchPedidosClientes),
    fork(watchEndPedido),
    fork(watchTakePedido),
    /* Valoraciones */
    fork(watchAddValoracion),
    fork(watchFetchComentarios),
    fork(watchfetchPuntuacion),
  ]);
}

export default mainSaga;
