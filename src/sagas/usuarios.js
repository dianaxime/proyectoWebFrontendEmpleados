import jwtDecode from 'jwt-decode';
import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';
  
import * as selectors from '../reducers';
import * as actions from '../actions/usuarios';
import * as types from '../types/usuarios';
import * as actionsClientes from '../actions/clientes';
import * as actionsEmpleados from '../actions/empleados';
  
import { API_BASE_URL } from '../settings';

function* fetchUsuarioStarted() {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const usuario = jwtDecode(token);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/usuarios/${usuario['user_id']}/mi-tipo/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
            const { tipo } = yield response.json();
            yield put(actions.completeFetchingUsuario(tipo));
            tipo === 'Cliente' ? (
              yield put(actionsClientes.startFetchingCliente())
            ) : (
              yield put(actionsEmpleados.startFetchingEmpleado())
            )
        } else {
            const { non_field_errors } = yield response.json();
            yield put(actions.failFetchingUsuario(non_field_errors[0]));
        }
      }
    } catch (error) {
        yield put(actions.failFetchingUsuario('Falló horrible la conexión mano')); 
    }
}

export function* watchFetchUsuarioStarted() {
    yield takeEvery(
      types.USUARIO_FETCH_STARTED,
      fetchUsuarioStarted,
    );
}