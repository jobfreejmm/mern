/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import uuid from 'uuid';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tarea/TareaContext';

const FormTarea = () => {
  // state para guardar el formualrio
  const [tarea, setTarea] = React.useState({
    nombre: '',
  });
  const context = React.useContext(ProyectoContext);
  const contextTarea = React.useContext(TareaContext);
  const { proyecto } = context;
  const {
    tareaSeleccionada,
    agregarTareas,
    validarTareas,
    errorTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = contextTarea;
    // effect que detecta una tarea seleccionada
  React.useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: '',
      });
    }
  }, [tareaSeleccionada]);
  // si  no extiste
  if (!proyecto) return null;
  // dob Proyecto actual
  const [proyectActual] = proyecto;
  // console.log('proyecto actual', proyectActual);
  const { nombre } = tarea;
  // funcion para aagregar una tarea
  const onSubmit = (e) => {
    e.preventDefault();
    // validar
    if (nombre.trim() === '') {
      validarTareas();
      return;
    }
    if (tareaSeleccionada === null) {
      // pasar la validacion
      tarea.proyecto = proyectActual._id;
      // agregar la tarea al  state de tareasProyectos
      agregarTareas(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTarea();
    }
    obtenerTareas(proyectActual._id);

    // reiniciar el form
    setTarea({ nombre: '' });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>

        <div className="contenedor-input">
          <input
            value={nombre}
            name="nombre"
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            onChange={(e) => setTarea({
              ...tarea,
              [e.target.name]: e.target.value,
            })}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? 'Editar Tarea' : ' Agregar Tarea'}
          />
        </div>
      </form>
      {errorTarea ? (<p className="mensaje error">El nombre  de la tarea es obligatorio</p>) : null}
    </div>
  );
};
export default FormTarea;
