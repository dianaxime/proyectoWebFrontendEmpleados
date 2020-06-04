import * as types from '../types/selectedProducto';


const selectedProducto = (state = null, action) => {
  switch (action.type) {
    case types.PRODUCTO_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};


export default selectedProducto;


export const getSelectedProducto = state => state;