/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tarea/TareaContext';

const Proyecto = ({ proyecto }) => {
  const proyectContext = React.useContext(ProyectoContext);
  const tareasContext = React.useContext(TareaContext);

  const { proyectoActual } = proyectContext;
  const { obtenerTareas } = tareasContext;
  // console.log('proyecto', proyecto._id);
  // funcion para seleccionar el proyecto actual
  const onClick = (id) => {
    proyectoActual(id);// Fijar un proyecto
    obtenerTareas(id); // mostar tareas filtrando
    // proyectoActual(proyecto);
  };

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={() => onClick(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
