import type { DefaultUser } from "next-auth";

declare module "@hyperbitui/theme";
declare module "recharts";
declare module "react-loading-skeleton";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
    email?: string;
    accessToken?: string | unknown;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
