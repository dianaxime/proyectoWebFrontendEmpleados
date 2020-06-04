import * as types from '../types/selectedCompra';


const selectedCompra = (state = null, action) => {
  switch (action.type) {
    case types.COMPRA_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};


export default selectedCompra;


export const getSelectedCompra = state => state;