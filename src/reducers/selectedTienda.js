import * as types from '../types/selectedTienda';


const selectedTienda = (state = null, action) => {
  switch (action.type) {
    case types.TIENDA_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};


export default selectedTienda;


export const getSelectedTienda = state => state;