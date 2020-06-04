import { schema } from 'normalizr';

export const listas = new schema.Entity(
  'listas',
);
export const lista = new schema.Array(listas);
