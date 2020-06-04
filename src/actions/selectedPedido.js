import * as types from '../types/selectedPedido';

export const selectPedido = index => ({
  type: types.PEDIDO_SELECTED,
  payload: index,
});
