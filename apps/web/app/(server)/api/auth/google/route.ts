// import { google } from "googleapis";

// const oauth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_CLIENT_REDIRECT_URI
// );

// // const scopes = [
// //   "email",
// //   "profile",
// //   "openid",
// //   "https://www.googleapis.com/auth/userinfo.profile",
// //   "https://www.googleapis.com/auth/userinfo.email",
// // ];a

// // const url = oauth2Client.generateAuthUrl({
// //   // 'online' (default) or 'offline' (gets refresh_token)
// //   access_type: "offline",
// //   // If you only need one scope you can pass it as a string
// //   scope: scopes,
// // });

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
//     const { code } = res;
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);
//     return Response.json(tokens);
//   } catch (error) {
//     return Response.json(error, { status: 500 });
//   }
// }
