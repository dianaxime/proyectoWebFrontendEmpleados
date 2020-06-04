import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth, * as authSelectors from './auth';
import usuarios, * as usuariosSelectors from './usuarios';
import clientes, * as clientesSelectors from './clientes';
import empleados, * as empleadosSelectors from './empleados';
import ofertas, * as ofertasSelectors from './ofertas';
import valoraciones, * as valoracionesSelectors from './valoraciones';
import tiendas, * as tiendasSelectors from './tiendas';
import registros, * as registrosSelectors from './registros';
import productos, * as productosSelectors from './productos';
import listas, * as listasSelectors from './listas';
import compras, * as comprasSelectors from './compras';
import facturas, * as facturasSelectors from './facturas';
import pedidos, * as pedidosSelectors from './pedidos';
import selectedProducto, * as selectedProductoSelectors from './selectedProducto';
import selectedCompra, * as selectedCompraSelectors from './selectedCompra';
import selectedTienda, * as selectedTiendaSelectors from './selectedTienda';
import selectedPuntuacion, * as selectedPuntuacionSelectors from './selectedPuntuacion';
import selectedPedido, * as selectedPedidoSelectors from './selectedPedido';

const reducer = combineReducers({
  auth,
  usuarios,
  clientes,
  empleados,
  ofertas,
  valoraciones,
  tiendas,
  registros,
  productos,
  listas,
  compras,
  facturas,
  pedidos,
  selectedProducto,
  selectedCompra,
  selectedTienda,
  selectedPuntuacion,
  selectedPedido,
  form: formReducer,
});

export default reducer;

/* Authentication */
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);
export const getRegisteringCompleted = state => authSelectors.getRegisteringCompleted(state.auth);
/* Usuario */
export const getUsuario = state => usuariosSelectors.getUsuario(state.usuarios);
export const isFetchingUsuario = state => usuariosSelectors.isFetchingUsuario(state.usuarios);
export const getFetchingUsuarioError = state => usuariosSelectors.getFetchingUsuarioError(state.usuarios);
/* Cliente */
export const getCliente = (state, id) => clientesSelectors.getCliente(state.clientes, id);
export const isFetchingCliente = state => clientesSelectors.isFetchingCliente(state.clientes);
export const getFetchingClienteError = state => clientesSelectors.getFetchingClienteError(state.clientes);
/* Empleado */
export const getEmpleado = (state, id) => empleadosSelectors.getEmpleado(state.empleados, id);
export const isFetchingEmpleado = state => empleadosSelectors.isFetchingEmpleado(state.empleados);
export const getFetchingEmpleadoError = state => empleadosSelectors.getFetchingEmpleadoError(state.empleados);
/* Oferta */
export const getOferta = (state, id) => ofertasSelectors.getOferta(state.ofertas, id);
export const getOfertas = state => ofertasSelectors.getOfertas(state.ofertas);
/* Valoracion */
export const getComentario = (state, id) => valoracionesSelectors.getComentario(state.valoraciones, id);
export const getComentarios = state => valoracionesSelectors.getComentarios(state.valoraciones);
export const isFetchingComentarios = state => valoracionesSelectors.isFetchingComentarios(state.valoraciones);
export const getFetchingComentariosError = state => valoracionesSelectors.getFetchingComentariosError(state.valoraciones);
export const getPuntuacion = state => valoracionesSelectors.getPuntuacion(state.valoraciones);
/* SelectedPuntuacion */
export const getSelectedPuntuacion = state => selectedPuntuacionSelectors.getSelectedPuntuacion(state.selectedPuntuacion);
/* Compra */
export const getCompra = (state, id) => comprasSelectors.getCompra(state.compras, id);
export const getCompras = state => comprasSelectors.getCompras(state.compras);
export const isFetchingCompras = state => comprasSelectors.isFetchingCompras(state.compras);
export const getFetchingComprasError = state => comprasSelectors.getFetchingComprasError(state.compras);
/* SelectedCompra */
export const getSelectedCompra = state => selectedCompraSelectors.getSelectedCompra(state.selectedCompra);
/* Factura */
export const getFactura = (state, id) => facturasSelectors.getFactura(state.facturas, id);
export const getFacturas = state => facturasSelectors.getFacturas(state.facturas);
export const isFetchingFacturas = state => facturasSelectors.isFetchingFacturas(state.facturas);
export const getFetchingFacturasError = state => facturasSelectors.getFetchingFacturasError(state.facturas);
/* Lista */
export const getLista = (state, id) => listasSelectors.getLista(state.listas, id);
export const getListas = state => listasSelectors.getListas(state.listas);
export const isFetchingListas = state => listasSelectors.isFetchingListas(state.listas);
export const getFetchingListasError = state => listasSelectors.getFetchingListasError(state.listas);
/* Pedido */
export const getPedido = (state, id) => pedidosSelectors.getPedido(state.pedidos, id);
export const getPedidos = state => pedidosSelectors.getPedidos(state.pedidos);
export const isFetchingPedidos = state => pedidosSelectors.isFetchingPedidos(state.pedidos);
export const getFetchingPedidosError = state => pedidosSelectors.getFetchingPedidosError(state.pedidos);
/* SelectedPedido */
export const getSelectedPedido = state => selectedPedidoSelectors.getSelectedPedido(state.selectedPedido);
/* Producto */
export const getProducto = (state, id) => productosSelectors.getProducto(state.productos, id);
export const getProductos = state => productosSelectors.getProductos(state.productos);
export const isFetchingProductos = state => productosSelectors.isFetchingProductos(state.productos);
export const getFetchingProductosError = state => productosSelectors.getFetchingProductosError(state.productos);
/* SelectedProducto */
export const getSelectedProducto = state => selectedProductoSelectors.getSelectedProducto(state.selectedProducto);
/* Registro */
export const getRegistro = (state, id) => registrosSelectors.getRegistro(state.registros, id);
export const getRegistros = state => registrosSelectors.getRegistros(state.registros);
export const isFetchingRegistros = state => registrosSelectors.isFetchingRegistros(state.registros);
export const getFetchingRegistrosError = state => registrosSelectors.getFetchingRegistrosError(state.registros);
/* Tienda */
export const getTienda = (state, id) => tiendasSelectors.getTienda(state.productos, id);
export const getTiendas = state => tiendasSelectors.getTiendas(state.tiendas);
export const isFetchingTiendas = state => tiendasSelectors.isFetchingTiendas(state.tiendas);
export const getFetchingTiendasError = state => tiendasSelectors.getFetchingTiendasError(state.tiendas);
/* SelectedTienda */
export const getSelectedTienda = state => selectedTiendaSelectors.getSelectedTienda(state.selectedTienda);
