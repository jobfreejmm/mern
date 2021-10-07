/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

function NuevoProyecto() {
  const context = React.useContext(ProyectoContext);
  const {
    formulario,
    mostarFormulario,
    agregarProyecto,
    errorFormulario,
    validarFormulario,
  } = context;
  // console.log(formulario);
  // state para guardar lodel fromulario
  const [proyecto, setProyecto] = React.useState({
    nombre: '',
  });

  // funcion para guardar los datos del formulario
  const onChange = (e) => {
    e.preventDefault();
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,

    });
  };
  // funcion para ocultar el form
  const { nombre } = proyecto;
  // funcion apara agregar nuevo proyecto al estado
  const onSubmit = (e) => {
    e.preventDefault();
    // validar el proyecto
    if (nombre.trim() === '') {
      validarFormulario();
      return;
    }
    // Agregar el state
    agregarProyecto(proyecto);
    // Reiniciar el form
    setProyecto({
      nombre: '',
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostarFormulario()}
      >
        Nuevo proyecto
      </button>

      {!formulario ? null : (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del proyecto"
            name="nombre"
            onChange={onChange}
            value={nombre}
          />
          <input
            type="submit"
            value="Agregar proyecto"
            className="btn btn-block btn-primario"
          />

        </form>
      )}
      {errorFormulario ? (<p className="mensaje error">  El nombre del proyecto es obligatorio</p>) : null}
    </>
  );
}

export default NuevoProyecto;
