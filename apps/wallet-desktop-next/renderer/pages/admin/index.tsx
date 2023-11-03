import { withIronSessionSsr } from "iron-session/next";
import React from "react";
import { isLoggedIn } from "../../_lib/auth";
import { sessionOptions } from "../../_lib/session";
import { Button } from "@hyperbitui/react";
import { useRouter } from "next/router";

export default function AccountPage() {
  const router = useRouter();
  async function logout() {
    try {
      await fetch("/api/auth/logout");
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <div>AccountPage</div>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async ({ req: request, res: response }) => {
    if (!isLoggedIn(request)) {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    }

    return {
      props: {
        userId: request.session.userId ?? null,
      },
    };
  },
  sessionOptions
);
