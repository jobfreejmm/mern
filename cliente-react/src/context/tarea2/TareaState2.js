/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';
import TareaContext2 from './TareaContext2';
import { reducer } from './tareaReducer2';
import {
  AGREGAR_TAREAS,
  ELIMINAR_TAREA,
  TAREAS_PROYECTO,
} from '../../types/index';

const TareaState2 = ({ children }) => {
  const initialState = {
    tareas: [
      {
        id: 1, nombre: 'crear tienda 2', estado: true, proyectoId: 1,
      },
      {
        id: 2, nombre: 'Elegir plataforma', estado: false, proyectoId: 2,
      },
      {
        id: 3, nombre: 'tarea 1', estado: true, proyectoId: 3,
      },
      {
        id: 4, nombre: 'tarea 2', estado: false, proyectoId: 3,
      },
    ],
    tareasProyectos: null,
  };
  // dispatch para ejecutar las acciones
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // serie de funciones para el crud
  const obtenerTareas2 = (id) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: id,
    });
  };
  const eliminarTarea2 = (idProyect) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: idProyect,
    });
  };
  const agregarTareas2 = (tarea) => {
    dispatch({
      type: AGREGAR_TAREAS,
      payload: tarea,
    });
  };

  // retornamos el contexts
  return (
    <TareaContext2.Provider value={{
      tareas: state.tareas,
      tareasProyectos: state.tareasProyectos,
      obtenerTareas2,
      eliminarTarea2,
      agregarTareas2,
    }}
    >
      {children}
    </TareaContext2.Provider>
  );
};
export default TareaState2;
