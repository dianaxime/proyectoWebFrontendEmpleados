import * as types from '../types/ofertas';

export const startAddingOferta = (id, descripcionOferta, descuentoOferta, venceOferta, idProducto) => ({
    type: types.OFERTA_ADD_STARTED,
    payload: {
      id,
      descripcionOferta,
      descuentoOferta,
      venceOferta,
      idProducto,
    },
});

export const completeAddingOferta = (oldId, oferta) => ({
    type: types.OFERTA_ADD_COMPLETED,
    payload: {
      oldId,
      oferta,
    },
});

export const failAddingOferta = error => ({
    type: types.OFERTA_ADD_FAILED,
    payload: {
      error,
    },
});
