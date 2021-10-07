/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import AuthContext from '../../context/autenticacion/AuthContext';
import Barra from '../Layout/Barra';
import Sidebar from '../Layout/Sidebar';
import FormTarea from '../Tasks/FormTarea';
import ListaTareas from '../Tasks/ListaTareas';

const Proyectos = () => {
  const authContext = React.useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  React.useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListaTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
