import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  //   password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: "next-webauthn",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  password: "complex_password_at_least_32_characters_long",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
};

// Define the cookie structure globally for TypeScript
declare module "iron-session" {
  interface IronSessionData {
    userId?: string;
  }
}
