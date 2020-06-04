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
  import * as actions from '../actions/valoraciones';
  import * as types from '../types/valoraciones';
  import * as schemas from '../schemas/valoraciones';
  
  
  function* fetchComentarios(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/empleados/${action.payload.id['id']}/mis-comentarios/`,
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
          console.log(jsonResult);
          const {
            entities: { valoraciones },
            result,
          } = normalize(jsonResult, schemas.valoracion);
          yield put(
            actions.completeFetchingComentarios(
              valoraciones,
              result,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingComentarios(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingComentarios('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchFetchComentarios() {
    yield takeEvery(
      types.COMENTARIOS_FETCH_STARTED,
      fetchComentarios,
    );
  }
  
  function* addValoracion(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/valoraciones/`,
          {
            method: 'POST',
            body: JSON.stringify({
              comentarioValoracion : action.payload.comentarioValoracion,
              puntuacionValoracion : action.payload.puntuacionValoracion,
              idCliente : action.payload.idCliente,
              idEmpleado : action.payload.idEmpleado,
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
            actions.completeAddingValoracion(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingValoracion(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingValoracion('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchAddValoracion() {
    yield takeEvery(
      types.VALORACION_ADD_STARTED,
      addValoracion,
    );
  }
  
  function* fetchPuntuacion(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/empleados/${action.payload.id['id']}/mi-puntuacion/`,
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
          yield put(actions.completeFetchingPuntuacion(jsonResult['puntuacion']));
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingPuntuacion(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failFetchingPuntuacion('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
  }
  
  export function* watchfetchPuntuacion() {
    yield takeEvery(
      types.PUNTUACION_FETCH_STARTED,
      fetchPuntuacion,
    );
  }