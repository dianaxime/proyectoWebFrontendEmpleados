import * as types from '../types/selectedProducto';


export const selectProducto = index => ({
  type: types.PRODUCTO_SELECTED,
  payload: index,
});