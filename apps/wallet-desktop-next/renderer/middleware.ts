// import { withIronSessionApiRoute } from "iron-session/next";
// import { sessionOptions } from "./_lib/session";

export function middleware(req, event) {
  // storage.setDataPath(os.tmpdir())
  // const user = storage.getSync("user");
  if (req.nextUrl.pathname.startsWith("/admin")) {
      // const token = req.headers["Authorization"]; // can get the token from localstorage or cookies too
      //   const isLoggedIn = validate(token); // an api to backend ,this will return true or false based on auth token.
    // This logic is only applied to /account
  }


  // if (!user) {
  //   // return new Response("Access granted");
  // } else {
  //   return event.responseWith(NextResponse.redirect("/signin")); // redirect
  // }
}


// export default withIronSessionApiRoute(middleware, sessionOptions);