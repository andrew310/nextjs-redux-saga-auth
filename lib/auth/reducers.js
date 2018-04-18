import { actionTypes } from './actions';

export const initialState = {
  email: '',
  error: null,
  isLoggedIn: false,
  loggingIn: false,
  password: '',
  token: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_EMAIL:
      return {
        ...state,
        ...{ email: action.email },
      };

    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        ...{ password: action.password },
      };

    case actionTypes.LOGGING_IN:
      return {
        ...state,
        ...{ loggingIn: action.sending },
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        ...{
          error: action.error,
          isLoggedIn: false,
        },
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ error: null, isLoggedIn: true },
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        ...{ isLoggedIn: false },
      };

    default:
      return state;
  }
}

export { auth };
