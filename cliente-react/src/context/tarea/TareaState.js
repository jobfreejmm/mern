/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import TareaContext from './TareaContext';
import { reducer } from './TareaReducer';
import {
  ACTUALIZAR_TAREA,
  AGREGAR_TAREAS,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREAS_PROYECTO,
  TAREA_ACTUAL,
  VALIDAR_TAREA,
  LIMPIAR_TAREA,
  MOSTRAR_PROYECTOS,
} from '../../types/index';
import clienteAxios from '../../config/axios';

const TareaState = ({ children }) => {
  //
  const initialState = {
    tareasProyectos: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };
  //
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // OBTENER TAREAS
  const obtenerTareas = async (proyecto) => {
    console.log('proyectoid', proyecto);
    try {
      const response = await clienteAxios.get('/api/tareas', { params: { proyecto } });
      console.log(response.data.tareas);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: response.data.tareas,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // AGREGAR TAREAS
  const agregarTareas = async (tarea) => {
    try {
      const response = await clienteAxios.post('/api/tareas', tarea);
      console.log(response);
      dispatch({
        type: AGREGAR_TAREAS,
        payload: response.tarea,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // validar tarea
  const validarTareas = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  // Eliminar Tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      const response = await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      console.log(response);
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  //  Extraer una tarea para edicion;
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };
  // FUNCION PARA ACTULIZAR LA TAREA
  const actualizarTarea = async (tarea) => {
    // console.log('state', tarea);
    try {
      const response = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log(response.data.tarea);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: response.data.tarea,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  // FUNCION PARA LIMPIAR LA TAREA
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyectos: state.tareasProyectos,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        validarTareas,
        agregarTareas,
        eliminarTarea,
        actualizarTarea,
        limpiarTarea,
        guardarTareaActual,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export default TareaState;
