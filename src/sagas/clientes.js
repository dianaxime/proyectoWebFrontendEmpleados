import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/clientes';
import * as types from '../types/clientes';
  
  
function* fetchCliente(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/usuarios/${usuario['user_id']}/cliente/`,
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
          yield put(
            actions.completeFetchingCliente(
              jsonResult[0]['idUsuario'],
              jsonResult[0],
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingCliente(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingCliente('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchClienteFetch() {
    yield takeEvery(
      types.CLIENTE_FETCH_STARTED,
      fetchCliente,
    );
}
  
function* addCliente(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/clientes/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingCliente(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingCliente(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingCliente('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddCliente() {
    yield takeEvery(
      types.CLIENTE_ADD_STARTED,
      addCliente,
    );
}
  
function* updateCliente(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        console.log(action.payload.direccionCliente, action.payload.telefonoCliente);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/clientes/${action.payload.id}/modificar-cliente/`,
          {
            method: 'PATCH',
            body: JSON.stringify({direccionCliente: action.payload.direccionCliente, telefonoCliente: action.payload.telefonoCliente}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          const jsonResult = yield response.json();
          yield put(actions.completeUpdatingCliente(
            action.payload.idUsuario,
            jsonResult,
          ));
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failUpdatingCliente(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failUpdatingCliente('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchUpdateCliente() {
    yield takeEvery(
      types.CLIENTE_UPDATE_STARTED,
      updateCliente,
    );
}