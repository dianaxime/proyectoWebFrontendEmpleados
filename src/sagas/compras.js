import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/compras';
import * as actionsFacturas from '../actions/facturas';
import * as types from '../types/compras';
import * as schemas from '../schemas/compras';
import { v4 as uuidv4 } from 'uuid';
  
function* fetchCompras(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/clientes/${action.payload.cliente}/mis-compras/`,
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
            entities: { compras },
            result,
          } = normalize(jsonResult, schemas.compra);
          yield put(
            actions.completeFetchingCompras(
              result,
              compras,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingCompras(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingCompras('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchCompras() {
    yield takeEvery(
      types.COMPRAS_FETCH_STARTED,
      fetchCompras,
    );
}
  
function* addCompra(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/compras/`,
          {
            method: 'POST',
            body: JSON.stringify({cantidadCompra: action.payload.cantidadCompra,
            estadoCompra: action.payload.estadoCompra,
            subtotalCompra: parseFloat(action.payload.subtotalCompra),
            descuentoCompra: parseFloat(action.payload.descuentoCompra),
            idProducto: action.payload.idProducto,
            idCliente: action.payload.idCliente}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingCompra(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingCompra(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingCompra('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddCompra() {
    yield takeEvery(
      types.COMPRA_ADD_STARTED,
      addCompra,
    );
}
  
function* expireCompra(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/compras/${action.payload.id}/expirado/`,
        {
          method: 'PATCH',
          //body: JSON.stringify({}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(
          actions.completeExpiringCompra(action.payload.id),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failExpiringCompra(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failExpiringCompra('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchExpireCompra() {
  yield takeEvery(
    types.COMPRA_EXPIRE_STARTED,
    expireCompra,
  );
}

function* endCompras(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/compras/completado/`,
        {
          method: 'PATCH',
          body: JSON.stringify({idCliente: action.payload.cliente}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(
          actions.completeEndingCompras(),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failEndingCompras(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failEndingCompras('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchEndCompras() {
  yield takeEvery(
    types.COMPRAS_END_STARTED,
    endCompras,
  );
}

function* putCompras(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/compras/total/`,
        {
          method: 'PATCH',
          body: JSON.stringify({idCliente: action.payload.cliente['id']}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        const jsonResult = yield response.json();
        console.log(jsonResult);
        yield put(
          actions.completePutingCompras(),
        );
        yield put(
          actionsFacturas.startAddingFactura(
            uuidv4(), 
            jsonResult['subtotal'], 
            jsonResult['iva'], 
            jsonResult['total'], 
            action.payload.tienda, 
            action.payload.cliente['id'], 
            action.payload.comprasById
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failPutingCompras(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failPutingCompras('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchPutCompras() {
  yield takeEvery(
    types.COMPRAS_PUT_STARTED,
    putCompras,
  );
}
