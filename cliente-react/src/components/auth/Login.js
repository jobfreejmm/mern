/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const Login = (props) => {
  const authContext = React.useContext(AuthContext);
  const alertContext = React.useContext(AlertaContext);
  // console.log(alertContext);
  const history = useHistory();
  //
  const { iniciarSesion, autenticado, mensaje } = authContext;
  //
  const { alerta, mostrarAlerta } = alertContext;
  //
  const [usuario, setUsuario] = React.useState({
    email: '',
    password: '',
  });
  //
  const { email, password } = usuario;
  //
  React.useEffect(() => {
    if (autenticado) {
      history.push('/proyectos');
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [autenticado, mensaje, history]);
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
    // validamos el formulario
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son Obligatorios', 'alerta-error');
      return;
    }
    // pasamos al state
    iniciarSesion({
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={onSubmit}>
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
          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesion" />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
