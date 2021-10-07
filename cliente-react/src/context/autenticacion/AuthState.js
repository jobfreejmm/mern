/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AuthContext from './AuthContext';
import reducer from './authReducer';
import {
  LOGIN_CORRECTO,
  LOGIN_ERROR,
  LOGOUT,
  OBTENER_USUARIO,
  REGISTRO_CORRECTO,
  REGISTRO_ERROR,
} from '../../types/index';
import clienteAxios from '../../config/axios';
import authToken from '../../config/authToken';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    id: null,
    mensaje: null,
    cargando: true,
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // registrar usuario
  const registarUsuario = async (datos) => {
    try {
      const response = await clienteAxios.post('/api/usuarios', datos);
      console.log(response.data);
      dispatch({
        type: REGISTRO_CORRECTO,
        payload: response.data,
      });
      // obtener eL usaurio
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response);

      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error',
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };
  // retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    // console.log('token', token);
    if (token) {
      // funcion para enviar  el token por headers
      authToken(token);
    }
    try {
      const response = await clienteAxios.get('/api/auth');
      dispatch({
        type: OBTENER_USUARIO,
        payload: response.data.usuario,

      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // Funcion para iniciar sesion
  const iniciarSesion = async (datos) => {
    try {
      const response = await clienteAxios.post('/api/auth', datos);
      // console.log(response.data);
      dispatch({
        type: LOGIN_CORRECTO,
        payload: response.data,
      });
      usuarioAutenticado();
    } catch (error) {
      // console.log(error.response);

      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error',
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };
  // Funcion para cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{
      token: state.token,
      autenticado: state.autenticado,
      usuario: state.usuario,
      mensaje: state.mensaje,
      cargando: state.cargando,
      registarUsuario,
      iniciarSesion,
      usuarioAutenticado,
      cerrarSesion,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
