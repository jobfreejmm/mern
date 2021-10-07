/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';
import uuid from 'uuid';
import ProyectoContext from './ProyectoContext';
import { reducer } from './proyectoReducer';
import {
  FORMULARIO_PROYECTO,
  MOSTRAR_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from '../../types/index';
import clienteAxios from '../../config/axios';

const ProyectoState = ({ children }) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null,
  };
  // dispatch para ejecutar las acciones
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // serie de funciones para el crud
  const mostarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  // OBTENER LOS PROYECTOS
  const obtenerProyectos = async () => {
    try {
      const response = await clienteAxios.get('/api/proyectos/');
      // console.log(response);
      dispatch({
        type: MOSTRAR_PROYECTOS,
        payload: response.data.proyectos,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'HA OCURRIDO UN ERROR',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  // AGREGAR PROYECTO
  const agregarProyecto = async (proyecto) => {
    try {
      const response = await clienteAxios.post('/api/proyectos', proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: response.data.proyecto,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'HA OCURRIDO UN ERROR',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  // VALIDAR FORMULARIO
  const validarFormulario = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };
  // Selecciona el proyecto actual que selecciona el usuario
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };
  // ELIMINAR PROYECTO
  const eliminarProyecto = async (idProyect) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${idProyect}`);
      // console.log('response', response);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: idProyect,
      });
    } catch (error) {
      console.log(error);
      const alerta = {
        msg: 'HA OCURRIDO UN ERROR',
        categoria: 'alerta-error',
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  // retornamos el contexts
  return (
    <ProyectoContext.Provider value={{
      formulario: state.formulario,
      proyectos: state.proyectos,
      errorFormulario: state.errorFormulario,
      proyecto: state.proyecto,
      mensaje: state.mensaje,
      mostarFormulario,
      obtenerProyectos,
      agregarProyecto,
      validarFormulario,
      proyectoActual,
      eliminarProyecto,

    }}
    >
      {children}
    </ProyectoContext.Provider>
  );
};
export default ProyectoState;
