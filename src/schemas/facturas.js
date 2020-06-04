import { schema } from 'normalizr';

export const facturas = new schema.Entity(
  'facturas',
);
export const factura = new schema.Array(facturas);
