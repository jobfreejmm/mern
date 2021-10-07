/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
  AGREGAR_TAREAS,
  TAREAS_PROYECTO,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from '../../types/index';

export const reducer = (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyectos: action.payload,
      };
    case AGREGAR_TAREAS:
      return {
        ...state,
        tareasProyectos: [action.payload, ...state.tareasProyectos],
        errorTarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        // tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
        tareasProyectos: state.tareasProyectos.filter((tarea) => tarea._id !== action.payload),
      };
    case ESTADO_TAREA:
      return {
        ...state,
        tareasProyectos: state.tareasProyectos.map((tarea) => (tarea.id === action.payload.id ? action.payload : tarea)),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload,
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasProyectos: state.tareasProyectos.map((tarea) => (tarea._id === action.payload._id ? action.payload : tarea)),
        // tareaSeleccionada: null,

      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null,
      };

    default:
      return state;
  }
};
