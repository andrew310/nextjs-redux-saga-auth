
/* global fetch */
// import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

import { put, select, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import { actionTypes, loginSuccess } from './actions';
import { selectEmail, selectPassword } from './selectors';

es6promise.polyfill();

function* loginSaga() {
  const email = yield select(selectEmail());
  const password = yield select(selectPassword());
  try {
    const res = yield fetch('http://0.0.0.0:5000/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const token = yield res.json();
    Cookie.set('jwt', token);
    yield put(loginSuccess());
  } catch (err) {
    // console.log(err)
    // yield put(failure(err))
  }
}

function* logoutSaga() {
  yield Cookie.remove('jwt');
}

export const latestLogin = takeLatest(actionTypes.LOGIN, loginSaga);
export const latestLogout = takeLatest(actionTypes.LOGOUT, logoutSaga);
