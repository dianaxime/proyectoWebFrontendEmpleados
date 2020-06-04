import * as types from '../types/empleados';


export const startFetchingEmpleado = () => ({
  type: types.EMPLEADO_FETCH_STARTED,
});
export const completeFetchingEmpleado = (id, empleado) => ({
  type: types.EMPLEADO_FETCH_COMPLETED,
  payload: {
    id,
    empleado,
  },
});
export const failFetchingEmpleado = error => ({
  type: types.EMPLEADO_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingEmpleado = (id, nombreEmpleado, telefonoEmpleado, direccionEmpleado, puestoEmpleado, idUsuario) => ({
  type: types.EMPLEADO_ADD_STARTED,
  payload: {
    id,
    nombreEmpleado,
    telefonoEmpleado,
    direccionEmpleado,
    puestoEmpleado,
    idUsuario,
  },
});
export const completeAddingEmpleado = (oldId, empleado) => ({
  type: types.EMPLEADO_ADD_COMPLETED,
  payload: {
    oldId,
    empleado,
  },
});
export const failAddingEmpleado = (oldId, error) => ({
  type: types.EMPLEADO_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startUpdatingEmpleado = (id, direccionEmpleado, telefonoEmpleado, idUsuario) => ({
  type: types.EMPLEADO_UPDATE_STARTED,
  payload: {
    id,
    direccionEmpleado,
    telefonoEmpleado,
    idUsuario,
  },
});
export const completeUpdatingEmpleado = (id, empleado) => ({
  type: types.EMPLEADO_UPDATE_COMPLETED,
  payload: {
    id,
    empleado,
  },
});
export const failUpdatingEmpleado = (id, error) => ({
  type: types.EMPLEADO_UPDATE_FAILED,
  payload: {
    id,
    error,
  },
});