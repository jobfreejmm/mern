/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/Projects/Proyectos';
import RutaPrivada from './components/rutas/RutaPrivada';
import authToken from './config/authToken';
import AlertaState from './context/alertas/AlertaState';
import AuthState from './context/autenticacion/AuthState';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tarea/TareaState';
import TareaState2 from './context/tarea2/TareaState2';

// Revisamos si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  authToken(token);
}
function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TareaState2>
        <TareaState>
          <AlertaState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/">
                    <Login />
                  </Route>
                  <Route exact path="/nueva-cuenta">
                    <NuevaCuenta />
                  </Route>
                  <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        </TareaState>
      </TareaState2>

    </ProyectoState>
  );
}

export default App;
