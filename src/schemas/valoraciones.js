import { schema } from 'normalizr';


export const valoraciones = new schema.Entity(
  'valoraciones',
);
export const valoracion = new schema.Array(valoraciones);