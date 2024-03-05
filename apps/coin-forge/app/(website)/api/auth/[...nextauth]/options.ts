import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  theme: {
    // logo: '/logo.png',
    colorScheme: "auto",
    brandColor: "#5fc77e",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("signIn", { user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      // console.log("redirect", { url, baseUrl });
      return baseUrl;
    },
    async session({ session, user, token }) {
      // console.log("session", { session, user, token });
      // @ts-ignore
      if (session?.user && token.sub) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt", { token, user, account, profile, isNewUser });
      return token;
    },
  },
};
