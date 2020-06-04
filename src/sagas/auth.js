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
  import * as actions from '../actions/auth';
  import * as actionsUsuarios from '../actions/usuarios';
  import * as types from '../types/auth';
  
  import { API_BASE_URL } from '../settings';
  
  function* register(action) {
    try {
      console.log(action.payload);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/usuarios/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
      if (response.status === 201) {
        yield put(actions.completeRegister());
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failRegister(non_field_errors[0]));
      }
    } catch (error) {
      yield put(actions.failRegister('Falló horrible la conexión mano'));
    }
  }

  export function* watchRegisterStarted() {
    yield takeEvery(
      types.REGISTER_STARTED,
      register,
    );
  }
  
  function* login(action) {
    try {
      const {username, password} = action.payload;
      const response = yield call(
        fetch,
        `${API_BASE_URL}/token-auth/`,
        {
          method: 'POST',
          body: JSON.stringify({email: username, password: password}),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );
  
      if (response.status === 200) {
        const { token } = yield response.json();
        yield put(actions.completeLogin(token));
        yield put(actionsUsuarios.startFetchingUsuario());
      } else {
        const { non_field_errors } = yield response.json();
        console.log(non_field_errors);
        yield put(actions.failLogin(non_field_errors[0]));
      }
    } catch (error) {
      yield put(actions.failLogin('Falló horrible la conexión mano'));
      console.log(error);
    }
  }
  
  export function* watchLoginStarted() {
    yield takeEvery(
      types.AUTHENTICATION_STARTED,
      login,
    );
  }
  
  function* refreshToken(action) {
    const expiration = yield select(selectors.getAuthExpiration);
    const now =  parseInt(new Date().getTime() / 1000);
    if (expiration - now < 300) {
      try {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/token-refresh/`,
          {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers:{
              'Content-Type': 'application/json',
            },
          },
        );
  
        if (response.status === 200) {
          const jResponse = yield response.json();
          yield put(actions.completeTokenRefresh(jResponse.token));
        } else {
          // TODO: poner un redirect al home (login)
          const { non_field_errors } = yield response.json();
          console.log(non_field_errors);
          yield put(actions.failTokenRefresh(non_field_errors[0]));
        }
      } catch (error) {
        // TODO: poner un redirect al home (login)
        yield put(actions.failTokenRefresh('Falló horrible la conexión mano'));
      }
    }
  }
  
export function* watchRefreshTokenStarted() {
  yield takeEvery(
    types.TOKEN_REFRESH_STARTED,
    refreshToken,
  );
}