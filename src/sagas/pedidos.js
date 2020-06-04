import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';
  
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/pedidos';
import * as types from '../types/pedidos';
import { v4 as uuidv4 } from 'uuid';    

import * as actionsRegistros from '../actions/registros';
import * as actionsComras from '../actions/compras';

import { normalize } from 'normalizr';
import * as schemas from '../schemas/pedidos';
  
function* fetchPedidos(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/pedidos/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          const jsonResult = yield response.json();
          const {
            entities: { pedidos },
            result,
          } = normalize(jsonResult, schemas.pedido);
          yield put(
            actions.completeFetchingPedidos(
              result,
              pedidos,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingPedidos(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingPedidos('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchPedidos() {
    yield takeEvery(
      types.PEDIDOS_FETCH_STARTED,
      fetchPedidos,
    );
}

function* fetchPedidosClientes(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/clientes/${action.payload}/mis-pedidos/`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
        console.log(response);
      if (response.status === 200) {
        const jsonResult = yield response.json();
        const {
          entities: { pedidos },
          result,
        } = normalize(jsonResult, schemas.pedido);
        yield put(
          actions.completeFetchingPedidosClientes(
            result,
            pedidos,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingPedidosClientes(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingPedidosClientes('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchFetchPedidosClientes() {
  yield takeEvery(
    types.PEDIDOS_CLIENTE_FETCH_STARTED,
    fetchPedidosClientes,
  );
}
  
function* addPedido(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/pedidos/`,
          {
            method: 'POST',
            body: JSON.stringify({
              estadoPedido: action.payload.estadoPedido,
              pagoPedido: action.payload.pagoPedido,
              entregaPedido: action.payload.entregaPedido,
              recogerPedido: action.payload.recogerPedido,
              idCliente: action.payload.idCliente,
              idFactura: action.payload.idFactura,
              idEmpleado: 1,
            }),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingPedido(
              action.payload.id,
              jsonResult,
            ),
          );
          yield* action.payload.comprasById.map(function*(item){
            console.log(item);
            yield put(
              actionsRegistros.startAddingRegistro(
                uuidv4(),
                item.cantidadCompra,
                (item.subtotalCompra/item.cantidadCompra),
                item.subtotalCompra,
                item.descuentoCompra,
                (item.subtotalCompra-item.descuentoCompra),
                item.idProducto,
                jsonResult['id'],
              ),
            );
          });
          yield put(
            actionsComras.startEndingCompras(
              action.payload.idCliente
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingPedido(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingPedido('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddPedido() {
    yield takeEvery(
      types.PEDIDO_ADD_STARTED,
      addPedido,
    );
}

function* takePedido(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/pedidos/${action.payload.id}/confirmado/`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            idEmpleado: action.payload.idEmpleado,
          }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeTakingPedido(
            action.payload.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failTakingPedido(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failTakingPedido('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchTakePedido() {
  yield takeEvery(
    types.PEDIDO_TAKE_STARTED,
    takePedido,
  );
}

function* endPedido(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/pedidos/${action.payload.id}/completado/`,
        {
          method: 'PATCH',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeEndingPedido(
            action.payload.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failEndingPedido(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failEndingPedido('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchEndPedido() {
  yield takeEvery(
    types.PEDIDO_END_STARTED,
    endPedido,
  );
}
  