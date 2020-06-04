import { schema } from 'normalizr';


export const compras = new schema.Entity(
  'compras',
);
export const compra = new schema.Array(compras);