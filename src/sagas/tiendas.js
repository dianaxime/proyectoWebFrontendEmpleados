import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/tiendas';
import * as types from '../types/tiendas';
import * as schemas from '../schemas/tiendas';  
  
function* fetchTiendas(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/tiendas/`,
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
            entities: { tiendas },
            result,
          } = normalize(jsonResult, schemas.tienda);
          yield put(
            actions.completeFetchingTiendas(
              result,
              tiendas,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingTiendas(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingTiendas('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchTiendas() {
    yield takeEvery(
      types.TIENDAS_FETCH_STARTED,
      fetchTiendas,
    );
}
  
function* addTienda(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/tiendas/`,
          {
            method: 'POST',
            body: JSON.stringify({
              nombreTienda: action.payload.nombreTienda,
              ubicacionTienda: action.payload.ubicacionTienda,
              telefonoTienda: action.payload.telefonoTienda,
              faxTienda: action.payload.faxTienda,
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
            actions.completeAddingTienda(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingTienda(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingTienda('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddTienda() {
    yield takeEvery(
      types.TIENDA_ADD_STARTED,
      addTienda,
    );
}
  
function* updateTienda(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/tiendas/${action.payload.id}/modificar-tienda/`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              direccion: action.payload.ubicacionTienda,
              telefono: action.payload.telefonoTienda,
              fax: action.payload.faxTienda,
            }),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
            const jsonResult = yield response.json();
          yield put(actions.completeUpdatingTienda(
            action.payload.id,
            jsonResult,
          ));
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failUpdatingTienda(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failUpdatingTienda('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchUpdateTienda() {
    yield takeEvery(
      types.TIENDA_UPDATE_STARTED,
      updateTienda,
    );
}