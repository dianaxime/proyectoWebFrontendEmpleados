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
import * as actions from '../actions/empleados';
import * as types from '../types/empleados';
  
  
function* fetchEmpleado(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/usuarios/${usuario['user_id']}/empleado/`,
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
            actions.completeFetchingEmpleado(
              jsonResult[0]['idUsuario'],
              jsonResult[0],
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingEmpleado(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingEmpleado('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchEmpleadoFetch() {
    yield takeEvery(
      types.EMPLEADO_FETCH_STARTED,
      fetchEmpleado,
    );
}
  
function* addEmpleado(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/empleados/`,
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
            actions.completeAddingEmpleado(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingEmpleado(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingEmpleado('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddEmpleado() {
    yield takeEvery(
      types.EMPLEADO_ADD_STARTED,
      addEmpleado,
    );
}
  
function* updateEmpleado(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/empleados/${action.payload.id}/modificar-empleado/`,
          {
            method: 'PATCH',
            body: JSON.stringify({direccion: action.payload.direccionEmpleado, telefono: action.payload.telefonoEmpleado}),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
            const jsonResult = yield response.json();
          yield put(actions.completeUpdatingEmpleado(
            action.payload.idUsuario,
            jsonResult,
          ));
        } else {
          const { non_field_errors } = yield response.json();
          console.log(non_field_errors);
          yield put(actions.failUpdatingEmpleado(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failUpdatingEmpleado('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchUpdateEmpleado() {
    yield takeEvery(
      types.EMPLEADO_UPDATE_STARTED,
      updateEmpleado,
    );
}