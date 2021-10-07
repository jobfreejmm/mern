import {
  LOGIN_CORRECTO,
  LOGIN_ERROR,
  LOGOUT,
  OBTENER_USUARIO,
  REGISTRO_CORRECTO,
  REGISTRO_ERROR,
} from '../../types';

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTRO_CORRECTO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };
    case REGISTRO_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        cargando: false,
      };
    case LOGIN_CORRECTO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        cargando: false,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        usuario: null,
        token: null,
        autenticado: false,
        cargando: false,
      };
    default:
      return state;
  }
};
export default reducer;
