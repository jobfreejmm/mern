/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React from 'react';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';
import AlertaContext from './AlertaContext';
import reducer from './AlertaReducer';

const AlertaState = ({ children }) => {
  const initialState = {
    alerta: null,
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // Mostrar alerta
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg, categoria,
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <AlertaContext.Provider value={{
      alerta: state.alerta,
      mostrarAlerta,
    }}
    >
      {children}
    </AlertaContext.Provider>
  );
};

export default AlertaState;
