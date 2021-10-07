/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContext from '../../context/alertas/AlertaContext';
import Proyecto from './Proyecto';

const Lista = () => {
  const context = React.useContext(ProyectoContext);

  const alertaContext = React.useContext(AlertaContext);
  const { proyectos, obtenerProyectos, mensaje } = context;
  const { alerta, mostrarAlerta } = alertaContext;

  // console.log('alcontext', alertaContext.alerta);
  //
  console.log('lista', proyectos);
  React.useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
  }, [mensaje]);

  return (
    <ul className="listado-proyectos">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
      {proyectos.length > 0 && proyectos
        ? (
          <TransitionGroup>
            {proyectos.map((proyecto) => (
              <CSSTransition
                key={proyecto._id}
                classNames="proyecto"
                timeout={200}
              >
                <Proyecto proyecto={proyecto} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )
        : <p>No hay proyectos</p>}
    </ul>
  );
};
export default Lista;
