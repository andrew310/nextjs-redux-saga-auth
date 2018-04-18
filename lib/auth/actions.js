// lib/auth/actions
export const actionTypes = {
  CHANGE_EMAIL: 'CHANGE_EMAIL',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  LOGIN: 'LOGIN',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGGING_IN: 'LOGGING_IN',
  LOGOUT: 'LOGOUT',
};

export function changeEmail({ email }) {
  return {
    type: actionTypes.CHANGE_EMAIL,
    email,
  };
}

export function changePassword({ password }) {
  return {
    type: actionTypes.CHANGE_PASSWORD,
    password,
  };
}

export function login() {
  return {
    type: actionTypes.LOGIN,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error,
  };
}

export function loginSuccess() {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
}

export function loggingIn(sending) {
  return { type: actionTypes.LOGGING_IN, sending };
}

