// src/authenticate

import cookie from 'js-cookie';
import redirect from './redirect';

const getCookieFromBrowser = key => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const getCookie = (key, req) => (
  process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
);

export const getJwt = ctx => getCookie('jwt', ctx.req);

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
  if (!isAuthenticated(ctx)) {
    redirect('/login', ctx);
    return true;
  }
  return false;
};

