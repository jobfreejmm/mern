/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tarea/TareaContext';

const Tarea = ({ tarea }) => {
  const proyectoContext = React.useContext(ProyectoContext);
  const tareaContext = React.useContext(TareaContext);
  //
  if (!tarea) return null;
  const {
    eliminarTarea,
    obtenerTareas,
    guardarTareaActual,
    actualizarTarea,
  } = tareaContext;
  // console.log(tarea);
  // extraemos el proyecto
  const { proyecto } = proyectoContext;
  // extraemos el proyecto actual
  const [proyectoActual] = proyecto;
  // Funcion para eliminar tarea
  const tareaEliminar = (id) => {
    // eliminarTarea(id);
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual._id);
    // obtenerTareas(proyectoActual.id);
  };
  // Funcion para cambbiar el estado
  const cambiarEstadoTarea = (t) => {
    if (t.estado) {
      t.estado = false;
    } else {
      t.estado = true;
    }
    actualizarTarea(t);
  };
  // Funcion para guardar la tarea seleccionada,
  const guardarTarea = (t) => {
    guardarTareaActual(t);
  };
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={() => cambiarEstadoTarea(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={() => cambiarEstadoTarea(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={() => guardarTarea(tarea)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
