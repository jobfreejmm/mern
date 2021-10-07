/* eslint-disable import/prefer-default-export */
import {

  TAREAS_PROYECTO,
  ELIMINAR_TAREA,
  AGREGAR_TAREAS,
} from '../../types/index';

export const reducer = (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyectos: state.tareas.filter((pro) => pro.proyectoId === action.payload),

      };
    case AGREGAR_TAREAS:
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errorTarea: false,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((pro) => pro.id !== action.payload),
      };
    default:
      return state;
  }
};
