import { schema } from 'normalizr';


export const productos = new schema.Entity(
  'productos',
);
export const producto = new schema.Array(productos);