import * as types from '../types/selectedCompra';


export const selectCompra = index => ({
  type: types.COMPRA_SELECTED,
  payload: index,
});