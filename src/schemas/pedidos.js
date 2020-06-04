import { schema } from 'normalizr';

export const pedidos = new schema.Entity(
  'pedidos',
);

export const pedido = new schema.Array(pedidos);
