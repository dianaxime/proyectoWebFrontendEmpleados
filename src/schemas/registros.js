import { schema } from 'normalizr';

export const registros = new schema.Entity(
  'registros',
);

export const registro = new schema.Array(registros);
