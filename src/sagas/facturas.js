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
import * as actions from '../actions/facturas';
import * as actionsPedidos from '../actions/pedidos';
import * as types from '../types/facturas';
import { normalize } from 'normalizr';
import * as schemas from '../schemas/facturas';
import { v4 as uuidv4 } from 'uuid';    
  
function* fetchFacturas(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/facturas/`,
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
            entities: { facturas },
            result,
          } = normalize(jsonResult, schemas.factura);
          yield put(
            actions.completeFetchingFacturas(
              result,
              facturas,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingFacturas(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingFacturas('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchFacturas() {
    yield takeEvery(
      types.FACTURAS_FETCH_STARTED,
      fetchFacturas,
    );
}

function* fetchFacturasClientes(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/clientes/${action.payload.id}/mis-facturas/`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      console.log("****", response)
      if (response.status === 200) {
        const jsonResult = yield response.json();
        const {
          entities: { facturas },
          result,
        } = normalize(jsonResult, schemas.factura);
        yield put(
          actions.completeFetchingFacturasClientes(
            result,
            facturas,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingFacturasClientes(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failFetchingFacturasClientes('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchFetchFacturasClientes() {
  yield takeEvery(
    types.FACTURAS_CLIENTE_FETCH_STARTED,
    fetchFacturasClientes,
  );
}
  
function* addFactura(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/facturas/`,
          {
            method: 'POST',
            body: JSON.stringify({
              subtotalFactura: action.payload.subtotalFactura,
              ivaFactura: action.payload.ivaFactura,
              totalFactura: action.payload.totalFactura,
              idCliente: action.payload.idCliente,
              idTienda: action.payload.idTienda,
            }),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingFactura(
              action.payload.id,
              jsonResult,
            ),
          );
          yield put(
            actionsPedidos.startAddingPedido(
              uuidv4(),
              'pendiente',
              'efectivo',
              'pendiente',
              'domicilio',
              jsonResult['id'],
              action.payload.idCliente,
              action.payload.comprasById,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingFactura(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingFactura('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddFactura() {
    yield takeEvery(
      types.FACTURA_ADD_STARTED,
      addFactura,
    );
}
  