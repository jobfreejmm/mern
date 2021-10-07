/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/AuthContext';

const RutaPrivada = ({ component: Component, ...props }) => {
  const context = React.useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando } = context;
  // console.log('...props', props);
  React.useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Route
      {...props}
      render={(props) => (!autenticado && !cargando ? (
        <Redirect to="/" />
      ) : (<Component {...props} />))}
    />
  );
};

export default RutaPrivada;
