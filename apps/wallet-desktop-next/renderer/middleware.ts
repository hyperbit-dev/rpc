import storage from "electron-json-storage";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import os from "os";

export function middleware(req, event) {
  // storage.setDataPath(os.tmpdir())
  // const user = storage.getSync("user");
  if (req.nextUrl.pathname.startsWith("/account")) {
    // This logic is only applied to /account
  }
  //   const token = req.headers["Authorization"]; // can get the token from localstorage or cookies too

  //   const isLoggedIn = validate(token); // an api to backend ,this will return true or false based on auth token.

  // if (!user) {
  //   // return new Response("Access granted");
  // } else {
  //   return event.responseWith(NextResponse.redirect("/login")); // redirect
  // }
}
