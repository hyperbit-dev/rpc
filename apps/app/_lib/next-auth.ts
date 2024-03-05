import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";
import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { v4 as uuidv4 } from "uuid";

// const useSecureCookies = process.env.NEXTAUTH_URL!.startsWith("https://");
// const cookiePrefix = useSecureCookies ? "__Secure-" : "";
// const hostName = new URL(process.env.NEXTAUTH_URL!).hostname;

export type AuthToken = {
  type: string;
  name?: string | null;
  token: string;
  abilities: string[];
  lastUsedAt?: string | null;
  expiresAt: string;
};

// @ts-ignore
export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //     passwordConfirmation: { label: "Confirm Password", type: "password" },
    //   },
    //   async authorize(credentials: {
    //     email: string;
    //     password: string;
    //     passwordConfirmation: string;
    //   }) {
    //     if (!credentials) return null;
    //     const authResponse = await fetch(
    //       "http://localhost:3333/api/auth/login",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(credentials),
    //       }
    //     );
    //     if (authResponse.ok) {
    //       const token: AuthToken = await authResponse.json();
    //       return token;
    //     }
    //     return null;
    //   },
    // }),
    // CredentialsProvider({
    //   id: "siwm", // Sign in with message
    //   name: "Message",
    //   //   credentials: {
    //   //     // message: {
    //   //     //   label: "Message",
    //   //     //   type: "text",
    //   //     //   placeholder: "0x0",
    //   //     // },
    //   //     // signature: {
    //   //     //   label: "Signature",
    //   //     //   type: "text",
    //   //     //   placeholder: "0x0",
    //   //     // },
    //   //     blockchain: { label: "blockchain", type: "text" },
    //   //     network: { label: "network", type: "text" },
    //   //     publicKey: { label: "publicKey", type: "text" },
    //   //     signature: { label: "signature", type: "text" },
    //   //   },
    //   // @ts-ignore
    //   async authorize(credentials: {
    //     blockchain: string | null;
    //     network: string;
    //     publicKey: string;
    //     signature: string;
    //   }) {
    //     const cookieStore = cookies();
    //     const nonce = cookieStore.get("auth-nonce");
    //     const network = credentials.network ?? "mainnet";
    //     const chain: MainNet | TestNet =
    //       // @ts-ignore
    //       chains[credentials.blockchain][network];
    //     if (!nonce) {
    //       throw new Error("user can not be authenticated");
    //     }
    //     const isVerified = verify({
    //       address: credentials.publicKey,
    //       message: nonce.value,
    //       messagePrefix: chain.messagePrefix,
    //       signature: credentials.signature,
    //     });
    //     if (!isVerified) {
    //       throw new Error("user can not be authenticated");
    //     }
    //     try {
    //       const user = await prisma.user.findFirst({
    //         where: {
    //           email: credentials.publicKey,
    //         },
    //       });
    //       if (user) {
    //         return user;
    //       } else {
    //         const user = await prisma.user.create({
    //           data: { email: credentials.publicKey },
    //         });
    //         await prisma.account.create({
    //           data: {
    //             userId: user.id,
    //             type: "credentials",
    //             provider: "credentials",
    //             providerAccountId: user.id,
    //           },
    //         });
    //         return {
    //           email: credentials.publicKey,
    //         };
    //       }
    //     } catch (e) {
    //       throw new Error("user can not be authenticated");
    //     }
    //   },
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // EmailProvider({
    //   server: {
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: {
    //       user: process.env.SMTP_USER,
    //       pass: process.env.SMTP_PASSWORD,
    //     },
    //   },
    //   from: process.env.SMTP_FROM,
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log("session session", session);
      console.log("session token", token);
      if (session?.user) {
        session.user.id = token.id;
      }
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("jwt token", token);
      console.log("jwt user", user);
      console.log("jwt account", account);
      console.log("jwt profile", profile);
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    // async signIn({ user, account }) {
    //   if (account?.provider !== "google") {
    //     //   // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
    //     //   if (
    //     //     req.query?.nextauth?.includes("callback") &&
    //     //     req.query?.nextauth?.includes("credentials") &&
    //     //     req.method === "POST"
    //     //   ) {
    //     if (user) {
    //       const adapter = PrismaAdapter(prisma);
    //       const sessionToken = uuidv4();
    //       const sessionExpiry = fromDate(1000);

    //       await adapter?.createSession?.({
    //         sessionToken: sessionToken,
    //         userId: user.id,
    //         expires: sessionExpiry,
    //       });

    //       const cookieStore = cookies();
    //       cookieStore.set("next-auth.session-token", sessionToken, {
    //         expires: sessionExpiry,
    //       });
    //     }
    //     //   }
    //   }

    //   return true;
    // },
    // async session({ session, token }: { session: any; token: any }) {
    //   const user = await prisma.user.findFirst({
    //     where: { email: { equals: session?.user?.email } },
    //   });
    //   if (user) {
    //     session.user.id = user.id;
    //     session.user.name = user.name;
    //     session.user = token.user;
    //     session.email = token.email;
    //     return {
    //       ...session,
    //       token,
    //     };
    //   }
    //   return null;
    // },
    // async jwt({ token }) {
    //   const dbUser = await prisma.user.findFirst({
    //     where: { email: { equals: token?.email } },
    //   });
    //   if (dbUser) {
    //     token.id = dbUser.id;
    //     return token;
    //   }
    //   return {};
    // },
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     return (
    //       // @ts-ignore
    //       profile?.email_verified && profile?.email.endsWith("@hyperbit.app")
    //     );
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  // pages: {
  //   signIn: '/auth/login'
  // },
};

// @ts-ignore
export const authHandler: NextApiHandler = (
  // @ts-ignore
  req: NextApiRequest,
  // @ts-ignore
  res: NextApiResponse
  // @ts-ignore
) => NextAuth(req, res, authOptions);
