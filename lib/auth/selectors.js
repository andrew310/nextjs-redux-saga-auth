// lib/login/selectors
import { createSelector } from 'reselect';

const selectState = ({ auth }) => auth;

const selectEmail = () => createSelector(
  selectState,
  ({ email }) => email,
);

const selectPassword = () => createSelector(
  selectState,
  ({ password }) => password,
);

export {
  selectEmail,
  selectPassword,
};
