/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = () => {
  const alertaContext = React.useContext(AlertaContext);
  const authContext = React.useContext(AuthContext);
  // console.log('history', useHistory);
  //
  const history = useHistory();
  //
  const { alerta, mostrarAlerta } = alertaContext;
  //
  const { registarUsuario, mensaje, autenticado } = authContext;

  // EN CASO DE QUE EL USAURIO YA SE HAYA REGISTRADO O AUTENTICADO  O SEA UN REGISTRO
  React.useEffect(() => {
    if (autenticado) {
      history.push('/proyectos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, history]);

  const [usuario, setUsuario] = React.useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: '',
  });
  //
  const {
    nombre, email, password, confirmar,
  } = usuario;
  // Funcion para guardar los datos del form
  const onChange = (e) => {
    e.preventDefault();
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // validar que no haya campos vacios
    if (nombre.trim() === '' || email.trim() === ''
    || password.trim() === '' || confirmar.trim() === '') {
      mostrarAlerta('Todos los campos son obliatorios', 'alerta-error');
      return;
    }
    // password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta('La contraseña debe se minimo de 6 caracteres', 'alerta-error');
      return;
    }
    // los dos paswords son iguales
    if (password !== confirmar) {
      mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
      return;
    }
    // pasarlo al action
    registarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>
          {alerta.msg}
        </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre"> Nombre</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          {/* Email */}
          <div className="campo-form">
            <label htmlFor="email"> Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="exmple@email.com"
              value={email}
              onChange={onChange}
            />
          </div>
          {/* Password */}
          <div className="campo-form">
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              name="password"
              id="email"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          {/* Confirmar */}
          <div className="campo-form">
            <label htmlFor="password"> Confirmar Password</label>
            <input
              type="password"
              name="confirmar"
              id="confirmar"
              placeholder="Confirmar Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Registrarse" />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Ingresar
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
