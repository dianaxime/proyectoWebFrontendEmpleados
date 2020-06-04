import * as types from '../types/selectedTienda';

export const selectTienda = index => ({
  type: types.TIENDA_SELECTED,
  payload: index,
});
