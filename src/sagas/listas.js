import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/listas';
import * as types from '../types/listas';
import * as schemas from '../schemas/listas';
import moment from 'moment';    
  
function* fetchListas(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/listas/`,
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
            entities: { listas },
            result,
          } = normalize(jsonResult, schemas.lista);
          yield put(
            actions.completeFetchingListas(
              result,
              listas,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingListas(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingListas('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchFetchListas() {
    yield takeEvery(
      types.LISTAS_FETCH_STARTED,
      fetchListas,
    );
}
  
function* addLista(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/listas/`,
          {
            method: 'POST',
            body: JSON.stringify({
              fechaLista: moment().format('YYYY-MM-DD'),
              cantidadLista: action.payload.cantidadLista,
              turnoLista: action.payload.turnoLista,
              idProducto: action.payload.idProducto,
              idEncargado: action.payload.idEncargado,
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
            actions.completeAddingLista(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingLista(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingLista('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddLista() {
    yield takeEvery(
      types.LISTA_ADD_STARTED,
      addLista,
    );
}

function* decreaseLista(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/listas/${action.payload.id}/disminuir-producto/`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            cantidad: action.payload.cantidad,
          }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeDecreasingLista(
            action.payload.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failDecreasingLista(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failDecreasingLista('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchDecreaseLista() {
  yield takeEvery(
    types.LISTA_DECREASE_STARTED,
    decreaseLista,
  );
}

function* increaseLista(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/listas/${action.payload.id}/aumentar-producto/`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            cantidad: action.payload.cantidad,
          }),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeIncreasingLista(
            action.payload.id,
            jsonResult,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failIncreasingLista(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failIncreasingLista('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchIncreaseLista() {
  yield takeEvery(
    types.LISTA_INCREASE_STARTED,
    increaseLista,
  );
}
 