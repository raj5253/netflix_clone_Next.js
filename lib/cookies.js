// contains a react functional component to generate cookie

import cookie from "cookie";

const MAX_AGE = 7 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }); //cookie is same as of express.

  res.setHeader("Set-Cookie", setCookie); //in express, res.session contained cookies, here res/req directly contain cookie
};

export const removeTokenCookie = (res) => {
  //assign empty value to token
  const val = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", val);
};

//age in millisec

//NOTE : cookie contains the JWT tokens(which were sent to hasura toaccess dadtabse : {Authorization : Bearer ${token}})
