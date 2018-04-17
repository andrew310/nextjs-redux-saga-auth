// lib/rootSaga
import { all } from 'redux-saga/effects';

import { latestLogin, latestLogout } from './auth/sagas';

function* rootSaga() {
  yield all([latestLogin, latestLogout]);
}

export default rootSaga;
