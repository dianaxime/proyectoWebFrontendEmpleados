import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    //delay,
    select,
} from 'redux-saga/effects';
  
import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/ofertas';
import * as types from '../types/ofertas';
  
function* addOferta(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/ofertas/`,
          {
            method: 'POST',
            body: JSON.stringify({
              descripcionOferta: action.payload.descripcionOferta,
              descuentoOferta: action.payload.descuentoOferta,
              venceOferta: action.payload.venceOferta,
              idProducto: action.payload.idProducto,
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
            actions.completeAddingOferta(
              action.payload.id,
              jsonResult,
            ),
          );
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failAddingOferta(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingOferta('Falló horrible la conexión mano'));
      console.log("ERROR", error)
    }
}
  
export function* watchAddOferta() {
    yield takeEvery(
      types.OFERTA_ADD_STARTED,
      addOferta,
    );
}
