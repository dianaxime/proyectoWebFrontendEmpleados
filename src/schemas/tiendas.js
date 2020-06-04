import { schema } from 'normalizr';

export const tiendas = new schema.Entity(
  'tiendas',
);

export const tienda = new schema.Array(tiendas);
