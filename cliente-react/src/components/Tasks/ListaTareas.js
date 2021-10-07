/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tarea/TareaContext';
import Tarea from './Tarea';

function ListaTareas() {
  const contextProyecto = React.useContext(ProyectoContext);
  const tareaContext = React.useContext(TareaContext);
  const { proyecto, eliminarProyecto } = contextProyecto;
  const { tareasProyectos } = tareaContext;
  //
  if (proyecto === null) return (<h2>Selecciona un proyecto</h2>);
  // if (tareasProyectos.length === 0) return (<h2>No hay tareas</h2>);

  const [proyectoActual] = proyecto;
  // console.log('proyectoactual', proyectoActual);
  // funcion para eliminar el proyecto
  const onClick = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <>
      <h2>
        Proyecto:
        {' '}
        {proyectoActual.nombre}
      </h2>
      {proyectoActual ? (
        <>
          <ul className="listado-tareas">
            {tareasProyectos && tareasProyectos.length > 0

              ? (
                <TransitionGroup>
                  {tareasProyectos.map((tarea) => (
                    <CSSTransition
                      key={proyecto.id}
                      classNames="proyecto"
                      timeout={200}
                    >
                      <Tarea
                        tarea={tarea}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )

              : (<li className="tarea">No hay tareas</li>)}
          </ul>
          <button
            type="button"
            className="btn btn-eliminar"
            onClick={onClick}
          >
            Eliminar proyecto &times;
          </button>
        </>
      ) : null }
    </>
  );
}

export default ListaTareas;
