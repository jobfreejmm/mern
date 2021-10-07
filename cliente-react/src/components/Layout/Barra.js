/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';

function Barra() {
  const authContext = React.useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
  // console.log(Object.values(usuario).length);
  React.useEffect(() => {
    usuarioAutenticado();
  }, []);

  // funcion para cerrar sesion
  const onClick = (e) => {
    e.preventDefault();
    cerrarSesion();
  };
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola
        {' '}
        {usuario ? <span>{usuario.nombre}</span> : null}
      </p>
      <nav className="nav-principal">
        <button
          type="button"
          className="btn btn-blank cerrar-sesion"
          onClick={onClick}
        >
          {' '}
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
}

export default Barra;
