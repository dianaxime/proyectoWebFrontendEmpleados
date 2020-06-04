import * as types from '../types/selectedPuntuacion';

const selectedPuntuacion = (state = null, action) => {
  switch (action.type) {
    case types.PUNTUACION_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};

export default selectedPuntuacion;

export const getSelectedPuntuacion = state => state;
