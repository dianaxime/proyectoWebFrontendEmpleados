import * as types from '../types/selectedPedido';

const selectedPedido = (state = null, action) => {
  switch (action.type) {
    case types.PEDIDO_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};

export default selectedPedido;

export const getSelectedPedido = state => state;
