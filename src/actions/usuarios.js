import * as types from '../types/usuarios';

export const startFetchingUsuario = () => ({
    type: types.USUARIO_FETCH_STARTED,
});
export const completeFetchingUsuario = usuario => ({
    type: types.USUARIO_FETCH_COMPLETED,
    payload: {
      usuario,
    },
});
export const failFetchingUsuario = error => ({
    type: types.USUARIO_FETCH_FAILED,
    payload: {
      error,
    },
});