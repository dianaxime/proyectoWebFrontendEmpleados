import * as types from '../types/selectedPuntuacion';

export const selectPuntuacion = index => ({
  type: types.PUNTUACION_SELECTED,
  payload: index,
});