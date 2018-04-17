import { actionTypes } from './actions';

export const initialState = {
  email: '',
  password: '',
  error: '',
  token: null,
  isLoggedIn: false,
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

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
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
